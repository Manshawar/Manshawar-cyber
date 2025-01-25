import styles, { keyframes, css } from "styled-components";
let colorList = ["#222", "#401a2a", "#741a38", "#9b123c", "#c10a40"].reverse();
export default () => {
  let Container = styles.div`overflow: hidden;height:400px; perspective: 1000px; position: relative;transform-style: preserve-3d;`;
  let Assembly = styles.div` transform-style: preserve-3d; transform:rotateX(-35deg) rotateY(-45deg);padding-top: 20px;`;
  let Cube = styles.div<{ color: string; index: number; rect: number }>`
  width: ${props => props.rect}px;
  height: ${props => props.rect}px;
  background:${props => props.color};
  position: relative;
  transform-style: preserve-3d; 
 &:before,
&:after {
  width: inherit;
  height: inherit;
  content:"";
    background:${props => props.color};
    width: ${props => props.rect}px;
  height: ${props => props.rect}px;
    position: absolute;
    left:0;
    top:0; 
    display:block;
    filter: brightness(1.15);
}
&:after{
transform:rotateX(-90deg);
transform-origin: center top;
}
&:before{
transform:rotateY(-90deg);
transform-origin: center right

}
  `;
  let t = 2;
  let T3d = styles.div`transform-style: preserve-3d;`;
  let move = keyframes`from{
transform:translate(0em) scale3d(1, 1, 1);
  }
  to{
transform:translate(7em) scale3d(0, 0, 0);
  }
  `;
  let switchAnimation = keyframes`
    to {
    transform: rotateY(1turn); // 在最后一帧的时候将做360旋转
  }
  `;
  let Switch_in = styles(T3d)`
  animation: ${switchAnimation} ${4 * t}s steps(4) infinite;
  `;
  let Move = styles(T3d)`
 animation: ${move} ${t}s ease-in-out infinite;;
  `;
  let Move_out = styles(Switch_in)`
   animation-direction: reverse;
   animation-timing-function: steps(4, start);
  `;
  return (
    <Container>
      <Assembly className="flex flex-col justify-start w-full h-full items-center gap-10 absolute top-0 left-0">
        {colorList.map((item, index) => {
          return <Cube color={item} index={index} rect={30}></Cube>;
        })}
      </Assembly>
      <Assembly className="flex flex-col justify-start w-full h-full items-center gap-10 absolute top-0 left-0">
        {colorList.map((item, index) => {
          return (
            <Move_out>
              <Move>
                <Switch_in>
                  <Cube color={item} index={index} rect={30}></Cube>
                </Switch_in>
              </Move>
            </Move_out>
          );
        })}
      </Assembly>
    </Container>
  );
};
