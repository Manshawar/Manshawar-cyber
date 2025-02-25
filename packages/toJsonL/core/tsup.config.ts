/*
 * @Author: Manshawar 825750768@qq.com
 * @Date: 2025-02-24 15:06:44
 * @LastEditors: Manshawar 825750768@qq.com
 * @LastEditTime: 2025-02-24 15:08:00
 * @FilePath: \Manshawar-cyber\packages\toJsonL\core\tsup.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entryPoints: [
      'src/index.ts',
  'src/loader.ts',
    ],
   
    // clean: true,
    format: ['esm', 'cjs'],
    dts: true,
    shims: true,
  }, 
]
)