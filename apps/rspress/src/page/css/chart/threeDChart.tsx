import styles, { keyframes, css } from "styled-components";
export default () => {
  let Container = styles.div`height:400px;`;
  let Chart = styles.div`
        width: 80%;
        height: 300px;
        display: flex;
        gap:1em;
        justify-content: space-between;
        align-items: flex-end;
        background-color: #f0f0f0;
        padding: 10px;
        position: relative;`;
  let Bar = styles.div`
        width: 30px;
        background-color: #3498db;
        transition: height 0.5s ease-in-out;
        position: relative;
  `;
  return (
    <Container>
      <Chart>
        {Array.from({ length: 7 }).map((_, index) => {
          return <Bar key={index} style={{ height: Math.random() * 100 + "%" }}></Bar>;
        })}
      </Chart>
    </Container>
  );
};
