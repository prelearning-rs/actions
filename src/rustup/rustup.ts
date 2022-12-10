import * as exec from "@actions/exec"

import { ToolchainArgs } from "../setup-rust.args"

/**
 * An interface into the rustup toolchain manager.
 *
 *   https://rust-lang.github.io/rustup/index.html
 */
export class Rustup {
    constructor(private rustupPath: string) {}

    async installToolchain(args: ToolchainArgs) {
        const rustupArgs = ["toolchain", "install", args.toolchain]

        rustupArgs.push(`--profile`, args.profile)
        rustupArgs.push(
            ...args.components.reduce(
                (prev, curr) => [...prev, "--component", curr],
                [] as string[],
            ),
        )

        // https://rust-lang.github.io/rustup/installation/index.html#installing-nightly
        if (args.toolchain === "nightly" && args.components.length > 0) {
            rustupArgs.push("--allow-downgrade")
        }

        await exec.exec(this.rustupPath, rustupArgs)
    }

    async use(toolchain: string) {
        await exec.exec(this.rustupPath, ["default", toolchain])
    }
}
