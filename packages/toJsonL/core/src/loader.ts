import type { LoaderContext } from '@rspack/core';
import path from 'path'
interface LoaderOptions {
  // 在这里定义你的 loader 选项类型
  // 例如：
  // someOption?: string;
}

export default function loader(
  this: LoaderContext<LoaderOptions>,
  content: string, 
  map: any, 
  meta: any
) {
  // ...
  const filePath = this.resourcePath;

  let relativePath = path.relative(this.rootContext, filePath)
  // 获取 compilation 对象（Rspack 的编译上下文）
  const compilation:any = this._compilation;
  
  // 初始化存储对象
  if (!compilation.__sourceCodeMap) {
    compilation.__sourceCodeMap = new Map();
  }
  
  // 存储源代码（使用路径作为 key）
  compilation.__sourceCodeMap.set(relativePath, content);

  return content
}