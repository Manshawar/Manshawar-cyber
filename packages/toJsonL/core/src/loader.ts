import type { LoaderContext } from '@rspack/core';

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
  console.log("loader", this)
  return content
}