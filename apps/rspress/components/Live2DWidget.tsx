import React, { useEffect, useRef } from "react";
import { Application, Assets, Sprite } from "pixi.js";
import { Live2DModel } from "pixi-live2d-display";
import { loadOml2d } from "oh-my-live2d";
// let stage = document.querySelector(".oml2d-stage");

const Live2DWidget = options => {
  const canvasRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // const initializePixi = async () => {
    //   const app = new Application();
    //   await app.init({ background: "#1099bb", resizeTo: window });
    //   if (canvasRef.current) {
    //     canvasRef.current.appendChild(app.canvas);

    //     // const model = await Live2DModel.from(
    //     //   "https://www.yanghaoran.online/live2d/Kar98k-normal/model.json"
    //     // );
    //     // app.stage.addChild(model as any);
    //     // model.x = 100;
    //     // model.y = 100;
    //     // model.rotation = Math.PI;
    //     // model.skew.x = Math.PI;
    //     // model.scale.set(2, 2);
    //     // model.anchor.set(0.5, 0.5);
    //   }
    // };

    // initializePixi();

    loadOml2d(options);
    // dom.addEventListener("mouseenter", () => {
    //   // stage.style.display = "none";
    // });
  }, []);
  // return <>{<div ref={canvasRef}></div>}</>;
};

export default Live2DWidget;
