/*
 * @Author: Manshawar 825750768@qq.com
 * @Date: 2025-01-20 14:03:19
 * @LastEditors: Manshawar 825750768@qq.com
 * @LastEditTime: 2025-02-20 15:17:28
 * @FilePath: \Manshawar-cyber\apps\rspress\theme\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect } from "react";
import { loadOml2d, Oml2dMethods } from "oh-my-live2d";
import Theme from "rspress/theme";
import { useLocation } from "rspress/runtime";
import("./styles/index.css").then(() => {
  console.log("Styles loaded");
});

// 以下展示所有的 Props
const Layout = () => {
  let location = useLocation();
  let live2d: Oml2dMethods;
  useEffect(() => {
    live2d = loadOml2d({
      dockedPosition: "right",
      models: [
        {
          path: "https://www.yanghaoran.online/live2d/Kar98k-normal/model.json",
          scale: 0.1,
          position: [0, 0],
        },
      ],
    });

    if (location.pathname !== "/" && location.pathname !== "/index.html") {
      let asideDom = document.getElementById("aside-container");
      let enterFn = () => {
        live2d && live2d.stageSlideOut();
      };
      let leaveFn = () => {
        live2d && live2d.stageSlideIn();
      };

      asideDom?.addEventListener("mouseenter", enterFn);
      asideDom?.addEventListener("mouseleave", leaveFn);
      // return () => {
      //   asideDom?.removeEventListener("mouseenter", enterFn);
      //   asideDom?.removeEventListener("mouseleave", leaveFn);
      // };
    }
  }, []);

  return (
    <Theme.Layout
      bottom={
        <div className=" flex justify-center items-center" style={{ padding: "10px 0" }}>
          <a
            href="https://beian.miit.gov.cn/"
            className="text-gray-500"
            target="_blank"
            rel="noopener noreferrer"
          >
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
