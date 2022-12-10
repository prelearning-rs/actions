import { addPath, info } from "@actions/core"
import { exec } from "@actions/exec"
import { which } from "@actions/io"
import { downloadTool } from "@actions/tool-cache"
import { homedir } from "os"
import path from "path"
import process from "process"
import { Rustup } from "./rustup"

/**
 * All default GitHub runners come with rustup and a stable toolchain
 * preinstalled. This is a fallback for self-hosted runners and/or
 * enterprise servers.
 *
 *   https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#preinstalled-software
 */
export const rustupInstall = async (): Promise<Rustup> => {
    try {
        const rustupPath = await which("rustup", true)

        return new Rustup(rustupPath)
    } catch (e) {
        info("Could not find rustup. Installing.")
    }

    switch (process.platform) {
        case "darwin":
        case "linux":
        case "freebsd":
            await rustupInstallFromUrl(RustupInstallerUrl.UNIX)
            break
        case "win32":
            // Going to pretend 32 bit does not exist for now. Let's hope
            // we never have to fix that.
            await rustupInstallFromUrl(RustupInstallerUrl.WIN64)
            break
        default:
            throw new Error(`Unable to install rustup on a '${process.platform}' platform.`)
    }

    // Binaries are installed to `$HOME/.cargo/bin` (https://rust-lang.github.io/rustup/installation/index.html#installation)
    const cargoBin = path.join(homedir(), ".cargo/bin")
    addPath(cargoBin)

    return new Rustup(path.join(cargoBin, "rustup"))
}

/**
 * Rustup installers available from https://rustup.rs
 */
enum RustupInstallerUrl {
    UNIX = "https://sh.rustup.rs",
    WIN64 = "https://win.rustup.rs/x86_64",
    WIN32 = "https://win.rustup.rs/i686",
}

const rustupInstallFromUrl = async (url: RustupInstallerUrl) => {
    const rustupPath = await downloadTool(url)

    await exec(rustupPath, ["-y", "--default-toolchain", "none"])
}
