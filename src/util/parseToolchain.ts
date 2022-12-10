/**
 * Returns a clean toolchain name without a leading + if one was provided.
 */
export const parseToolchain = (toolchain?: string): string | undefined => {
    if (!toolchain) {
        return undefined
    }

    if (toolchain.startsWith("+")) {
        return toolchain.slice(1)
    }

    return toolchain
}
