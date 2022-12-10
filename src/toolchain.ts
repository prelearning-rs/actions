import * as core from "@actions/core"
import { rustupInstall } from "./rustup"
import { parseToolchainArgs } from "./toolchain.args"

const run = async () => {
    const toolchainArgs = parseToolchainArgs()

    const rustup = await rustupInstall()

    await rustup.installToolchain(toolchainArgs)
}

try {
    run()
} catch (error) {
    if (error instanceof Error) {
        core.setFailed(error.message)
    }
}
