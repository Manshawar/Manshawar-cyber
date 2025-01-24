import styles, { keyframes, css } from "styled-components";
export default () => {
  let a1 = (props: { i: number }) => {
    let { i } = props;
    return keyframes`0% {
    transform: translate(${30 * (i - 1)}px, 0);
  }

  30% {
    transform: translate(10px, ${10 * i}px) rotate(60deg) scale(${i * 0.009});
  }

  60% {
    transform: translate(${10 * i}px, 10px) rotate(120deg) scale(${i * 0.009});
  }

  80% {
    transform: translate(0,${30 * (i - 1)}px) scale(${i * 0.009});
  }

  100% {
    transform: translate(${30 * (i - 1)}px, 0);
  }`;
  };

  // animation: ${a1} 4s infinite;
  let BoxItem = styles.div<{ i: number; intI: number }>`width: 60px;
  height: 60px;
  border-radius: 12px;
  position: absolute;
 
  ${props => css`
    &:nth-child(${props.i}) {
      background-color: hsl(${40 + 3 * props.i}, 55%, 50%);
      transform: translate(${30 * (props.i - 1)}px, 0);

      animation: ${a1(props)} 4s infinite;
      animation-delay: ${props.i * 0.02}s;
    }
  `}
  `;
  return (
    <div className="mt-10 h-[400px] scale-[20%]  hover:scale-100">
      {Array.from({ length: 4 }).map((_, intI) => {
        return (
          <div key={intI} style={{ transform: `rotate(${intI * 90}deg)` }}>
            {Array.from({ length: 40 }, (_, index) => (
              <BoxItem key={index} i={index + 1} intI={intI + 1}></BoxItem>
            ))}
          </div>
        );
      })}
    </div>
  );
};
