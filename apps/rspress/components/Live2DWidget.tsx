/*
 * @Author: Manshawar 825750768@qq.com
 * @Date: 2025-01-20 14:03:19
 * @LastEditors: Manshawar 825750768@qq.com
 * @LastEditTime: 2025-02-20 11:33:33
 * @FilePath: \Manshawar-cyber\apps\rspress\components\Live2DWidget.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useRef } from "react";
import { Application, Assets, Sprite } from "pixi.js";
import { Live2DModel } from "pixi-live2d-display";
import { loadOml2d } from "oh-my-live2d";

const Live2DWidget = options => {
  const canvasRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // initializePixi();

    let live2d = loadOml2d(options);
    document.getElementById("aside-container").addEventListener("mouseenter", () => {
      live2d.stageSlideOut();
    });
    document.getElementById("aside-container").addEventListener("mouseleave", () => {
      live2d.stageSlideIn();
    });
  }, []);
  // return <>{<div ref={canvasRef}></div>}</>;
};

export default Live2DWidget;
