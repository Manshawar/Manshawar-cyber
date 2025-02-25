interface JsonlPluginOptions {
  // 支持字符串数组或正则表达式
  extensions?: string[] | RegExp;
  maxLength?: number;
}

export type { JsonlPluginOptions };