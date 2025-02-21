declare module '*.svg?url' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  import React from 'react';

  // 导出为 React 组件
  const SVGComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  // 导出为 URL
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export const url: string;

  // 默认导出为组件
  export default SVGComponent;
}

// 声明全局 SVG 元素的类型
declare global {
  namespace JSX {
    interface IntrinsicElements {
      svg: React.SVGProps<SVGSVGElement>;
      path: React.SVGProps<SVGPathElement>;
      circle: React.SVGProps<SVGCircleElement>;
      rect: React.SVGProps<SVGRectElement>;
      line: React.SVGProps<SVGLineElement>;
      polygon: React.SVGProps<SVGPolygonElement>;
      polyline: React.SVGProps<SVGPolylineElement>;
      g: React.SVGProps<SVGGElement>;
      defs: React.SVGProps<SVGDefsElement>;
      linearGradient: React.SVGProps<SVGLinearGradientElement>;
      stop: React.SVGProps<SVGStopElement>;
      text: React.SVGProps<SVGTextElement>;
    }
  }
} 