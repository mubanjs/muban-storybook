import loaderUtils from 'loader-utils';
import type webpack from 'webpack';

type LoaderContext = webpack.loader.LoaderContext;

/**
 * Adds html comments around the partial so it's easily findable
 */
export default function loader(this: LoaderContext, source: string) {
  const done = this.async()!;
  this.cacheable();

  const toReplace: Array<{ match: string; result: string }> = [];
  let loadCount = 0;
  let syncDone = false;

  const finish = () => {
    toReplace.forEach((r) => {
      // eslint-disable-next-line no-param-reassign
      source = source.replace(
        r.match,
        `require(${loaderUtils
          .stringifyRequest(this, `!!hbs-source-loader!${r.result}`)
          .replace(/"/g, "'")})`,
      );
    });
    done(null, source);
  };

  source.replace(/require\(['"]([^)]+)['"]\)/gi, (match, g1) => {
    ++loadCount;
    this.resolve(this.context, g1, (error, result) => {
      --loadCount;
      if (/\.hbs$/i.test(result)) {
        // these are imports to .hbs files, rewrite them to include name and sources
        toReplace.push({
          match,
          result,
        });
      }
      if (loadCount === 0 && syncDone) {
        finish();
      }
    });
    return match;
  });
  syncDone = true;

  if (loadCount === 0) {
    if (toReplace.length !== 0) {
      // console.log(' ------ NOOOOOOOOO ------', this.context);
      finish();
      // console.log('toReplace', toReplace);
      // console.log('source', source);
    } else {
      // console.log('normal exit', this.context);
      done(null, source);
    }
  }
}
