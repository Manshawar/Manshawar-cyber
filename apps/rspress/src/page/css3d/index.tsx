import styles from "styled-components";
import React, { useState } from "react";
import { Slider, ConfigProvider, InputNumber } from "antd";
export default () => {
  const bgColor = "rgba(2,57,62,.5)";

  let initmartixData = [
    [
      { label: "", val: 1 },
      { label: "", val: 0 },
      { label: "", val: 0 },
      { label: "", val: 0 },
    ],
    [
      { label: "", val: 0 },
      { label: "", val: 1 },
      { label: "", val: 0 },
      { label: "", val: 0 },
    ],
    [
      { label: "", val: 0 },
      { label: "", val: 0 },
      { label: "", val: 1 },
      { label: "", val: 0 },
    ],
    [
      { label: "", val: 0 },
      { label: "", val: 0 },
      { label: "", val: 0 },
      { label: "", val: 1 },
    ],
  ];

  const [martixData, setMartixData] = useState(initmartixData);

  const Box = styles.div` width: 100px;
    height: 100px;
    background-color: gray;
    transform: matrix3d(${martixData
      .flat()
      .map(item => item.val)
      .join(",")});`;
  const [disabled, setDisabled] = useState(false);

  const onChange = (val: number, rowIndex: number, colIndex: number) => {
    martixData[rowIndex][colIndex].val = val;
    setMartixData([...martixData]);
  };
  return (
    <div className="mt-10">
      <ConfigProvider
        theme={{
          components: {
            Slider: {
              railBg: bgColor,
            },
            InputNumber: {
              controlWidth: 48,
              inputFontSizeLG: 8,
              inputFontSizeSM: 6,
            },
          },
          token: {
            colorText: "rgba(30,128,255,.7)", // 修改全局字体颜色
          },
        }}
      >
        {martixData.map((row, rowIndex) => (
          <div className="flex justify-evenly gap-3 mt-3" key={rowIndex}>
            {row.map((col, colIndex) => (
              <div className="w-full relative" key={colIndex}>
                <InputNumber
                  min={1}
                  max={10}
                  defaultValue={col.val}
                  value={col.val}
                  onChange={val => onChange(val as number, rowIndex, colIndex)}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 border-none  focus:outline-none bg-transparent h-7"
                />
                <Slider
                  className="flex-1"
                  min={1}
                  max={20}
                  onChange={val => onChange(val, rowIndex, colIndex)}
                />
              </div>
            ))}
          </div>
        ))}
      </ConfigProvider>

      <Box></Box>
    </div>
  );
};
