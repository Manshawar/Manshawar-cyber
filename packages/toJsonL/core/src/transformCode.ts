/*
 * @Author: Manshawar 825750768@qq.com
 * @Date: 2025-02-25 13:39:46
 * @LastEditors: Manshawar 825750768@qq.com
 * @LastEditTime: 2025-02-25 15:29:20
 * @FilePath: \Manshawar-cyber\packages\toJsonL\core\src\transformCode.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import path from "path"
export function transformCode({ code, resourcePath, root }: { code: string, resourcePath: string, root: string }) {

  let relativePath = path.relative(root, resourcePath);
  let extension = path.extname(resourcePath).slice(1);
  console.log(extension)

}


function buildSystemMessage(framework: string) {
  return `你是一个${framework.toUpperCase()}专家，回答需严格遵循项目规范`;
}

function generateQuestion(block: any, filename: string) {
  const questions = {
    component: `请解释${filename}中${block.name}组件的作用`,
    markdown: `总结${filename}中"${block.name}"章节内容`,
    function: `说明${block.name}函数的功能和参数`
  };
  return questions[block.type as keyof typeof questions] || '请解释以下代码';
}

function generateAnswer(block: any, filepath: string) {
  const codePrefix = block.type === 'markdown' ? '文档内容' : '代码实现';
  return `${codePrefix}：
\`\`\`${block.type === 'markdown' ? 'markdown' : 'typescript'}
${block.content.slice(0, 200)}
\`\`\`
—— 来源：${filepath}#${block.name}`;
}
