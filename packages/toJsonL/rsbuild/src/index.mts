// import jsonlCore from "jsonl-core";
import type { RsbuildPlugin } from "@rsbuild/core";

import { createRequire } from 'module';

import { DEFAULT_EXTENSIONS, isFileMatch } from "jsonl-core";
import { SourceMapPlugin } from '@jsonl/rspack';
const require = createRequire(import.meta.url);
const loaderPath = require.resolve( 'jsonl-core/loader');

const Rsbuild = (): RsbuildPlugin => {


  return {
    name: "jsonl-plugin",

    setup(api) { 
      api.modifyBundlerChain((chain, { CHAIN_ID }) => {
        const extRegex = new RegExp(
          `\\.(${DEFAULT_EXTENSIONS.map(ext => ext.slice(1)).join('|')})$`
        );
        chain.module
          .rule("toJsonl")
          .pre()
          .test(extRegex)
          // 排除 node_modules
          .exclude.add(/node_modules/)
          .end()
          // 添加自定义 loader
          .use("toJsonl-loader")
          .loader(loaderPath).end();

      });
      const sourceMapPlugin = new SourceMapPlugin();
     
      api.modifyRspackConfig((config) => {
        // 将 Rspack 插件添加到配置中
        config.plugins ||= [];
        config.plugins.push(sourceMapPlugin);
        // console.log(config.plugins)
        return config;
      });
      
    },
  };
};

export default Rsbuild;
