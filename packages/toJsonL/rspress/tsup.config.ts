/*
 * @Author: Manshawar 825750768@qq.com
 * @Date: 2025-02-24 15:06:44
 * @LastEditors: Manshawar 125840253+Manshawar@users.noreply.github.com
 * @LastEditTime: 2025-02-25 20:46:04
 * @FilePath: \Manshawar-cyber\packages\toJsonL\core\tsup.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'tsup'

export default defineConfig({
  entryPoints: [
    'src/index.ts',
  ],
  format: ["esm","cjs"],
  dts: true,
  shims: true,
  target: 'node16',
  platform: 'node',
 
})