import * as core from "@actions/core"
import { split } from "shlex"

export type CargoArgs = {
    command: string
    args: string[]
    toolchain?: string
}

export const parseCargoArgs = (): CargoArgs => {
    const command = core.getInput("command")
    const toolchain = core.getInput("toolchain")

    const args = split(command)
    const firstArg = args.shift()

    if (!firstArg) {
        throw new Error("No command provided")
    }

    return {
        command: firstArg,
        args,
        toolchain,
    }
}
