import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import styles from "./style/btn.module.scss";

export default function Btn() {
  let [fontSize, setFontSize] = useState(16);
  let [activeName, setActiveName] = useState("");
  useEffect(() => {
    const setRootFontSize = () => {
      const screenWidth =
        window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      const rootFontSize = screenWidth / 40;
      setFontSize(() => rootFontSize);
    };

    // 初始化设置
    setRootFontSize();

    // 监听窗口大小变化
    window.addEventListener("resize", setRootFontSize);

    // 清理事件监听器
    return () => {
      window.removeEventListener("resize", setRootFontSize);
    };
  }, []); // 空依赖数组表示只在组件挂载和卸载时执行
  let handler = (e: React.MouseEvent<HTMLButtonElement>) => {
    let doneTimeout: null | NodeJS.Timeout = null;
    let resetTimeout: null | NodeJS.Timeout = null;
    const submitDuration = 2000;
    const resetDuration = 1500;
    let buttonDom = e.currentTarget;
    buttonDom.disabled = true;
    clearTimeout(doneTimeout as unknown as NodeJS.Timeout);
    clearTimeout(resetTimeout as unknown as NodeJS.Timeout);
    setActiveName("btn--running");

    doneTimeout = setTimeout(() => {
      setActiveName("btn--done");
      resetTimeout = setTimeout(() => {
        buttonDom.disabled = false;

        setActiveName("");
      }, resetDuration);
    }, 600 + submitDuration);
  };
  function mouseDown(e: React.MouseEvent<HTMLButtonElement>) {
    let dom = e.currentTarget;
    const { layerX, layerY } = e.nativeEvent;
    const { width, height } = dom.getBoundingClientRect();
    console.log(width, height, layerX, layerY);
  }
  // <Progress />;
  return (
    <div className="flex w-[100%] h-20">
      <div
        style={{ fontSize: `${fontSize}px` }}
        className={`flex justify-center items-center ${styles.container}`}
      >
        <button
          className={[styles.btn, styles[activeName]].join(" ")}
          onClick={handler}
          onMouseDown={mouseDown}
        >
          <span className={styles["btn__text"]}>Send</span>
          <svg className={styles["btn__progress"]} viewBox="0 0 48 48" width="48px" height="48px">
            <circle
              className={styles["btn__progress-track"]}
              r="20"
              cx="24"
              cy="24"
              fill="none"
              stroke="#c7cad1"
              stroke-width="8"
            />
            <circle
              className={styles["btn__progress-fill"]}
              r="20"
              cx="24"
              cy="24"
              fill="none"
              stroke="#000000"
              stroke-width="8"
              transform="rotate(-90,24,24)"
              stroke-dasharray="125.66 125.66"
              stroke-dashoffset="125.66"
            />
            <polyline
              className={styles["btn__progress-check"]}
              points="12,24 20,32 36,16"
              fill="none"
              stroke="#fff"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-dasharray="34 34"
              stroke-dashoffset="34"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
