
import { createStyles } from "antd-style";
export default () => {
  const style = createStyles(({ token }) => {
    return {
      defaultBg: "rgba(255, 255, 255, 0.3)"
    };
  });
  return { defaultStyle: style().styles };
};
