import { RspressPlugin } from '@rspress/shared';
import PluginToJsonL from '@jsonl/rsbuild'
export default jsonlPlugin
export * from 'jsonl-core'
export  function jsonlPlugin(): RspressPlugin {
  return {
    // 插件名称
    name: 'rspress-md-toJsonl',
    // 构建阶段的全局变量定义
    builderConfig: {
     
   plugins: [PluginToJsonL.default() ]
    },
  };
}
