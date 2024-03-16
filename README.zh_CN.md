<div align="center">
	<img src="./public/favicon.svg" width="160" />
	<h1>网服客户服务单管理系统</h1>
  <span><a href="./README.zh_CN.md">English</a> | 中文</span>
</div>
<br />

## 简介

本项目为网服登单系统的前端网页，队员可以在此系统上创建、删除、更新和搜索客户服务单信息，队长和管家还可以管理队员信息。

> 特别感谢 [SoybeanAdmin](https://docs.soybeanjs.cn/)，本项目在其基础上进行开发。

## 使用

**环境准备**

确保你的环境满足以下要求：

- **git**: 你需要git来克隆和管理项目版本。
- **NodeJS**: >=18.0.0，推荐 18.19.0 或更高。
  > 你可以使用 [fnm](https://github.com/Schniz/fnm) 来管理你的NodeJS版本，[安装教程](https://juejin.cn/post/7113462239734022158)。
- **pnpm**: >= 8.0.0，推荐 8.14.0 或更高。

**克隆项目**

```bash
git clone https://github.com/soybeanjs/soybean-admin.git
```

**安装依赖**

```bash
pnpm i
```

> 由于本项目采用了 pnpm monorepo 的管理方式，因此请不要使用 npm 或 yarn 来安装依赖。

**启动项目**

```bash
pnpm dev
```

**构建项目**

```bash
pnpm build
```

## 如何贡献

我们热烈欢迎并感谢所有形式的贡献。如果您有任何想法或建议，欢迎通过提交 [pull requests](https://github.com/InChh/paper-management/pulls) 或创建 GitHub [issue](https://github.com/InChh/paper-management/issues/new) 来分享。

## Git 提交规范

本项目已内置 `commit` 命令，您可以通过执行 `pnpm commit` 来生成符合 [Conventional Commits](conventionalcommits) 规范的提交信息。在提交PR时，请务必使用 `commit` 命令来创建提交信息，以确保信息的规范性。

## 浏览器支持

推荐使用最新版的 Chrome 浏览器进行开发，以获得更好的体验。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png" alt="IE" width="24px" height="24px"  />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| not support                                                                                                                                                                                                                             | last 2 versions                                                                                                                                                                               | last 2 versions                                                                                                                                                                                       | last 2 versions                                                                                                                                                                                    | last 2 versions                                                                                                                                                                                    |

## 开源协议

项目基于 [MIT © 2021 Soybean](./LICENSE) 协议，仅供学习参考，商业使用请保留作者版权信息，作者不保证也不承担任何软件的使用风险。
