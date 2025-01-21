# Git使用指南

## 安装

1. 先去官网下载这个软件, 准备安装到本电脑中
   > [git-scm.com/](https://link.juejin.cn?target=https%3A%2F%2Fgit-scm.com%2F "https://git-scm.com/")
2. 根据自己电脑系统下载此软件到本机
   > Windows 系统直接下载 .exe 文件即可，macOS 系统使用 [Homebrew](https://link.juejin.cn?target=https%3A%2F%2Fbaijiahao.baidu.com%2Fs%3Fid%3D1668544039877443967%26wfr%3Dspider%26for%3Dpc "https://baijiahao.baidu.com/s?id=1668544039877443967&wfr=spider&for=pc") 命令行安装，终端输入 git --version 确认安装

![image-20230612100943906.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b965f0202334842b029f372fff23ae7~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1691&h=893&s=373076&e=png&b=f1f1ea)

3. 默认选择默认安装路径即可，如若想更改路径，务必使用**英文路径**
4. 对于 Windows 系统，查看安装是否成功: 在任意文件夹右键, 查看是否有Git Base Here 选项, 有就成功了

![image-20230612101818017.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ecc82bd4d384d599021998eff925f5f~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1256&h=544&s=182944&e=png&b=fcfcfc)

## 介绍

Git 的三个区域：

- **工作区** ：处理工作的区域
- **暂存区** ：临时存放的区域
- **本地git仓库** ：最终的存放区域

在文件夹的体现如下：

- **工作区** ：在你电脑里看到的目录
- **暂存区** ：在.git文件夹内的index中 (二进制记录)
- **版本库** ：指的整个.git文件夹 (也认为是本地仓库)

在代码中的体现如下：

![image-20230612154411204-1687173588607.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae33cb79a42d49b7959adfe1d01bf132~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1256&h=621&s=112102&e=png&b=fdfcfc)

# Git使用

> 官方文档：[教程链接](https://link.juejin.cn?target=https%3A%2F%2Fgit-scm.com%2Fbook%2Fzh%2Fv2%2F%25E8%25B5%25B7%25E6%25AD%25A5-%25E5%2585%25B3%25E4%25BA%258E%25E7%2589%2588%25E6%259C%25AC%25E6%258E%25A7%25E5%2588%25B6 "https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%85%B3%E4%BA%8E%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6")
>
> 菜鸟教程：[教程链接](https://link.juejin.cn?target=https%3A%2F%2Fwww.runoob.com%2Fgit%2Fgit-tutorial.html "https://www.runoob.com/git/git-tutorial.html")

## Git配置

安装完 Git 之后，要做的第一件事就是设置你的用户名和邮件地址。 因为每一个 Git 提交都会使用这些信息

命令格式如下：**中文自己看情况换**

> `git config`：固定命令，设置git相关配置
>
> `--global`：全局配置；一次配置，整机在使用git时都生效

git config --global user.name 你的用户名
git config --global user.email 你的邮箱地址

运行命令效果如下：

![image-20230612130038686.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c47580d485364928bc724fbba3237743~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=770&h=197&s=21309&e=png&b=000000)

配置后, 可以运行如下命令查看是否成功

```bash
git config --list
#如果信息太多，可以输入 q 退出
```

运行命令效果如下：

![image-20230612130350943.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be5717a3f7a34f8eb904a9e2b5f53996~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=958&h=439&s=42349&e=png&b=000000)

> 出现以上内容即为注册成功。如果后续想要修改，只需要重新执行一下命令即可

## 文件右侧标记

> 一般使用 VSCode 打开一个包含git仓库的文件夹时，会有这些标记

![image-20220625155941259.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ce5fa18d6454dd9aa64271ab18dc5e8~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=553&h=268&s=15446&e=png&b=252526)

右侧没有标记的时候为 `未修改` 或 此文件/文件夹，被git忽略不跟踪变化

- M： **已修改** （Modified） - 文件已被修改但还没有被添加到暂存区
- A： **已添加** （Added） - 文件已经被添加到暂存区，但还没有被提交
- D： **已删除** （Deleted） - 文件已经被删除，并且已经被标记为删除，但还没有提交
- R： **已重命名** （Renamed） - 文件已经被重命名，这也算作是一种修改，需要被添加到暂存区
- C： **已复制** （Copied） - 文件已经被复制，这也算作是一种修改，需要被添加到暂存区
- U： **已更新但未融合** （Updated but Unmerged） - 这表示一个文件已经被更新了，但在合并时发生了冲突，需要手动解决冲突后再标记为已解决

## Git基础命令

### 初始化空的Git仓库

新建一个文件夹或现有的文件夹并不是 git 仓库，因为文件夹内不包含 .git 文件夹，没有被 git 管理

可以在新文件夹或现有文件夹，运行如下命令得到 .git 文件夹，初始化成功则可让 git 开始准备管理

```bash
# 初始化 git 仓库, 产物: .git 文件夹 (所在文件夹"内"被管理)
git init

```

例如，在新文件夹中输入git init命令用于初始化空的git版本库

![image-20230612141325305.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f600ec0c2aaa47fcb20bfbda4d3786db~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=975&h=136&s=15077&e=png&b=000000)

初始化空的 git 仓库成功后，在项目文件夹中，开启显示隐藏文件，即可查看 .git 文件夹

- 对于 Windows 系统，在查看里面勾选隐藏的项目选项
- 对于 macOS 系统，使用快捷键 `Command + Shift + .`切换隐藏文件显示

### 记录更新到Git仓库

每当完成了一个阶段的目标，想要记录下它时，就将它提交到仓库

核心操作：`工作区开发`--->`将修改后的文件添加到暂存区`--->`将暂存区的文件记录到版本库`

- 把工作区变化放到暂存区中，执行如下命令

```bash
# 将 index.html 添加到暂存区
git add index.html

# 将css目录下一切添加到暂存区
git add css
```

- 如下命令，可以一次性把所有变化文件放入暂存区

```bash
git add .
```

- 把暂存区内容，提交到版本库，命令如下（此处文字说明可以不加引号）

```bash
git commit -m '提交的内容说明'

```

过程图示：

![image-20230612154411204-1687173588607.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae33cb79a42d49b7959adfe1d01bf132~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1256&h=621&s=112102&e=png&b=fdfcfc)

> 以上命令相当于存档了一次，在版本库中产生一次提交记录并生成版本号
>
> 本次存档，不耽误我们在工作区 (项目文件夹) 下继续编写项目

### Git日志及状态查看

- 查看所有提交的日志记录，命令如下

```bash
git log
```

运行命令效果如下：

![image-20230612212059053.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12a32701f95f47b68743f9616783a63d~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=846&h=308&s=32544&e=png&b=000000)

- 当我们的日志越来越多，可能想要简化查看，可以输入如下命令

> `--oneline`：在一行显示简略信息

```bash
git log --oneline
```

运行命令效果如下：

![image-20230612212137406.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99219baf1c1349db8e6761df62fd9dd1~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=728&h=105&s=15476&e=png&b=000000)

- 如果改的代码过多，忘记改过哪些了，可以运行如下命令来查看 git 仓库变化，只能看未提交的所有变更的文件状态

```bash
git status
```

运行命令效果如下：

![image-20230612212456778.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7466cc34e76c4f9e837a2a1bbce3d857~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=875&h=305&s=30542&e=png&b=000000)

- 暂存并再次提交，产生一次版本记录

```bash
git status

```

过程图示：

![image-20230612154411204.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/02257e8b46404c0980b8ac68fe07f4b2~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1256&h=621&s=121037&e=png&b=fdfcfc)

### Git版本回退

时光机，回到过去~

- 回退命令语法如下

```bash
git reset --hard 版本号
```

- 查看版本号（每次的版本号随机生成）

```bash
git log --oneline
```

![image-20230612212700778.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/935df632f35f4e5396627b114e5607e6~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=723&h=140&s=21033&e=png&b=000000)

- 尝试回退到 `477321b` 这次记录上

```bash
git reset --hard 477321b
```

- 观察工作区，回退成功

![image-20230612212808682.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/28101f170cdd4821a446fd1bcdc739a1~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=722&h=187&s=28346&e=png&b=000000)

- 如果想要在回到最近一次提交的记录，但发现 `git log`看不到未来的记录了，问题不大。**输入git reflog命令，可以查看 git 所有的操作记录，包括你的reset记录**

```bash
git reflog

```

运行命令效果如下：

![image-20230612212857923.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46125c80682e434997028ab35dda4988~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=736&h=156&s=31014&e=png&b=000000)

> 拓展命令：
>
> - git bash（终端）清屏：`clear `
> - git bash（终端）另起一页：`Ctrl + L`

### Git忽略文件

有的时候，我们某些文件或文件夹不想让 git 进行跟踪管理。这时候可以在 .git 文件夹同级目录下新增 `.gitignore`的忽略文件并写入忽略规则（此处的文件名就是 .gitignore ，不是后缀）

项目文件夹结构如下：

![image-20230612213354387.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3742e0da132340899e330a9562a541bd~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=686&h=215&s=20403&e=png&b=ffffff)

```bash
# .gitignore内容：
password.txt

其余用法：
# 忽略文件夹
css
# 忽略文件夹下的某个文件
css/index.js
# 忽略文件夹下某类文件
css/*.js

```

根目录新建 password.txt，查看 git 追踪到了哪些变化

```bash
git status
```

运行命令效果如下：

![image-20230612214049685.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/70d3ce513f4f4ed688b2d2fa0553dfc4~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=943&h=204&s=19819&e=png&b=000000)

> 发现只新增了.gitignore ，符合规则的都被忽略掉了

`.gitignore`文件在项目中可以根据脚手架自动生成，无需自己编写，当然如果你非要写，以下是Vue官方自动生成的 `.gitignore`文件代码，可供复制使用

```bash
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```

## Git分支

### 分支本质

分支其实就是一个叫**HEAD**的指针标记，每次代码提交，此**HEAD**指针都会往后移动一次，保证指向的 (并且工作区里的) 都是最后一次提交

例如：当我们输入命令：`git reset --hard a3bcab2`，**HEAD**指针会移动，而且**HEAD**移动后，会影响工作区里的代码

### 创建分支

- **创建分支命令如下**

```bash
# 创建分支
git branch 分支名

```

该命令创建分支后不会自动切换分支，我们可以运行命令查看现在这个 .git 版本库里所有分支

- **查看当前版本库所有分支命令如下**

# 查看当前版本库所有分支，绿色带\*代表现在所处的分支

git branch

运行命令效果如下：

![image-20230612215435954.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84fdb5bdfd8e4b8e87498f16c4113c5c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=758&h=176&s=18242&e=png&b=000000)

- **手动切换到分支上**

# 切换分支命令

git checkout 分支名

运行命令效果如下：

![image-20230612215712754.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3bbcf972ef440758d6327e6e142e8b6~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=729&h=226&s=31046&e=png&b=000000)

> 第一次创建并切换到 reg 分支，你会发现 master 分支上的所有代码 (和当前节点所有提交记录) 都被复制了过来
> 了，我们只需要在这个基础上接着往后开发就行

过程图示：

![image-20230612215806700.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/339ad9c27506449baebc1edd5075992a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1244&h=611&s=131989&e=png&b=fdfdfd)

### 分支下开发流程

我们现在就可以在当前 reg 分支下来编写注册页面的逻辑代码，例如新建 `reg.html`文件，并随便写点内容。随后暂存并提交一次，这次提交的记录会出现在这里，如图

![image-20220626005643763.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5b7ae62526b448d85035bf0501ed3da~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1262&h=586&s=124210&e=png&b=fcfbfb)

以后在当前 reg 分支下开发，就会在 reg 范围内，每次提交产生一次版本记录，不会影响到别的分支

### 分支合并

我们可以把分支里写好的代码，合并到主分支或其他分支上，步骤如下：

- 首先，切换到你要合并到的目标分支上（以master主分支为例）

# 切换分支

git checkout master

切换分支后，**HEAD**指针位置如下：

![image-20230612220823875.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/506743c99da84c3c8298456406b2168a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1254&h=587&s=162561&e=png&b=fdfdfd)

**合并命令语法**

git branch -d 分支名

这里我们执行命令 `git merge reg`，执行后效果如图：

![image-20220626011937230.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/422e99c4f9b64b33aa740218922357a8~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1266&h=606&s=125759&e=png&b=fcfcfc)

可见，reg 代码提交记录已经复制到了 master (主分支) 中

### 分支删除

假如注册功能开发完毕，代码已经合并到 master 分支上，我们已经不需要 reg 分支

- **命令如下**

```bash
git branch -d 分支名

```

如果分支的修改没有被合并到其他分支上，Git 会提示一个类似以下的错误信息：

`error: The branch 'branch_name' is not fully merged. If you are sure you want to delete it, run 'git branch -D branch_name'.`

在这种情况下，Git 建议你确认是否要删除这个分支。如果你确定要删除该分支并且不在乎丢失该分支的修改，你可以使用 `git branch -D <branch_name>`命令来**强制删除**该分支。但请注意，这样会丢失掉分支上的未合并修改

### 分支合并时的冲突问题

在两个分支修改了同一个文件并提交过，在合并的时候，就会产生冲突

这里模拟一次简单的冲突：

- 在 master 分支下，修改 `login.html`的某行代码，并完成一次暂存提交

![image-20230612221800522.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61534650ad8549e185e72f3561c0016a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=740&h=284&s=37177&e=png&b=000000)

- 切换到 reg 分支下，也修改 `login.html`的对应行代码，并完成一次暂存提交

![image-20230612222009473.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ee908999ca34052ac74183a2d150457~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=706&h=280&s=36067&e=png&b=000000)

- 再切换回到 master 分支下，用合并命令，把 reg 分支下代码和变化合并过来，**不出意外就会出现冲突了**

![image-20230612222117265.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f8ffb16b9fa4d14b8bd3946a3dade34~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=833&h=299&s=35038&e=png&b=000000)

发生冲突后，VSCode界面

![image-20230612222156560.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b1b2a0253da4e17adab3d8d61348ddf~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=617&h=206&s=33508&e=png&b=23272e)

> 此时我们要进行抉择： **采用当前更改** 、 **采用传入更改** 、**全部保留**

选择保留方式后，需要再次暂存提交一次

![image-20230612222444912.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ac609157d4741e39e207d982cca49b6~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=800&h=234&s=33073&e=png&b=000000)

> 此时结束冲突状态，变回正常状态

- 打印冲突合并后的日志记录

![image-20230612222705106.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c097571c37e48eba8da302f47441a7c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=793&h=661&s=71158&e=png&b=000000)

> 总结：当我们合并遇到冲突了，应手动解决，然后暂存，提交一次即可

## Git分支流程图详解（拓展）

- **HEAD**头指针，它指向当前所在的分支或者某个具体的提交记录。每次提交会产生新的记录**master**和**HEAD**会后移

![image-20230612224348269.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9639818947c94faf980d326508c8ea21~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=700&h=391&s=50853&e=png&b=fcfcfc)

- 以当前节点为基准创建新的分支 (包含之前的所有提交记录)，`git branch reg` 就会在当前的提交记录上创建一个新的指针，名称为**reg**

![image-20230612224959233.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7612d4bbdc83415e83ac8a94048dd86f~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=684&h=448&s=47340&e=png&b=fdfdfd)

- `git checkout reg`切换的是**HEAD**指针指向 (切换分支)

![image-20230612225147670.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9595baac5fc4c7a843ebcced8cde384~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=673&h=466&s=39148&e=png&b=fdfdfd)

- 注册页面新建后，`git add .`添加到暂存区，`git commit -m` 产生了一次提交记录

![image-20230612225547703.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e702e79fc14a4fd79a863c63fa4db5cc~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=822&h=534&s=50289&e=png&b=fdfdfd)

- 注册页面的样式新建后暂存提交，产生了一次提交记录

![image-20230613003559070.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3187bb9e91d49099b65d326c9069dfa~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=968&h=485&s=47899&e=png&b=fdfdfd)

- 合并分支，例如把 A 合并到 B上

  - `git checkout B`，切换到目标分支 B
  - `git merge A`，把 A 分支记录合并到所在 B 分支下

  先切换到主分支 `git checkout master`

![image-20230613004008281.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/26efb48153c94dd894888bf37bf68d0a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=951&h=558&s=47458&e=png&b=fdfdfd)

- 合并**reg**分支 `git merge reg`

![image-20230613004234355.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c8ba272cd55497183236fdb8320c507~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=870&h=563&s=52972&e=png&b=fdfdfd)

- 在**reg**分支下，修改了 `index.html`文件，并暂存提交，产生了记录

![image-20230613004635286.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6cbd349513b4f758edf55ab7c2fa47e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=939&h=507&s=56307&e=png&b=fdfdfd)

- 切换到**master**分支，并修改 `index.html`文件(同一个文件)，暂存提交，产生了记录

![image-20230613010644386.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d596cdad0d7340f3ab2a1b64c9f5e545~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=948&h=618&s=70461&e=png&b=fcfcfc)

- 在**master**分支中，想要把**reg**合并过来。由于修改了同一个文件，会报错，需要解决冲突

![image-20230613010950109.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17f70c3240d346e59c00847f768f7e19~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1083&h=466&s=60751&e=png&b=fdfdfd)

- 手动解决冲突后，会产生一个新的提交记录

![image-20230613011347885.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8797be1e0abe479d9a7a73a81806ab1a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1275&h=460&s=62962&e=png&b=fdfdfd)

- 删除**reg**分支，全部过程结束

![image-20230613011445775.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb459f69afc4465c9c7fdb5b18ce9c7f~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1303&h=378&s=54548&e=png&b=fdfdfd)

## Git远程仓库

### 介绍

远程仓库是指托管在因特网或其他网络上的 Git 仓库，可以存储我们版本库的所有记录和存档记录

远程仓库在团队协作中发挥着重要的作用。它不仅可以充当备份存储，保护你的代码免受数据丢失的风险，还可以让团队成员之间轻松地共享代码、查看代码变更、进行代码审查等

![image-20230615093344985.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/13a4c887c55546daafb77886906c97fd~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1251&h=499&s=155129&e=png&b=feefea)

主流的远程仓库有 GitHub (gay hub)全球最大的同行交友社区，以及服务器在国内的 gitee（码云）。由于 GitHub 服务器在国外，需要科学上网或者使用其他加速工具，方便起见，这里以码云为例，供初学者参考，GitHub 流程与 gitee 类似

### 注册

注册登录 gitee.com 网站以后，添加主邮箱为自己本地 git 仓库设置的邮箱，注意一定要相同，否则无法正确提交

如果忘记了本地设置的邮箱地址：

- 可以打开控制台输入 `git config --list` 重新查看邮箱地址
- 当然也可以使用 `git config --global user.email 你的邮箱地址`重新覆盖原来的邮箱地址

**邮箱设置界面不要勾选不公开我的邮箱地址，否则也无法正常提交**

![image-20230615094323926.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b12fe36771343d9b420251a0238b33a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1221&h=748&s=90210&e=png&b=ffffff)

### 仓库新建

可以选择创建一个远程仓库的项目 (可以多个)，创建界面如下

![image-20230615095044748.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/432b12e869a649f9822330c8e94a0c74~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1152&h=859&s=74998&e=png&b=ffffff)

勾选完成后选择创建，创建后, 会得到一个远程仓库的地址链接, 一般是以 `.git`结尾的地址

地址分为两种最常用的两种传输协议：

- HTTPS协议：需要输入用户名和密码 `https://gitee.com/(userName)/(repositoryName).gitssh`
- SSH协议：需要配置密钥，可免密码登录 `git@gitee.com:userName/repositoryName.git`

选择SSH路径，界面如下

![image-20230615095628604.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d5b124240c3f4aa6a5277f0681a36569~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1509&h=871&s=78185&e=png&b=ffffff)

### SSH配置

我们可以在本机一次性配置 SSH 以后免密登录，SSH 密钥组成和作用如下：

- 作用：实现本地仓库和 gitee 平台之间免登录的加密数据传输
- 组成：`id_rsa` (私钥文件，存放于客户端的电脑中即可)、`id_rsa.pub` (公钥文件，需要配置到 gitee 平台中)

> 私钥加密的信息，只能通过公钥解密。公钥加密的信息，只能通过私钥解密。安全性高！

SSH 密钥创建与使用步骤：

- 先在本机生成一个密钥 (以后也可以重新生成、重新配置)，打开一个终端，输入以下命令：

  ```bash
  ssh-keygen -t rsa -C "你注册账号的邮箱"
  ```

- 连续敲击 3 次回车，即可在 `C:\Users\用户名文件夹.ssh`目录中生成 `id_rsa`和 `id_rsa.pub`两个文件
- 使用 VSCode 打开 `id_rsa.pub`文件，复制里面的文本内容
- 粘贴配置到 码云 -> 设置 -> ssh 公钥 中即可
- 如果为 mac ，可进入以下教程查看：[mac获取公钥](https://juejin.cn/post/6844904169191522317 "https://juejin.cn/post/6844904169191522317")

### 初始化空仓库

先给本地仓库配置个远程仓库的地址, 建立仓库之间的链接

由于每次 push 操作都需要带上远程仓库的地址，十分麻烦，我们可以给仓库设置一个别名

```bash
# 给远程仓库设置一个别名
git remote add 仓库别名 仓库地址
git remote add origin git@gitee.com:(username)/repository.git

# 删除 origin 这个别名
git remote remove origin

# 使用 -u 记录 push 到远端分支的默认值，将来直接 git push 即可
git push -u 仓库别名 分支名


```

![image-20230615101817727.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/286cb8c8f7014178a0f9d661d72b1b86~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1046&h=500&s=52493&e=png&b=ffffff)

下面为实际操作举例：

- 随便新建一个项目文件夹，初始化 git，随后在项目文件中随便填充点内容，这里我新增一个 `.gitignore`文件，随后暂存提交到本地 git 库

  ![image-20230615103357225.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4ed212afea8340b1b0bb8416e4da2cfc~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1095&h=399&s=53082&e=png&b=000000)

- 输入以下命令：

  ```bash
  # 注意：这里的existing_git_repo是你的项目根路径
  # 如果你是在项目文件夹开启的终端，忽略此行
  cd existing_git_repo

  # 添加远程仓库关联，仓库别名origin，可以随意更改，后接ssh地址
  # 此处的ssh是自动生成的，可以去gitee空仓库的代码页直接复制即可
  git remote add origin git@gitee.com:li-houyi/test-factory.git

  # 第一次推送到远程时需要指定具体的分支，因为远程仓库并没有这个分支
  # 使用 -u 记录 push 到远端分支的默认值，将来直接 git push 即可
  git push -u origin "master"

  ```

- 出现此页面即为成功：

  ![image-20230615104040319.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b79a2854794940cd8b865dbf3ec742e4~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=799&h=322&s=41134&e=png&b=000000)

  > 注意：推送的本地仓库一定要非空并且本地暂存提交过，不然会报错！这点也很好理解，你传个空的项目到一个空仓库，这可不得给你报错吗

- 推送成功后重新进入 gitee 仓库页面查看是否正确推送

  ![image-20230615105531979.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e41eac290dc4f149a74464f41c0db49~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1167&h=399&s=43890&e=png&b=fcfcfc)

空仓库创建成功后可以在管理页面将仓库开源，当然也可以不设置开源（默认私有）

### 克隆项目

如果你想要从远程仓库克隆一份项目代码到本地进行开发，可以使用 `git clone` 命令

```bash
git clone [options] <repository-url> [directory]
# directory（可选）克隆后的本地仓库所处的目录名称（默认创建与远程仓库名字相同的目录）

```

**常见选项：**

- `-b <branch>` 或 `--branch <branch>`：指定要克隆的远程仓库的特定分支，它不会影响克隆操作所获取的分支数量，而只是指定了默认要检出的分支（不指定则默认克隆远程仓库的主分支）
- `--depth <depth>`：指定克隆的深度，即只克隆指定数量的提交历史
- `--single-branch`：仅克隆指定分支以及该分支上的历史记录，不下载其他分支
- `--recurse-submodules`：初始化并克隆子模块的内容
- `-n` 或 `--no-checkout`：克隆后不立即检出任何分支，保留 HEAD 指向原始仓库的默认分支
- `-o <name>` 或 `--origin <name>`：自定义远程仓库的别名。
- `-u <remote> <branch>` 或 `--set-upstream-to=<remote>/<branch>`：设置追踪关系，使得本地分支自动与指定的远程分支关联

如果项目只有一个分支，那么以上代码执行完毕就已经克隆结束了（git clone 默认拉取 master 分支），**不过实际开发中，并非只有一个分支，于是我们还需执行以下步骤：**

- 在本地建分支，分支名与远程分支名相同，查看远程分支名使用 `git branch -r`

```bash
git checkout -b 对应远程分支名
```

- 拉取远程分支 ( **不要在 master 分支直接拉取对应分支的代码，切换到新建的分支** )

```bash
# 每次拉取都需要指定远程仓库名和分支名
git pull 远程仓库名 分支名

```

- 以上两行命令可以合并写做一行（创建并拉取远程分支代码）

```bash
git checkout -b 分支名 origin/分支名

```

- 拓展: 设置 git pull 默认拉取的分支（设置本地分支与远程分支相关联）

```bash
git branch --set-upstream-to=origin/远程分支名 本地分支名

```

### Git远程仓库流程回顾

- Step1：

![image-20230616072225869.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f4681eae7324e7289273c0dfafcce42~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1293&h=742&s=106266&e=png&b=ffffff)

- Step2：

![image-20230616072307518.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2cab60b7a65848359254d6a7f324d211~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1269&h=734&s=138485&e=png&b=ffffff)

- Step3：

![image-20230616072523621.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c08d5b4d515d4443b12c0ad5c16e922c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1410&h=781&s=214562&e=png&b=fefefe)

- Step4：

![image-20230616072547086.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b68c1379c384c38adea3aeddb42a8da~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1279&h=715&s=86253&e=png&b=ffffff)

# Git常用命令总览

> 本命令**默认远程仓库名**为 `origin`、**默认远程仓库主分支名**为 `master`、`<>`为必填项，`[]`为可选项

![git.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e98276c847f4cc6a24482d08394cd3a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2455&h=4096&s=945536&e=png&b=fef7f6)
