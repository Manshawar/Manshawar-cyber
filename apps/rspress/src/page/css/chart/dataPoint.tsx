import styles, { keyframes, css } from "styled-components";
export default () => {
  let Container = styles.div`height:400px;`;
  let rect = 200;
  let CssChart = styles.div`
     border-bottom: 1px solid;
        border-left: 1px solid;
        height: ${rect}px;
        width: ${rect}px;

        margin: 1em;
        padding: 0;
        position: relative;
  `;
  let LineChart = styles.ul`
 list-style: none;
        margin: 0;
        padding: 0;
  `;
  let arr = [
    [40, 20],
    [80, 40],
    [120, 80],
    [160, 40],
    [200, 20],
  ];
  let LineChartItem = styles.li<{ x: number; y: number }>`
  background-color: rgb(14, 41, 163);
        border: 2px solid rgb(14, 41, 163);
         list-style: none;
        border-radius: 50%;
        width: 10px;
        height: 10px;
        bottom:${p => p.y}px;
        left:${p => p.x}px;
        position: absolute;
        transform: translateX(-5px);
  `;
  return (
    <Container>
      <CssChart>
        {arr.map((item, index) => {
          return <LineChartItem key={index} x={item[0]} y={item[1]}></LineChartItem>;
        })}
      </CssChart>
    </Container>
  );
};
