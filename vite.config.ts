import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import webExtension from '@samrum/vite-plugin-web-extension';
import { visualizer } from 'rollup-plugin-visualizer';
import ignore from 'rollup-plugin-ignore';
import Randomstring from 'randomstring';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { getManifest } from './src/manifest';
import { version } from './package.json';
import { version as versionThuLearnLib } from './node_modules/thu-learn-lib/package.json';
import { version as versionMui } from './node_modules/@mui/material/package.json';
import { version as versionReact } from './node_modules/react/package.json';

const runCmd = (cmd: string) => execSync(cmd).toString().trim();

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const randomSuffix = Randomstring.generate(4);

  return {
    define: {
      __HELPER_VERSION__: JSON.stringify(version),
      __GIT_VERSION__: JSON.stringify(runCmd('git describe --always')),
      __GIT_COMMIT_HASH__: JSON.stringify(runCmd('git rev-parse HEAD')),
      __GIT_COMMIT_DATE__: JSON.stringify(
        runCmd('git log -1 --date=format:"%Y/%m/%d %T" --format="%ad"'),
      ),
      __GIT_BRANCH__: JSON.stringify(runCmd('git rev-parse --abbrev-ref HEAD')),
      __BUILD_HOSTNAME__: JSON.stringify(runCmd('hostname')),
      __BUILD_TIME__: JSON.stringify(runCmd('date +"%Y/%m/%d %T"')),
      __THU_LEARN_LIB_VERSION__: JSON.stringify(versionThuLearnLib),
      __MUI_VERSION__: JSON.stringify(versionMui),
      __REACT_VERSION__: JSON.stringify(versionReact),
      __LEARN_HELPER_CSRF_TOKEN_PARAM__: JSON.stringify(
        `__learn-helper-csrf-token-${randomSuffix}__`,
      ),
      __LEARN_HELPER_CSRF_TOKEN_INJECTOR__: JSON.stringify(
        `__learn_helper_csrf_token_injector_${randomSuffix}__`,
      ),
    },
    plugins: [
      react(),
      webExtension({
        manifest: getManifest(process.env.BROWSER === 'firefox') as chrome.runtime.Manifest,
        additionalInputs: {
          html: [
            'index.html',
            'src/about.html',
            'src/changelog.html',
            'src/readme.html',
            'src/welcome.html',
          ],
        },
        useDynamicUrlWebAccessibleResources: process.env.BROWSER !== 'firefox',
      }),
      ignore(['parse5']),
      visualizer(),
    ],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
        parse5: path.resolve(__dirname, 'node_modules/thu-learn-lib/src/fake-parse5/'),
        'parse5-htmlparser2-tree-adapter': path.resolve(
          __dirname,
          'node_modules/thu-learn-lib/src/fake-parse5/',
        ),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': [
              'react',
              'react-dom',
              'react-iframe',
              'react-is',
              'react-transition-group',
              'redux',
              'redux-logger',
              'redux-persist',
              'redux-persist-transform-immutable',
              'redux-persist-webextension-storage',
              'redux-thunk',
              'react-redux',
              '@emotion/react',
              '@fortawesome/react-fontawesome',
              'immutable',
            ],
            'mui-vendor': ['@mui/material'],
          },
        },
      },
    },
  };
});