#!/usr/bin/env node
// Keep this source installation in its own profile, including MCP child processes.
import { homedir } from "node:os";
import { join } from "node:path";

process.env.BETTER_CODEX_PROFILE = "development";
process.env.BETTER_CODEX_HOME = process.env.BETTER_CODEX_DEV_HOME || join(homedir(), ".better-codex-dev");
process.env.BETTER_CODEX_PEER_HOME = process.env.BETTER_CODEX_STABLE_HOME || join(homedir(), ".better-codex");
process.env.BETTER_CODEX_DISABLE_DELEGATION = "1";

await import("../dist/cli.js");
