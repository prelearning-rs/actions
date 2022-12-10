import * as core from "@actions/core"
import { rustupInstall } from "./rustup"
import { parseToolchainArgs } from "./setup-rust.args"

const run = async () => {
    const toolchainArgs = parseToolchainArgs()

    const rustup = await rustupInstall()

    await rustup.installToolchain(toolchainArgs)
    await rustup.use(toolchainArgs.toolchain)
}

try {
    run()
} catch (error) {
    if (error instanceof Error) {
        core.setFailed(error.message)
    }
}
