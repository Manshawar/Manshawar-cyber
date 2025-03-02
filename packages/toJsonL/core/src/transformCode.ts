// md-processor.ts
import fs from 'fs-extra';
import path from 'path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import yaml from 'js-yaml';  // 添加 YAML 解析器
import type { Root, Content, Heading, Paragraph, Code } from 'mdast';
import type { MdxjsEsm } from 'mdast-util-mdxjs-esm';

// 类型定义
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface TrainingExample {
  messages: Message[];
  metadata?: Record<string, any>;
  filePath: string;  // 添加文件路径
}

// 核心解析器
function parseMarkdown(mdContent: string, filePath: string, isMdx = false): TrainingExample[] {
      let processor = unified()
        .use(remarkParse)
        .use(remarkFrontmatter, ['yaml'])
        .use(remarkGfm)
    if(isMdx){
        processor.use(remarkMdx, {
        jsx: true,
        elements: ['a'],  // 只处理 a 标签，移除 img
      });
    }
  


  const ast = processor.parse(mdContent) as Root;
 
  const examples: TrainingExample[] = [];
  let currentExample: TrainingExample | null = null;
  let contentBuffer = '';
  let metadata: Record<string, any> = {};

  const processNode = (node: Content) => {
    // 忽略图片节点
    if (node.type === 'image') {
      return;
    }
    
    // 处理 frontmatter
    if (node.type === 'yaml') {
      try {
        metadata = yaml.load(node.value) as Record<string, any>;  // 使用 yaml.load 替代 JSON.parse
      } catch (e) {
        console.warn('Failed to parse frontmatter:', e);
        metadata = {};  // 解析失败时使用空对象
      }
      return;
    }

    // 处理 MDX 导入和导出
    if (isMdx && node.type === 'mdxjsEsm') {
      const mdxNode = node as MdxjsEsm;
      contentBuffer += formatMdxEsm(mdxNode) + '\n';
      return;
    }
  
    // 遇到新标题时
    if (node.type === 'heading') {
      // 如果有未处理的内容，保存之前的示例
      if (currentExample && contentBuffer.trim()) {
        currentExample.messages.push({
          role: 'assistant',
          content: contentBuffer.trim()
        });
        examples.push(currentExample);
        contentBuffer = '';
      }

      // 创建新示例
      currentExample = {
        messages: [{
          role: 'user',
          content: extractHeadingText(node as Heading)
        }],
        metadata,
        filePath
      };
      return;
    }

    // 收集标题后的内容
    if (currentExample) {
      if (node.type === 'paragraph') {
        contentBuffer += extractParagraphText(node) + '\n';
      }
      
      if (node.type === 'code') {
        contentBuffer += formatCodeBlock(node) + '\n';
      }

      // 处理 MDX 组件
      if (isMdx && node.type === 'mdxJsxFlowElement') {
        contentBuffer += formatMdxComponent(node) + '\n';
      }
    }
  };

  // 处理所有节点
  ast.children.forEach(processNode);
  
  // 处理最后一个示例
  if (currentExample && contentBuffer.trim()) {
    (currentExample as TrainingExample).messages.push({
      role: 'assistant',
      content: contentBuffer.trim()
    });
    examples.push(currentExample);
  }

  return examples;
}

// 辅助方法
function extractHeadingText(heading: Heading): string {
  return heading.children
    .filter(child => child.type === 'text')
    .map(textNode => textNode.value)
    .join('');
}

function extractParagraphText(para: Paragraph): string {
  return para.children
    .filter(child => child.type === 'text')
    .map(textNode => textNode.value.trim())
    .join(' ');
}

function formatCodeBlock(code: Code): string {
  return `\`\`\`${code.lang || ''}
${code.value}
\`\`\``;
}

function formatMdxEsm(node: MdxjsEsm): string {
  return node.value;
}

function formatMdxComponent(node: any): string {
  // 简单处理 MDX 组件
  const name = node.name;
  const props = node.attributes
    .map((attr: any) => `${attr.name}="${attr.value}"`)
    .join(' ');
  return `<${name} ${props} />`;
}

// 导出主函数
export function transformMarkdownMap(sourceMap: Map<string, string>): TrainingExample[] {
  const allExamples: TrainingExample[] = [];
  // console.log(sourceMap)
  // return 
  sourceMap.forEach((content, filePath) => {
    const isMdx = filePath.endsWith('.mdx');
    
    const examples = parseMarkdown(content, filePath, isMdx);
    allExamples.push(...examples);
  });

  return allExamples;
}

// 导出类型
export type { TrainingExample, Message };

// 文件处理

// 写入 JSONL 文件
export function writeJsonLines(examples: TrainingExample[], outputPath: string) {
  const stream = fs.createWriteStream(outputPath);
  examples.forEach(example => {
    stream.write(JSON.stringify(example) + '\n');
  });
  stream.end();
}


// parseMarkdown(fs.readFileSync(path.join(process.cwd(), 'src/docs/02-初识HTML.md'), 'utf-8'), 'src/docs/02-初识HTML.md', false)