<div align="center">
	<img src="./public/favicon.svg" width="160" />
	<h1>paper management system</h1>
  <span>English | <a href="./README.zh_CN.md">中文</a></span>
</div>
<br />

[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE) ![](https://img.shields.io/github/stars/InChh/paper-management) ![](https://img.shields.io/github/forks/InChh/paper-management)

## Introduction

This project is the frontend web of wf paper management system.The system is for the conventional management of csu wf client paper which contains the basic information of our clients,
our worker can create, delete, update and search the paper information on this system.

> Special Thanks to [SoybeanAdmin](https://docs.soybeanjs.cn/), the project is based on it.

## Usage

**Environment Preparation**

Make sure your environment meets the following requirements:

- **git**: you need git to clone and manage project versions.
- **NodeJS**: >=18.0.0, recommended 18.19.0 or higher.
  > You can use [fnm](https://github.com/Schniz/fnm) to manage your NodeJS version, [installation tutorial](https://juejin.cn/post/7113462239734022158).
- **pnpm**: >= 8.0.0, recommended 8.14.0 or higher.

**Clone Project**

```bash
git clone https://github.com/soybeanjs/soybean-admin.git
```

**Install Dependencies**

```bash
pnpm i
```

> Since this project uses the pnpm monorepo management method, please do not use npm or yarn to install dependencies.

**Start Project**

```bash
pnpm dev
```

**Build Project**

```bash
pnpm build
```

## How to Contribute

We warmly welcome and appreciate all forms of contributions. If you have any ideas or suggestions, please feel free to share them by submitting [pull requests](https://github.com/InChh/paper-management/pulls) or creating GitHub [issue](https://github.com/InChh/paper-management/issues/new).

## Git Commit Guidelines

This project has built-in `commit` command, you can execute `pnpm commit` to generate commit information that conforms to [Conventional Commits](conventionalcommits) specification. When submitting PR, please be sure to use `commit` command to create commit information to ensure the standardization of information.

## Browser Support

It is recommended to use the latest version of Chrome in development for a better experience.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png" alt="IE" width="24px" height="24px"  />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| not support                                                                                                                                                                                                                             | last 2 versions                                                                                                                                                                               | last 2 versions                                                                                                                                                                                       | last 2 versions                                                                                                                                                                                    | last 2 versions                                                                                                                                                                                    |

## License

This project is based on the [MIT © 2021 Soybean](./LICENSE) protocol, for learning purposes only, please retain the author's copyright information for commercial use, the author does not guarantee and is not responsible for the software.
