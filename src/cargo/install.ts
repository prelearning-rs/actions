import * as core from "@actions/core"
import * as io from "@actions/io"
import { Cargo } from "./cargo"

export const cargoInstall = async (toolchain: string | undefined): Promise<Cargo> => {
    try {
        const cargoPath = await io.which("cargo", true)

        return new Cargo(cargoPath, toolchain)
    } catch (e) {
        core.error(`Cargo not found`)
        core.error(`Install a toolchain with https://github.com/prelearning-rs/actions/setup-rust`)

        throw e
    }
}
