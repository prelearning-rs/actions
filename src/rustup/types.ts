export enum ToolchainProfile {
    MINIMAL = "minimal",
    DEFAULT = "default",
}

export const parseToolchainProfile = (profile: string): ToolchainProfile => {
    switch (profile) {
        case ToolchainProfile.DEFAULT:
            return ToolchainProfile.DEFAULT
        case ToolchainProfile.MINIMAL:
            return ToolchainProfile.MINIMAL
    }

    throw new Error(`Unknown toolchain profile '${profile}'`)
}
