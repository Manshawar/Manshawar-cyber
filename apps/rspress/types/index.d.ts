/*
 * @Author: Manshawar 825750768@qq.com
 * @Date: 2025-02-05 15:16:09
 * @LastEditors: Manshawar 825750768@qq.com
 * @LastEditTime: 2025-02-20 12:30:14
 * @FilePath: \Manshawar-cyber\apps\rspress\types\index.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as PIXI from 'pixi.js';
declare global {
  interface Window {
    PIXI: typeof PIXI;
  }
}


