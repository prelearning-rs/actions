import { getInput } from "@actions/core"
import { split } from "shlex"
import { parseToolchain } from "./util/parseToolchain"

export type CargoArgs = {
    args: string[]
    binaries: string[]
    toolchain?: string
}

export const parseCargoArgs = (): CargoArgs => {
    const binaries = getInput("install")
        .split(",")
        .map((it) => it.trim())
        .filter(Boolean)

    return {
        args: split(getInput("command")),
        binaries,
        toolchain: parseToolchain(getInput("toolchain")),
    }
}
