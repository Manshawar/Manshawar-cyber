# 这是一个turbo应用

## 安装turbo

```sh
npm i turbo -g
```

## 克隆仓库

```bash
git clone https://github.com/Manshawar/Manshawar-cyber.git
```

## 安装包

```bash
npm i pnpm -g
pnpm i 
//如果单独安装某个子包的应用请使用
pnpm i --filter <package.json的name>
```

## 开启博客应用

```bash
turbo blog
```

请确认您安装了node_module 如果子文件中没有 推荐使用下列命令进行安装

```bash
pnpm i --filter rspress-blog
```

## 使用tauri图床应用

请确保您安装了 `rust`及其相关环境，rust应用基于antdesignpro进行改造

```bash
turbo ant:t
```
