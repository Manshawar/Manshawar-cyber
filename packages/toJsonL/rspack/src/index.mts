import type { Compiler, Compilation } from '@rspack/core';
import transformCode from 'jsonl-core'
import path from "path"
export class SourceMapPlugin {
  // 用于存储插件间共享的数据
  public sourceCodeMap?: Map<string, string>;

  apply(compiler: Compiler) {
  //  console.log(compiler)
    compiler.hooks.compilation.tap('SourceMapPlugin', (compilation: Compilation) => {
      // 监听 compilation 对象创建事件
    
      compilation.hooks.processAssets.tap('SourceMapPlugin', () => {
        // 在资源处理阶段获取存储的 Map
      
        this.sourceCodeMap = (compilation as any).__sourceCodeMap;
  
        if(this.sourceCodeMap){
         let res = transformCode.transformMarkdownMap(this.sourceCodeMap)
         transformCode.writeJsonLines(res, path.join(process.cwd(), 'md.jsonl'))

        }
      });
    });
  }
}