/*
 * @Author: Manshawar 825750768@qq.com
 * @Date: 2025-02-24 15:13:06
 * @LastEditors: Manshawar 825750768@qq.com
 * @LastEditTime: 2025-02-25 17:30:36
 * @FilePath: \Manshawar-cyber\packages\toJsonL\rsbuild\src\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Manshawar 825750768@qq.com
 * @Date: 2025-02-24 15:13:06
 * @LastEditors: Manshawar 825750768@qq.com
 * @LastEditTime: 2025-02-25 17:07:36
 * @FilePath: \Manshawar-cyber\packages\toJsonL\rsbuild\src\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Manshawar 825750768@qq.com
 * @Date: 2025-02-24 15:13:06
 * @LastEditors: Manshawar 825750768@qq.com
 * @LastEditTime: 2025-02-25 17:00:11
 * @FilePath: \Manshawar-cyber\packages\toJsonL\rsbuild\src\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import jsonlCore from "jsonl-core";
import type { RsbuildPlugin } from "@rsbuild/core";
import path from "path";

import type { JsonlPluginOptions } from "jsonl-core";
import { DEFAULT_EXTENSIONS, isFileMatch } from "jsonl-core";
const loaderPath = path.resolve(__dirname, './loader.ts');
console.log(loaderPath)
const Rsbuild = (options: JsonlPluginOptions = {}): RsbuildPlugin => {
  const { extensions = DEFAULT_EXTENSIONS } = options;

  return {
    name: "jsonl-plugin",

    setup(api) {
      console.log(loaderPath)
      // api.modifyBundlerChain((chain, { CHAIN_ID }) => {
      //   const extRegex = new RegExp(
      //     `\\.(${DEFAULT_EXTENSIONS.map(ext => ext.slice(1)).join('|')})$`
      //   );
      //   chain.module
      //     .rule("toJsonl")
      //     .test(extRegex)
      //     // 排除 node_modules
      //     .exclude.add(/node_modules/)
      //     .end()
      //     // 添加自定义 loader
      //     .use("toJsonl-loader")
      //     .loader(loaderPath)
      //     .options({ maxLength: options?.maxLength ?? 100 })
      //     .end();

      // });
    },
  };
};

export default Rsbuild;
