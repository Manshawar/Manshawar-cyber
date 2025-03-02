/*
 * @Author: Manshawar 825750768@qq.com
 * @Date: 2025-02-21 11:22:32
 * @LastEditors: Manshawar 825750768@qq.com
 * @LastEditTime: 2025-02-21 14:43:32
 * @FilePath: \Manshawar-cyber\apps\rspress\src\page\svg\animationSvg.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import Animate1 from "./static/animate1.svg?url";
import Loading from "./static/loading.svg?url";
export default function AnimationSvg() {
  console.log(Animate1);
  return (
    <div className="flex justify-center items-center">
      <div className="w-[100px] h-[100px]">
        <img src={Animate1} alt="" />
      </div>
      <div className="w-[100px] h-[100px]">
        <img src={Loading} alt="" />
      </div>
    </div>
  );
}
