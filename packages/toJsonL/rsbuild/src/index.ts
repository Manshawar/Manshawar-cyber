/*
 * @Author: Manshawar 825750768@qq.com
 * @Date: 2025-02-24 15:13:06
 * @LastEditors: Manshawar 825750768@qq.com
 * @LastEditTime: 2025-02-24 16:58:45
 * @FilePath: \Manshawar-cyber\packages\toJsonL\rsbuild\src\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import jsonlCore from "jsonl-core"
import type { RsbuildPlugin } from "@rsbuild/core"

interface JsonlPluginOptions {
  // 支持字符串数组或正则表达式
  extensions?: string[] | RegExp;
}

// 默认支持的文件类型
const DEFAULT_EXTENSIONS = [
  '.vue',
  '.js',
  '.ts',
  '.jsx',
  '.tsx',
  '.md',
  '.mdx',
];

// 检查文件是否匹配
const isFileMatch = (filePath: string, extensions: string[] | RegExp = DEFAULT_EXTENSIONS): boolean => {
  // 排除 node_modules
  if (filePath.includes('node_modules')) {
    return false;
  }

  if (extensions instanceof RegExp) {
    return extensions.test(filePath);
  }
  return extensions.some(ext => filePath.endsWith(ext));
};

const Rsbuild = (options: JsonlPluginOptions = {}): RsbuildPlugin => {
  const { extensions = DEFAULT_EXTENSIONS } = options;

  return {
    name: 'jsonl-plugin',

    setup(api) {
      api.transform(
        {
          test: file => isFileMatch(file, extensions),
        },
        ({ code, resourcePath }) => {
          jsonlCore(code, resourcePath)
          console.log('File:', resourcePath);
          return code;
        }
      );
    },
  };
};

export default Rsbuild
