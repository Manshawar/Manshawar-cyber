import fs from "fs-extra"
import path from 'path';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
// 类型定义
interface TrainingData {
  messages: {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }[];
}

interface CodeStructure {
  components: string[];
  props: string[];
  methods: string[];
  variables: string[];
  filePath: string;
}

abstract class FileProcessor {
  abstract extensions: string[];
  
  async processDirectory(dirPath: string): Promise<TrainingData[]> {
    const files = await this.getFiles(dirPath);
    return Promise.all(files.map(file => this.processFile(file)));
  }

  private async getFiles(dirPath: string): Promise<string[]> {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const files = await Promise.all(entries.map(entry => {
      const fullPath = path.join(dirPath, entry.name);
      return entry.isDirectory() ? this.getFiles(fullPath) : fullPath;
    }));
    return files.flat().filter(file => 
      this.extensions.some(ext => file.endsWith(ext))
    );
  }

  protected abstract parseCode(content: string): CodeStructure;

  protected generateExplanation(structure: CodeStructure): string {
    const { components, props, methods, variables } = structure;
    const parts: string[] = [];
    
    if (components.length > 0) {
      parts.push(`包含以下组件：${components.join(', ')}`);
    }
    if (props.length > 0) {
      parts.push(`定义了属性：${props.join(', ')}`);
    }
    if (methods.length > 0) {
      parts.push(`包含方法：${methods.join(', ')}`);
    }
    if (variables.length > 0) {
      parts.push(`声明了变量：${variables.join(', ')}`);
    }

    return `该React组件${parts.join('，')}。文件位置：${structure.filePath}`;
  }

  private async processFile(filePath: string): Promise<TrainingData> {
    const content = await fs.readFile(filePath, 'utf-8');
    const structure = this.parseCode(content);
    structure.filePath = path.relative(process.cwd(), filePath);

    return {
      messages: [
        {
          role: 'system',
          content: '你是一个资深React开发者，需要解释项目中的组件结构'
        },
        {
          role: 'user',
          content: `请解释 ${path.basename(filePath)} 文件中的React组件结构`
        },
        {
          role: 'assistant',
          content: this.generateExplanation(structure)
        }
      ]
    };
  }
}
