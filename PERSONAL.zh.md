# Better Codex 个人维护版

仓库：https://github.com/chengzhiyi/better-codex/tree/personal/navigation-fix

当前维护分支：`personal/navigation-fix`。基于上游 `v0.4.18`（`21979387242fa20454dc87cdb45f9982199afd6e`），保留 Apache-2.0 许可证和上游历史。

## 已修复的问题

Codex Desktop 26.928.31416 的 Home 按钮被包在横向容器里。上游把任务看板、智能体、项目管理三个入口插进这个容器，导致左侧导航栏从 52px 撑到 160px。

本分支沿原生按钮的祖先找到纵向导航列表，再插入入口。使用原生按钮样式，不改 Codex 的 CSS 或应用文件。已在实际桌面窗口验证三个入口纵向排列，导航栏恢复到 52px。

回归测试覆盖有、无原生恢复入口两种结构，以及面板切换、刷新去重和卸载恢复。验证结果：`npm run verify` 的 295 项通过、12 项跳过；注入层浏览器测试 10 项通过。

## 安装和使用（macOS）

需要 Node.js 22.5+、npm、Git 和 Codex Desktop。先安装依赖并构建开发实例：

```bash
git clone --branch personal/navigation-fix https://github.com/chengzhiyi/better-codex.git
cd better-codex
git remote add upstream https://github.com/Ericwong5021/better-codex.git
npm ci
npm run dev:install
node scripts/personal-codex.mjs launcher install
node scripts/personal-codex.mjs mcp install
```

之后打开 `/Applications/Better Codex Dev.app`。个人版命令统一用 `node scripts/personal-codex.mjs <命令>`；包装入口会固定 development profile，避免 MCP 子进程误用稳定版的数据目录。

已有 Codex 窗口且 CDP 已开启时，可以直接切换，无需重启窗口：

```bash
better-codex disable
node scripts/personal-codex.mjs enable
node scripts/personal-codex.mjs doctor
```

个人版数据在 `~/.better-codex-dev`，稳定版数据在 `~/.better-codex`。首次开发实例启动会复制稳定版数据库快照，之后两份数据独立，不自动同步。不要移动或删除源码目录：启动器和 MCP 都引用这里的源码构建。

`doctor` 中的 `development_runtime_unmanaged` 表示开发实例不注册系统后台服务；运行状态、页面注入和 MCP 配置应正常。

## 修改、验证和更新

```bash
npm run verify
npm run build
npx playwright install chromium
npm run test:web -- test/e2e/injected
node scripts/personal-codex.mjs refresh-injection
```

源码构建不使用上游核心二进制自动更新。继续修复本分支即可；需要吸收上游更新时，先 `git fetch upstream`，选择并合并已验证的版本，再运行以上检查和构建。上游兼容层仍可能更新，应在 Codex 升级后重新验证导航布局。

上游 README 中的安装脚本安装的是上游发行版。安装本分支使用上面的源码流程。

## 回到稳定版

```bash
node scripts/personal-codex.mjs disable
better-codex mcp install
better-codex enable
```

也可以打开 `/Applications/Better Codex.app`。上述切换保留双方数据库。
