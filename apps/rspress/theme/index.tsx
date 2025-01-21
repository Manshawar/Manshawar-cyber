import Theme from "rspress/theme";
import { useEffect } from "react";
import "./styles/index.css";
// 以下展示所有的 Props
const Layout = () => {
  useEffect(() => {
    let dom = document.getElementById("aside-container");

    dom?.addEventListener("mouseenter", () => {
      let stage = document.getElementById("oml2d-stage") as HTMLElement;
      stage.style.opacity = "0";
      stage.style.zIndex = "-1";
    });
    dom?.addEventListener("mouseleave", () => {
      let stage = document.getElementById("oml2d-stage") as HTMLElement;
      stage.style.opacity = "1";
      stage.style.zIndex = "0";
    });
  }, []);

  return (
    <Theme.Layout
      bottom={
        <div className=" flex justify-center items-center" style={{ padding: "10px 0" }}>
          <a href="https://beian.miit.gov.cn/" className="text-gray-500" target="_blank">
            鄂ICP备2025091864号-1
          </a>
        </div>
      }
    />
  );
};
export default {
  ...Theme,
  Layout,
};

export * from "rspress/theme";
