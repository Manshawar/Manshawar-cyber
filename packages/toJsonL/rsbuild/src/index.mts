// import jsonlCore from "jsonl-core";
import type { RsbuildPlugin } from "@rsbuild/core";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module';
import type { JsonlPluginOptions } from "jsonl-core";
import { DEFAULT_EXTENSIONS, isFileMatch } from "jsonl-core";
import { SourceMapPlugin } from 'jsonl/rspack';
const require = createRequire(import.meta.url);
const loaderPath = require.resolve( 'jsonl-core/loader');

const Rsbuild = (options: JsonlPluginOptions = {}): RsbuildPlugin => {
  const { extensions = DEFAULT_EXTENSIONS } = options;

  return {
    name: "jsonl-plugin",

    setup(api) { 
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