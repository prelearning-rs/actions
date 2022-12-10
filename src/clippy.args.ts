import { getInput } from "@actions/core"
import { split } from "shlex"

import { parseToolchain } from "./util/parseToolchain"

export type ClippyArgs = {
    args: string[]
    toolchain?: string
}

export const parseClippyArgs = (): ClippyArgs => {
    return {
        args: split(getInput("args")),
        toolchain: parseToolchain(getInput("toolchain")),
    }
}
