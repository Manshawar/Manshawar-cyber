import styles from "styled-components";
import React, { useState } from "react";
import { Slider, Tag, ConfigProvider, InputNumber } from "antd";
export default () => {
  const bgColor = "rgba(2,57,62,.5)";

  let initmartixData = [
    [
      { val: 1, min: 0, max: 2 },
      { val: 0, min: -1, max: 1 },
      { val: 0, min: -1, max: 1 },
      { val: 0, min: -2, max: 2 },
    ],
    [
      { val: 0, min: -1, max: 1 },
      { val: 1, min: 0, max: 2 },
      { val: 0, min: -1, max: 1 },
      { val: 0, min: -2, max: 2 },
    ],
    [
      { val: 0, min: 0, max: 2 },
      { val: 0, min: -1, max: 1 },
      { val: 1, min: 0, max: 2 },
      { val: 0, min: -2, max: 2 },
    ],
    [
      { val: 0, min: -10, max: 10 },
      { val: 0, min: -10, max: 10 },
      { val: 0, min: -1, max: 1 },
      { val: 1, min: 0, max: 2 },
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
      <div>
        {martixData.map(item => {
          return (
            <div className="flex gap-3">
              {item.map(col => (
                <div>{col.val}</div>
              ))}
            </div>
          );
        })}
      </div>
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
              <div className="w-full flex-col" key={colIndex}>
                <div className="flex justify-between items-center">
                  <span className="text-[.6rem]">
                    {rowIndex},{colIndex}
                  </span>
                  <InputNumber
                    min={col.min}
                    max={col.max}
                    defaultValue={col.val}
                    value={col.val}
                    onChange={val => onChange(val as number, rowIndex, colIndex)}
                    className=" border-none bg-transparent h-7 "
                  />
                </div>
                <Slider
                  className="flex-1"
                  min={col.min}
                  max={col.max}
                  defaultValue={col.val}
                  onChange={val => onChange(val, rowIndex, colIndex)}
                  step={0.01}
                />
              </div>
            ))}
          </div>
        ))}
      </ConfigProvider>

      <div className="flex justify-center w-full h-64 items-center  preserve-3d perspective-500">
        <Box></Box>
      </div>
    </div>
  );
};
