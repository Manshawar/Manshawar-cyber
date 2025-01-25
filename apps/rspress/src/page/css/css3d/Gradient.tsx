import styles, { keyframes, css } from "styled-components";
let colorList = ["#222", "#401a2a", "#741a38", "#9b123c", "#c10a40"].reverse();
export default () => {
  let Container = styles.div`overflow: hidden;height:400px;`;
  let Text = styles.div`display:flex;justify-content:center;align-items:center;padding:10px;text-align:center`;
  let gradientAnimation = keyframes`    0% {
        background-position: -100%;
    }

    100% {
        background-position: 100%;
    }`;
  let GradientLine = styles.div`
   width: 300px;
    height: 20px;
    background-image: linear-gradient(45deg, rgba(0, 0, 0, .1) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, .1) 50%, rgba(0, 0, 0, .1) 75%, transparent 75%, transparent);
    background-size: 1.25em 1.25em;
    animation-name: ${gradientAnimation};
    animation-duration: 6s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    background-color: rgb(28, 219, 28);
    border-radius: 10px;
  `;
  return (
    <Container>
      <div className="flex justify-between  w-full h-full flex-wrap">
        <Text className="w-[33%] mb-1" style={{ background: "linear-gradient(black,white)" }}>
          linear-gradient(black,white)
        </Text>
        <Text
          className="w-[33%] bg-slate-500 mb-1"
          style={{ background: "linear-gradient(to right, black, white)" }}
        >
          linear-gradient(to right, black, white)
        </Text>
        <Text
          className="w-[33%] bg-slate-500 mb-1"
          style={{
            background:
              "linear-gradient(to right, rgba(200, 40, 10, 1), rgba(230, 40, 10, 0)),linear-gradient(to left, hsl(220, 80%, 45%, 1), hsl(220, 80%, 45%, 0)),linear-gradient(0.5turn, rgba(20, 230, 30, 1), rgba(20, 230, 20, 0))",
            backgroundBlendMode: "difference",
          }}
        >
          <div>
            <p>background:</p>
            <p>linear-gradient(to right, rgba(200, 40, 10, 1), rgba(230, 40, 10, 0)),</p>
            <p>linear-gradient(to left, hsl(220, 80%, 45%, 1), hsl(220, 80%, 45%, 0)),</p>
            <p>linear-gradient(0.5turn, rgba(20, 230, 30, 1), rgba(20, 230, 20, 0)),</p>
            <p>backgroundBlendMode: "difference",</p>
          </div>
        </Text>
        <Text
          className="w-[33%] bg-slate-500 mb-1"
          style={{
            background:
              "repeating-linear-gradient(135deg,  hsl(333, 62%, 47%) 0 10px,   hsl(161, 100%, 64%) 10px 20px)",
          }}
        >
          background: "repeating-linear-gradient(135deg, hsl(333, 62%, 47%) 0 10px, hsl(161, 100%,
          64%) 10px 20px)",
        </Text>
        <Text className="w-[33%] bg-slate-500 mb-1">
          <GradientLine></GradientLine>
        </Text>
        <Text
          className="w-[33%] bg-slate-500 mb-1"
          style={{
            background:
              "conic-gradient(rgb(28, 150, 215) 0deg 90deg, white 90deg 180deg, rgb(151, 209, 243) 180deg 270deg, white 270deg 360deg)",
            backgroundSize: "10% 10%",
          }}
        ></Text>
      </div>
    </Container>
  );
};



