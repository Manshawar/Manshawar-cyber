import styles, { keyframes, css } from "styled-components";
let colorList = ["#222", "#401a2a", "#741a38", "#9b123c", "#c10a40"].reverse();
export default () => {
  // animation: ${a1} 4s infinite;
  let Container = styles.div`overflow: hidden; padding-top: 80px;height:700px;  perspective: 1000px; position: relative;`;
  let Assembly = styles.div` transform-style: preserve-3d; `;
  // transform:translateY(100px) rotateX(-35deg) rotateY(-45deg);
  //  transform-style: rotateX(-35deg) rotateY(-45deg)
  let Cube = styles.div`
  transform:rotateX(-35deg) rotateY(-45deg); 
  margin: -3em;
  width: 5em;
  height: 5em;
  background:${props => props.color};
  position: relative;
  transform-style: preserve-3d; 
  top:100px;
 &:before,
&:after {
  width: inherit;
  height: inherit;
  content:"";
    background:${props => props.color};
    width: 5em;
  height: 5em;
    position: absolute;
    left:0;
    top:0; 
    display:block;
}
&:after{
transform:rotateX(-90deg);
transform-origin: center top
}
&:before{
transform:rotateY(-90deg);
transform-origin: center right
}
  `;
  let animation = keyframes`from{
transform:translate(8.4em) scale3d(1, 1, 1);
  }
  to{
transform:translate(11.2em) scale3d(0, 0, 0);
  }
  `;
  return (
    <Container>
      <Assembly className="flex flex-col justify-center w-full h-full items-center  absolute top-0 left-0">
        {colorList.map((item, index) => {
          return <Cube color={item}></Cube>;
        })}
      </Assembly>
      <Assembly className="flex flex-col justify-center w-full h-full items-center  absolute top-0 left-0">
        {colorList.map(item => {
          return <Cube color={item}></Cube>;
        })}
      </Assembly>
    </Container>
  );
};
