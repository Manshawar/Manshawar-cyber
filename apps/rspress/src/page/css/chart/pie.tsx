import styles, { keyframes, css } from "styled-components";
export default () => {
  let Container = styles.div`height:150px`;
  let PContainer = styles.div`height:150px;position:relative`;
  let PBackground = styles.div`
  height:150px;
  position:absolute;
  width:150px;
  border-radius:100%;
  box-shadow:0px 0px 8px rgba(0,0,0,0.5)
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
    background-color: transparent;
    border-radius: 100%;
    top: 15px;
    left: 15px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5) inset;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index:2
    `;
  const colorArray = [
    "#3498db", // 明亮的蓝色
    "#2ecc71", // 翠绿色
    "#e74c3c", // 鲜红色
    // "#f39c12", // 橙色
    // "#9b59b6", // 紫色
    // "#1abc9c", // 青绿色
    // "#34495e", // 深蓝灰色
    // "#e67e22", // 深橙色
    // "#95a5a6", // 浅灰色
    // "#d35400", // 深褐色
  ];
  return (
    <Container>
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
    </Container>
  );
};
