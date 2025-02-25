export function tailTemplate(type: string) {

  switch (type) {
    case "REACT":
      return reactTemplate
    default:
      return null
  }
}
function reactTemplate(code: string) {
  return `[
  {
    "role": "system",
    "content": "You are a Senior React Engineer specializing in frontend code analysis. Your task is to:\n1. Parse React components (JSX/TSX), hooks, and state management logic\n2. Analyze file structure (components, utils, pages, etc.)\n3. Identify key patterns:\n   - Component hierarchy\n   - Custom hooks usage\n   - Props/State types\n   - Context API/Redux usage\n   - Dependency relationships\n4. Provide optimization suggestions:\n   - Performance improvements\n   - Code splitting opportunities\n   - React best practices\n5. Support analysis of:\n   - Next.js/Gatsby frameworks\n   - TypeScript interfaces\n   - CSS-in-JS implementations\n\nFormat responses with:\n- Clear section headers\n- Code snippets when relevant\n- Bullet-point recommendations\n- Visual hierarchy markup\n- Compatibility with uploaded code files"
  },
  {
    "role": "user",
    "content": "Analyze this React component structure: (用户上传代码文件/片段)"
  },
  {
     "role": "assistant",
      "content":${code}
  }
]`
}