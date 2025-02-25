// import jsonlCore from "jsonl-core";
import type { RsbuildPlugin } from "@rsbuild/core";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import type { JsonlPluginOptions } from "jsonl-core";
import { DEFAULT_EXTENSIONS, isFileMatch } from "jsonl-core";
const loaderPath = path.resolve(__dirname, './loader.js');

// 获取当前文件的路径



console.log('当前目录:', loaderPath);

const Rsbuild = (options: JsonlPluginOptions = {}): RsbuildPlugin => {
  const { extensions = DEFAULT_EXTENSIONS } = options;

  return {
    name: "jsonl-plugin",

    setup(api) {
      console.log(loaderPath)
      api.modifyBundlerChain((chain, { CHAIN_ID }) => {
        const extRegex = new RegExp(
          `\\.(${DEFAULT_EXTENSIONS.map(ext => ext.slice(1)).join('|')})$`
        );
        chain.module
          .rule("toJsonl")
          .test(extRegex)
          // 排除 node_modules
          .exclude.add(/node_modules/)
          .end()
          // 添加自定义 loader
          .use("toJsonl-loader")
          .loader(loaderPath)
          .options({ maxLength: options?.maxLength ?? 100 })
          .end();

      });
    },
  };
};

export default Rsbuild;