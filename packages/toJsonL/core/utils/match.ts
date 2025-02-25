// 默认支持的文件类型
export const DEFAULT_EXTENSIONS = [
  '.vue',
  '.js',
  '.ts',
  '.jsx',
  '.tsx',
  '.md',
  '.mdx',
];

// 检查文件是否匹配
export const isFileMatch = (filePath: string, extensions: string[] | RegExp = DEFAULT_EXTENSIONS): boolean => {
  // 排除 node_modules
  if (filePath.includes('node_modules')) {
    return false;
  }

  if (extensions instanceof RegExp) {
    return extensions.test(filePath);
  }
  return extensions.some(ext => filePath.endsWith(ext));
};