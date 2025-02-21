/*
 * @Author: Manshawar 825750768@qq.com
 * @Date: 2025-02-21 15:01:00
 * @LastEditors: Manshawar 825750768@qq.com
 * @LastEditTime: 2025-02-21 17:25:27
 * @FilePath: \Manshawar-cyber\apps\rspress\src\page\css\instance\btn.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import styles from "./style/btn.module.css";
import Loading from "./svg/loading.svg";

const Container = styled.div`
  * {
    border: 0;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  --hue: 240;

  --textBg: hsl(var(--hue), 90%, 55%);

  background-color: var(--bg);
  display: grid;
  grid-template-columns: repeat(2, auto);

  grid-gap: 2em;

  justify-content: start;

  align-items: center;

  padding: 1em;
`;

const Button = styled.button`
  background-color: transparent;
  border-radius: 1em;
  display: block;
  position: relative;
  width: 5em;
  height: 2em;
  transition: width 0.3s ease-in-out;
  font-size: 0.64em;

  &:not(:disabled):active {
    transform: translateY(0.1em);
  }
`;

const ButtonText = styled.span`
  background-color: var(--textBg);
  border-radius: inherit;
  color: hsl(0, 0%, 100%);
  display: inline-block;
  transition:
    background-color 0.15s linear,
    color 0.15s 0.3s ease-in-out;
  width: 100%;
  height: 100%;
  display: grid;
  font-size: 0.8em;
  place-items: center;
`;

const ProgressSVG = styled.svg`
  overflow: visible;
  position: absolute;
  top: 0;
  left: 0;
  width: 2em;
  height: 2em;
  /* visibility: hidden; */
`;

const ProgressTrack = styled.circle`
  r: 12px;
  stroke: var(--bg2);
  stroke-width: 24;
`;

const ProgressFill = styled.circle`
  stroke: var(--primary1);
  stroke-dashoffset: 125.66;
`;

const ProgressCheck = styled.polyline`
  stroke: hsl(0, 0%, 100%);
  stroke-dashoffset: 34;
`;
let ProgressSvg = () => {
  return (
    <ProgressSVG viewBox="0 0 48 48" className={styles["btn__progress"]}>
      <ProgressTrack className={styles["btn__progress-track"]} r="20" cx="24" cy="24" />
      <ProgressFill className={styles["btn__progress-fill"]} r="20" cx="24" cy="24" />
      <ProgressCheck className={styles["btn__progress-check"]} points="12,24 20,32 36,16" />
    </ProgressSVG>
  );
};
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
    setActiveName("btn--loading");
    console.log("loading.....");
    doneTimeout = setTimeout(() => {
      console.log("loading finish.....");
      console.log("reset.....");

      setActiveName("btn--done");
      resetTimeout = setTimeout(() => {
        buttonDom.disabled = false;
        console.log("reset finish.....");
        setActiveName("");
      }, resetDuration);
    }, 600 + submitDuration);
  };

  return (
    <Container style={{ fontSize: `${fontSize}px` }}>
      <Button className={`btn ${styles[activeName]}`} onClick={e => handler(e)}>
        <ButtonText className={styles["btn__text"]}>Send</ButtonText>
        <ProgressSvg></ProgressSvg>
      </Button>
      <ProgressSvg></ProgressSvg>
    </Container>
  );
}
