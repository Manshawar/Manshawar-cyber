import styled, { keyframes } from "styled-components";
import React from "react";

const ChartContainer = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
`;

const Chart = styled.div`
  width: 600px;
  height: 400px;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateY(-30deg);
`;

const Coordinates = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
`;

const YAxis = styled.div`
  position: absolute;
  left: -40px;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
`;

const XAxis = styled.div`
  position: absolute;
  bottom: -30px;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const Label = styled.div`
  color: #666;
  font-size: 12px;
`;

const Grid = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
`;

const GridFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-size: 20% 20%;
`;

const GridLeft = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotateY(90deg) translateZ(-1px);
  background: linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-size: 20% 20%;
`;

const GridBottom = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotateX(90deg) translateZ(0);
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-size: 20% 20%;
`;

const Bars = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
`;

const BarWrapper = styled.div<{ index: number; isMax: boolean }>`
  position: absolute;
  bottom: 0;
  width: 40px;
  transform-style: preserve-3d;
  transform: translateX(-20px);
  left: ${props => 25 + props.index * 20}%;
  z-index: ${props => (props.isMax ? 10 : 1)};
`;

const Bar = styled.div<{ height: number; color: string; isHighlighted: boolean }>`
  position: relative;
  width: 100%;
  height: ${props => props.height}px;
  transform-style: preserve-3d;
  transform-origin: bottom center;
  transition: all 0.3s ease;
`;

const BarFace = styled.div<{ color: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.8;
`;

const BarFront = styled(BarFace)`
  background: ${props => props.color};
  transform: translateZ(20px);
`;

const BarBack = styled(BarFace)`
  background: ${props => props.color};
  transform: translateZ(-20px);
`;

const BarLeft = styled(BarFace)`
  width: 40px;
  background: ${props => props.color};
  filter: brightness(0.8);
  transform: rotateY(90deg) translateZ(-20px);
`;

const BarRight = styled(BarFace)`
  width: 40px;
  background: ${props => props.color};
  filter: brightness(0.8);
  transform: rotateY(-90deg) translateZ(20px);
`;

const BarTop = styled(BarFace)`
  height: 40px;
  background: ${props => props.color};
  filter: brightness(1.2);
  transform: rotateX(-90deg) translateZ(-20px);
`;

const BarValue = styled.div<{ isHighlighted: boolean }>`
  position: absolute;
  top: -24px;
  width: 100%;
  text-align: center;
  color: ${props => (props.isHighlighted ? "#ff6b6b" : "#333")};
  font-size: 12px;
  font-weight: ${props => (props.isHighlighted ? "bold" : "normal")};
  transform: translateZ(20px);
`;

export default () => {
  const chartData = {
    xAxis: ["Q1", "Q2", "Q3", "Q4"],
    yAxis: ["400", "300", "200", "100", "0"],
    data: [
      { value: 320, color: "#4facfe" },
      { value: 240, color: "#43e97b" },
      { value: 380, color: "#fa709a" },
      { value: 220, color: "#66a6ff" },
    ],
  };

  const maxValue = Math.max(...chartData.data.map(item => item.value));
  const maxIndex = chartData.data.findIndex(item => item.value === maxValue);

  return (
    <ChartContainer>
      <Chart>
        <Coordinates>
          <YAxis>
            {chartData.yAxis.map((value, index) => (
              <Label key={index}>{value}</Label>
            ))}
          </YAxis>
          <XAxis>
            {chartData.xAxis.map((value, index) => (
              <Label key={index}>{value}</Label>
            ))}
          </XAxis>
          <Grid>
            <GridFront />
            <GridLeft />
            <GridBottom />
          </Grid>
        </Coordinates>

        <Bars>
          {chartData.data.map((item, index) => (
            <BarWrapper key={index} index={index} isMax={index === maxIndex}>
              <Bar height={item.value} color={item.color} isHighlighted={index === maxIndex}>
                <BarFront color={item.color} />
                <BarBack color={item.color} />
                <BarLeft color={item.color} />
                <BarRight color={item.color} />
                <BarTop color={item.color} />
                <BarValue isHighlighted={index === maxIndex}>{item.value}</BarValue>
              </Bar>
            </BarWrapper>
          ))}
        </Bars>
      </Chart>
    </ChartContainer>
  );
};
