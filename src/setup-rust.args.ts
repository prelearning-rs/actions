import * as core from "@actions/core"
import { parseToolchainProfile, ToolchainProfile } from "./rustup/types"

export type ToolchainArgs = {
    toolchain: string
    profile: ToolchainProfile
    components: string[]
}

export const parseToolchainArgs = (): ToolchainArgs => {
    const toolchain = core.getInput("toolchain")
    const profile = parseToolchainProfile(core.getInput("profile"))
    const components = core
        .getInput("components")
        ?.split(",")
        .map((it) => it.trim())
        .filter(Boolean)

    if (!toolchain) {
        throw new Error("No toolchain provided")
    }

    return {
        toolchain,
        profile,
        components,
    }
}
