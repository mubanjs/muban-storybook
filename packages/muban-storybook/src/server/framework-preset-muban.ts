/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Configuration } from 'webpack';
import path from 'path';

function getHbsInlineLoaderConfig() {
  return {
    loader: 'hbs-inline-loader',
    options: {
      hbsBuildOptions: {
        removeScript: false,
        removeStyle: false,
        removeTemplate: false,
        hot: true,
      },
      hbsOptions: {
        extensions: ['.hbs', ''],
        // partialDirs: [path.resolve(projectRoot, 'src/app/component')], // set this in the project itself
        ignoreHelpers: true,
        debug: false,
      },
    },
  };
}

export function webpack(webpackConfig: Configuration): Configuration {
  return {
    ...webpackConfig,
    module: {
      ...webpackConfig.module,
      rules: [
        ...(webpackConfig.module?.rules || []),
        {
          test: /\.stories\.(js|ts)$/,
          include: [/src[/\\]app[/\\]component/],
          use: [
            getHbsInlineLoaderConfig(),
            {
              loader: 'preset-loader',
              options: {},
            },
            { loader: 'babel-loader', options: {} },
            {
              loader: 'awesome-typescript-loader',
              options: {
                silent: true,
              },
            },
          ],
        },
      ],
    },
    resolveLoader: {
      ...webpackConfig.resolveLoader,
      modules: [
        'node_modules',
        path.resolve(__dirname, 'loaders'),
        path.resolve(require.resolve('muban-core'), '../loaders'),
      ],
    },
  };
}

export function config(entry = []): Array<any> {
  return [...entry, require.resolve('./defaultParameters')];
}
