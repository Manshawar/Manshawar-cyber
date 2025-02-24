/*
 * @Author: Manshawar 825750768@qq.com
 * @Date: 2025-02-24 11:01:16
 * @LastEditors: Manshawar 825750768@qq.com
 * @LastEditTime: 2025-02-24 11:21:55
 * @FilePath: \Manshawar-cyber\apps\rspress\src\components\JSONCollapsed.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from "react";
import styled from "styled-components";
import { useDark } from "rspress/runtime";
const ToggleButton = styled.button<{ isDark: boolean }>`
  background: none;
  border: none;
  color: ${props => (props.isDark ? "#fff" : "#333")};
  cursor: pointer;
  padding: 0 4px;
  font-family: monospace;
  font-size: 12px;
  font-weight: bold;

  &:hover {
    opacity: 0.8;
  }
`;

const List = styled.ul<{ isDark: boolean }>`
  list-style: none;
  margin: 0;
  padding-left: 1.5em;
  font-family: "Consolas", monospace;
  font-size: 13px;
  line-height: 1.5;
  color: ${props => (props.isDark ? "#fff" : "#000")};
`;

const ListItem = styled.li`
  margin: 4px 0;
`;

const Key = styled.span<{ isDark: boolean }>`
  color: ${props => (props.isDark ? "var(--rp-c-link)" : "#660e8a")};
  font-weight: 500;
`;

const Value = styled.span<{ isDark: boolean }>`
  color: ${props => (props.isDark ? "var(--code-color-text)" : "#1a1aa6")};
  font-weight: 500;

  // 字符串值使用不同颜色
  &:has(> span) {
    color: ${props => (props.isDark ? "var(--code-color-text)" : "#448c27")};
  }
`;

const Bracket = styled.span<{ isDark: boolean }>`
  color: ${props => (props.isDark ? "#fff" : "#000")};
  font-weight: 500;
`;

const Comma = styled.span<{ isDark: boolean }>`
  color: ${props => (props.isDark ? "#999" : "#666")};
  margin-right: 4px;
`;

const CollapsibleObject = ({ obj }: { obj: any }) => {
  const isDark = useDark();
  const [collapsed, setCollapsed] = useState(false); // 默认展开

  if (typeof obj !== "object" || obj === null) {
    return <Value isDark={isDark}>{JSON.stringify(obj)}</Value>;
  }

  if (Array.isArray(obj)) {
    return (
      <>
        <ToggleButton isDark={isDark} onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "▶" : "▼"}
        </ToggleButton>
        <Bracket isDark={isDark}>[</Bracket>
        {!collapsed && obj.length > 0 && (
          <List isDark={isDark}>
            {obj.map((item, index) => (
              <ListItem key={index}>
                <CollapsibleObject obj={item} />
                {index < obj.length - 1 && <Comma isDark={isDark}>,</Comma>}
              </ListItem>
            ))}
          </List>
        )}
        {collapsed && "..."} <Bracket isDark={isDark}>]</Bracket>
      </>
    );
  }
  return (
    <>
      <ToggleButton isDark={isDark} onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? "▶" : "▼"}
      </ToggleButton>
      <Bracket isDark={isDark}>{"{"}</Bracket>
      {!collapsed && Object.keys(obj).length > 0 && (
        <List isDark={isDark}>
          {Object.entries(obj).map(([key, value], index, array) => (
            <ListItem key={key}>
              <Key isDark={isDark}>{key}</Key>: <CollapsibleObject obj={value} />
              {index < array.length - 1 && <Comma isDark={isDark}>,</Comma>}
            </ListItem>
          ))}
        </List>
      )}
      {collapsed && "..."} <Bracket isDark={isDark}>{"}"}</Bracket>
    </>
  );
};

export default CollapsibleObject;
