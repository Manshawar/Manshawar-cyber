import React from "react";

import BaseSvg from "./static/base.svg";
import ImgSvg from "./static/img.svg";
import TextAni from "./static/textAni.svg";
import TestClip from "./static/testClip.svg";
const Base = () => {
  return (
    <div className="flex justify-between items-center">
      <BaseSvg />
      <ImgSvg></ImgSvg>
      <TextAni></TextAni>
      <TestClip></TestClip>
    </div>
  );
};

export default Base;
