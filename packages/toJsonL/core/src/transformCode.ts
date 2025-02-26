
import fs from 'fs-extra';
import { parse } from '@babel/parser';
import _traverse from "@babel/traverse"

import path from 'path';
const testMap = new Map();
const testReactStr = fs.readFileSync(path.join(process.cwd(), 'src/tsx.txt'), 'utf-8');
testMap.set('src/test.tsx', testReactStr);


const ast = parse(testReactStr, {
  sourceType: 'module',
  plugins: ['typescript', 'jsx'],
});
let traverse:typeof _traverse = (_traverse as any).default ;
traverse(ast, {
  enter(path) {
    console.log('Visiting node:', path.node.type);
  },
});