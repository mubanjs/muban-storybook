import loaderUtils from 'loader-utils';
import type webpack from 'webpack';
import path from 'path';

type LoaderContext = webpack.loader.LoaderContext;

/**
 * Processes handlebar templates to import script and style files.
 * Also has an option to remove al the template code itself to only extract the scripts out of it
 *
 * For scripts:
 * - Changes the html script include to a js file require
 * - Also registers the class to be initialized
 * - Has support for hot reloading
 *
 * For styles:
 * - Changes the html style link to a css file require
 */
export default function loader(this: LoaderContext, source: string) {
  const done = this.async()!;
  this.cacheable();
  // const options = loaderUtils.getOptions(this) || {};

  const scripts: Array<string> = [];
  const styles: Array<string> = [];

  source.replace(/<script src=["']([^"']+)["']><\/script>/gi, (result, match) => {
    scripts.push(match);
    return '';
  });

  source.replace(/<link rel=["']stylesheet["'] href=["']([^"']+)["']>/gi, (result, match) => {
    styles.push(match);
    return '';
  });

  const currentModuleName = `./${this.resourcePath.split(path.sep).pop()}`;
  const niceModulePath = this.resourcePath.replace(/\\/g, '/').split('src/demo/app/')[1];

  const newContent = `
		module.exports = {
		  path: '${niceModulePath}',
			default: require(${loaderUtils.stringifyRequest(this, currentModuleName)}),
			template: require(${loaderUtils.stringifyRequest(this, `!!raw-loader!${currentModuleName}`)}),
			style: ${
        styles[0]
          ? `require(${loaderUtils.stringifyRequest(this, `!!raw-loader!${styles[0]}`)})`
          : `undefined`
      },
			script: ${
        scripts[0]
          ? `require(${loaderUtils.stringifyRequest(this, `!!raw-loader!${scripts[0]}`)})`
          : `undefined`
      },
		};
	`;

  done(null, newContent);
}
