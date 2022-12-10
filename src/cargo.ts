import * as core from "@actions/core"
import { parseCargoArgs } from "./cargo-args"
import { cargoInstall } from "./cargo/install"

const run = async () => {
    const cargo = await cargoInstall()
    const cargoArgs = parseCargoArgs()

    await cargo.run(cargoArgs)
}

try {
    run()
} catch (error) {
    if (error instanceof Error) {
        core.setFailed(error.message)
    }
}
