"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rustupInstall = void 0;
const core_1 = require("@actions/core");
const exec_1 = require("@actions/exec");
const io_1 = require("@actions/io");
const tool_cache_1 = require("@actions/tool-cache");
const os_1 = require("os");
const path_1 = __importDefault(require("path"));
const process_1 = __importDefault(require("process"));
const rustup_1 = require("./rustup");
/**
 * All default GitHub runners come with rustup and a stable toolchain
 * preinstalled. This is a fallback for self-hosted runners and/or
 * enterprise servers.
 *
 *   https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#preinstalled-software
 */
const rustupInstall = async () => {
    try {
        const rustupPath = await (0, io_1.which)("rustup", true);
        return new rustup_1.Rustup(rustupPath);
    }
    catch (e) {
        (0, core_1.info)("Could not find rustup. Installing.");
    }
    switch (process_1.default.platform) {
        case "darwin":
        case "linux":
        case "freebsd":
            await rustupInstallFromUrl(RustupInstallerUrl.UNIX);
            break;
        case "win32":
            // Going to pretend 32 bit does not exist for now. Let's hope
            // we never have to fix that.
            await rustupInstallFromUrl(RustupInstallerUrl.WIN64);
            break;
        default:
            throw new Error(`Unable to install rustup on a '${process_1.default.platform}' platform.`);
    }
    // Binaries are installed to `$HOME/.cargo/bin` (https://rust-lang.github.io/rustup/installation/index.html#installation)
    const cargoBin = path_1.default.join((0, os_1.homedir)(), ".cargo/bin");
    (0, core_1.addPath)(cargoBin);
    return new rustup_1.Rustup(path_1.default.join(cargoBin, "rustup"));
};
exports.rustupInstall = rustupInstall;
/**
 * Rustup installers available from https://rustup.rs
 */
var RustupInstallerUrl;
(function (RustupInstallerUrl) {
    RustupInstallerUrl["UNIX"] = "https://sh.rustup.rs";
    RustupInstallerUrl["WIN64"] = "https://win.rustup.rs/x86_64";
    RustupInstallerUrl["WIN32"] = "https://win.rustup.rs/i686";
})(RustupInstallerUrl || (RustupInstallerUrl = {}));
const rustupInstallFromUrl = async (url) => {
    const rustupPath = await (0, tool_cache_1.downloadTool)(url);
    await (0, exec_1.exec)(rustupPath, ["-y", "--default-toolchain", "none"]);
};
