import fs from 'fs'
import path from 'path'
import glob from 'fast-glob'

const generateTypes = async () => {
  // 获取所有 .ce.vue 文件
  const files = await glob('src/components/**/*.ce.vue')
  
  let dts = `
declare namespace JSX {
  interface IntrinsicElements {
`

  // 为每个组件生成类型定义
  files.forEach(file => {
    const name = path.basename(file, '.ce.vue')
    dts += `    'v-${name}': {
      // Web Components 标准属性
      slot?: string;
      class?: string;
      id?: string;
      part?: string;
      style?: string | Partial<CSSStyleDeclaration>;
      
      // 事件处理
      onSlotchange?: (event: Event) => void;
      onConnected?: (event: CustomEvent) => void;
      onDisconnected?: (event: CustomEvent) => void;
      onAdopted?: (event: CustomEvent) => void;
      onAttributeChanged?: (event: CustomEvent) => void;

      // 允许任意自定义属性
      [key: string]: any;
    };\n`
  })

  dts += `  }
}


`

  // 写入类型文件
  fs.writeFileSync('dist/types/glob.d.ts', dts)
}

generateTypes()