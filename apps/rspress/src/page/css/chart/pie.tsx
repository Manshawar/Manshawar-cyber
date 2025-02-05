import styles, { keyframes, css } from "styled-components";
import { useRef, useEffect, useState } from "react";
import { useDark } from "rspress/runtime";
import { Slider, Tag, ConfigProvider, InputNumber } from "antd";
export default () => {
  const dark = useDark();
  let Container = styles.div`height:500px`;
  let PContainer = styles.div`height:150px;position:relative`;
  let PBackground = styles.div`
  height:150px;
  position:absolute;
  left:50%;
  transform:translateX(-50%);
  width:150px;
  border-radius:100%;
  box-shadow:0px 0px 8px rgba(0,0,0,0.5);
  z-index:1;
  `;
  let PItem = styles.div`
        position: absolute;
        width: 150px;
        height: 150px;
        border-radius: 100%;

  `;
  let PIn = styles(PItem)`
  transition: all 1s;
  clip: rect(0px, 75px, 150px, 0px);
 transform: rotate(30deg);
  `;
  let POut = styles(PItem)`
  clip: rect(0px, 150px, 150px, 75px);

  `;
  const InnerCircle = styles.div` position: absolute;
    width: 120px;
    height: 120px;
     background-color:${dark ? "#191d24" : "#fff"};
    border-radius: 100%;
    top: 15px;
    left: 15px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5) inset;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index:2;

    `;
  const GradientPie = styles.div`
     width: 300px;
        height: 300px;
  background: conic-gradient(#179067, #62e317, #d7f10f, #ffc403, #fcc202, #ff7327, #ff7327, #FF5800, #ff5900, #f64302, #ff0000, #ff0000);
     border-radius: 50%;
        position: relative;
           
  `;
  const CircleMask = styles.div`
     position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        width: 260px;
        height: 260px;
        background-color:${dark ? "#191d24" : "#fff"};
        border-radius: 50%;
  `;

  const circleRef = useRef<SVGCircleElement | null>(null);
  const [circle, setCircle] = useState({ len: 0, percent: 0 });
  useEffect(() => {
    if (!circleRef.current) return;
    const radius = circleRef.current.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    const randomPercent = Math.round(Math.random() * 100) / 100;
    // circleRef.current.style.strokeDashoffset = circle.percent * circumference + "";
    setCircle({ len: circumference, percent: randomPercent });
  }, []);
  return (
    <Container className="flex flex-col justify-between items-center">
      <PContainer>
        <PBackground>
          <InnerCircle></InnerCircle>
          <POut style={{ transform: `rotate(0deg)` }}>
            <PIn style={{ backgroundColor: "#3498db", transform: `rotate(120deg)` }}></PIn>
          </POut>
          <POut style={{ transform: `rotate(120deg)` }}>
            <PIn style={{ backgroundColor: "#2ecc71", transform: `rotate(120deg)` }}></PIn>
          </POut>
          <POut style={{ transform: `rotate(240deg)` }}>
            <PIn style={{ backgroundColor: "#e74c3c", transform: `rotate(120deg)` }}></PIn>
          </POut>
        </PBackground>
      </PContainer>
      <Slider
        min={0}
        max={1}
        style={{
          width: "200px",
        }}
        defaultValue={circle.percent}
        onChangeComplete={val => setCircle({ ...circle, percent: val })}
        step={0.01}
      />
      <GradientPie>
        <svg style={{ transform: "rotate(-90deg)" }} width="300" height="300">
          <circle
            r="140"
            ref={circleRef}
            cx="150"
            cy="150"
            className="stroke-[#f2f2f2] "
            stroke-width="21"
            fill="transparent"
            style={{
              strokeDashoffset: -circle.len * circle.percent,
              strokeDasharray: 880,
            }}
          ></circle>
        </svg>
        <CircleMask></CircleMask>
      </GradientPie>
    </Container>
  );
};
