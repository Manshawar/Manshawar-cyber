import React from "react";
import CollapsibleObject from "@/components/JSONCollapsed";
export default function Diff() {
  // 定义虚拟节点接口
  interface VNode {
    type: string;
    props: Record<string, any>;
    children: VNode[];
    key?: string | number;
  }

  // 定义补丁操作的几种类型
  type Patch =
    | { type: "REPLACE"; newNode: VNode }
    | { type: "UPDATE_PROPS"; props: Record<string, any> }
    | { type: "REORDER"; moves: (MoveAction | null)[] }
    | { type: "TEXT"; content: string };

  type MoveAction =
    | { type: "INSERT"; node: VNode; index: number }
    | { type: "REMOVE"; index: number };

  // 核心diff算法
  function diff(oldNode: VNode, newNode: VNode): Patch[] {
    const patches: Patch[] = [];

    // 1. 类型不同直接替换
    if (oldNode.type !== newNode.type) {
      patches.push({ type: "REPLACE", newNode });
      return patches;
    }

    // 2. 比较属性差异
    const propPatches = diffProps(oldNode.props, newNode.props);
    if (propPatches) {
      patches.push({ type: "UPDATE_PROPS", props: propPatches });
    }

    // 3. 比较子节点差异
    const childPatches = diffChildren(oldNode.children, newNode.children);
    console.log("childPatches", childPatches);
    if (childPatches.length > 0) {
      patches.push({ type: "REORDER", moves: childPatches });
    }

    return patches;
  }

  // 比较属性差异
  function diffProps(
    oldProps: Record<string, any>,
    newProps: Record<string, any>
  ): Record<string, any> | null {
    const patches: Record<string, any> = {};
    let hasChanges = false;

    // 找出变化的属性
    for (const key in newProps) {
      if (newProps[key] !== oldProps[key]) {
        patches[key] = newProps[key];
        hasChanges = true;
      }
    }

    // 找出被删除的属性
    for (const key in oldProps) {
      if (!(key in newProps)) {
        patches[key] = undefined;
        hasChanges = true;
      }
    }

    return hasChanges ? patches : null;
  }

  // 比较子节点差异（简化版）
  function diffChildren(oldChildren: VNode[], newChildren: VNode[]): (MoveAction | null)[] {
    const moves: (MoveAction | null)[] = [];
    const oldMap: Record<string | number, VNode> = {};
    const newMap: Record<string | number, VNode> = {};

    // 创建key映射表
    oldChildren.forEach((child, index) => {
      const key = child.props.key ?? index;
      oldMap[key] = child;
    });

    newChildren.forEach((child, index) => {
      const key = child.props.key ?? index;
      newMap[key] = child;
    });

    // 找出需要删除的节点
    oldChildren.forEach((child, index) => {
      const key = child.props.key ?? index;
      if (!newMap[key]) {
        moves.push({ type: "REMOVE", index });
      }
    });

    // 找出需要新增/移动的节点
    newChildren.forEach((child, newIndex) => {
      const key = child.props.key ?? newIndex;
      const oldIndex = oldChildren.find(c => (c.props.key ?? c) === key);

      if (!oldIndex) {
        moves.push({ type: "INSERT", node: child, index: newIndex });
      } else if (oldIndex.props.key !== key) {
        moves.push({ type: "INSERT", node: child, index: newIndex });
      }
     
    });

    return moves;
  }

  // 使用示例
  const oldVNode: VNode = {
    type: "div",
    props: { className: "container" },
    children: [
      { type: "p", props: { key: 1 }, children: [] },
      { type: "span", props: { key: 2 }, children: [] },
    ],
  };

  const newVNode: VNode = {
    type: "div",
    props: { className: "wrapper" },
    children: [
      { type: "span", props: { key: 2 }, children: [] },
      { type: "input", props: { key: 3 }, children: [] },
    ],
  };

  const patches = diff(oldVNode, newVNode);
  console.log(patches);
  return (
    <div>
      <CollapsibleObject obj={patches} />
    </div>
  );
}
