import * as path from 'node:path';

import { defineConfig } from 'rspress/config';
import { myAttr } from "./plugins/html"

import { pluginSvgr } from '@rsbuild/plugin-svgr';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Manshawar blog',
  icon: '/rspress-icon.png',
  builderPlugins: [,pluginSvgr({
    svgrOptions: {
      exportType: 'default',
    },
  }) as any,],
  builderConfig: {
    resolve: {
      alias: {
        '@com': './src/components/',
        '@page': './src/page/',
        '@': './src/',
        '@guide': './docs/guide/',
      },
    },
    html: {
      tags: myAttr()
    },

    performance: {
      chunkSplit: {
        forceSplitting: {
          rspress: /node_modules[\\/]rspress/,
        },
        override: {
          cacheGroups: {
            react: {
              test: /node_modules[\\/](react|react-dom)[\\/]/,
              priority: -8,
              reuseExistingChunk: true,
              name(module) {
                return 'react-vendor'
              }
            },
            antd: {
              test: /[\\/]node_modules[\\/](antd)[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
              name() {
                return 'antd-vendor'
              }
            },



          },
        }
      }
    },
tools:{
  rspack: async (config) => {
    const MonacoWebpackPlugin= require('monaco-editor-webpack-plugin');
    config.plugins?.push(new MonacoWebpackPlugin())
  },
}
  },

  logo: {
    light: '/rspress-light-logo.png',
    dark: '/rspress-dark-logo.png',
  },


  plugins: [
    // jsonlPlugin() as any,
    {
      name: "svgPlugin",
      globalUIComponents: [
        [
          path.join(__dirname, './components/Live2DWidget.tsx'),
          {
            dockedPosition: "right",
            models: [
              {
                path: "https://www.yanghaoran.online/live2d/Kar98k-normal/model.json",
                "scale": 0.1,
                position: [0, 0],

              },

            ],
          }
        ],
      ],
    },
    
  ],

  themeConfig: {

    // 开启 View Transition 过渡
    enableContentAnimation: true,
    enableAppearanceAnimation: true,
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/Manshawar',
      },
    ],
  },
});
