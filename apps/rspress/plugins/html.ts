import { env } from 'node:process';

let initHtmlTag = [
  {
    tag: 'meta',
    // 通过 window.RSPRESS_THEME 变量来指定默认的主题模式，可选值为 'dark' 和 'light'
    attrs: {
      name: 'keywords',
      content: "杨浩然 杨浩然的个人博客 杨浩然的博客 杨浩然的个人网站 Manshawar Manshawar Blog Manshawar博客 博客"
    },
    head: true
  },

  {
    tag: 'meta',
    // 通过 window.RSPRESS_THEME 变量来指定默认的主题模式，可选值为 'dark' 和 'light'
    attrs: {
      name: 'description',
      content: "杨浩然的个人记录学习博客 Manshawar 个人博客 Manshawar博客 博客 个人网站"
    },
    head: true
  },
]
let webApp: any = [
  {
    tag: 'link',
    attrs: {
      rel: "manifest",
      href: "/sw/manifest.json"
    }
  },
  {

    tag: 'script',
    attrs: { src: '/sw/service.js' },
  },
  {
    tag: 'script',
    // 通过 window.RSPRESS_THEME 变量来指定默认的主题模式，可选值为 'dark' 和 'light'
    children: "window.RSPRESS_THEME = 'dark';",
  },

]
export function myAttr() {
  if (env.NODE_ENV !== 'development') {
    initHtmlTag.push(...webApp)
  }
  return initHtmlTag
};

/* env.NODE_ENV !== 'development' ? : [] */