import * as path from 'node:path';

import { defineConfig } from 'rspress/config';
import { myAttr } from "./plugins/html"

const cache = new Map();

function isDepInclude(id: string, depPaths: string[], importChain: string[], getModuleInfo:any): boolean | undefined {
  const key = `${id}-${depPaths.join('|')}`;
  // 出现循环依赖，不考虑
  if (importChain.includes(id)) {
    cache.set(key, false);
    return false;
  }
  // 验证缓存
  if (cache.has(key)) {
    return cache.get(key);
  }
  // 命中依赖列表
  if (depPaths.includes(id)) {
    // 引用链中的文件都记录到缓存中
    importChain.forEach(item => cache.set(`${item}-${depPaths.join('|')}`, true));
    return true;
  }
  const moduleInfo = getModuleInfo(id);
  if (!moduleInfo || !moduleInfo.importers) {
    cache.set(key, false);
    return false;
  }
  // 核心逻辑，递归查找上层引用者
  const isInclude = moduleInfo.importers.some(
    (importer:any) => isDepInclude(importer, depPaths, importChain.concat(id), getModuleInfo)
  );
  // 设置缓存
  cache.set(key, isInclude);
  return isInclude;
};
export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Manshawar blog',
  icon: '/rspress-icon.png',
  builderConfig: {
    //@ts-ignore
    resolve: {
      alias: {
        '@com': './src/components/',
        '@page': './src/page/',
        '@': './src/',
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

  },

  logo: {
    light: '/rspress-light-logo.png',
    dark: '/rspress-dark-logo.png',
  },


  plugins: [

    {
      name: "Live2DWidget",
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
