import { setFailed } from "@actions/core"
import { parseCargoArgs } from "./cargo-args"
import { cargoInstall } from "./cargo/install"

const run = async () => {
    const args = parseCargoArgs()
    const cargo = await cargoInstall(args.toolchain)

    for (const binary of args.binaries) {
        await cargo.install(binary)
    }

    await cargo.run(args.args)
}

try {
    run()
} catch (error) {
    if (error instanceof Error) {
        setFailed(error.message)
    }
}
