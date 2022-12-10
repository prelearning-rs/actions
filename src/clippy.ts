import { endGroup, setFailed, startGroup } from "@actions/core"
import { cargoInstall } from "./cargo/install"
import { parseClippyArgs } from "./clippy.args"
import { consumeClippyMessage } from "./clippy/diagnostic"

const run = async () => {
    startGroup("Clippy")

    const args = parseClippyArgs()
    const cargo = await cargoInstall(args.toolchain)

    try {
        const returnCode = await cargo.run(["clippy", "--message-format=json", ...args.args], {
            ignoreReturnCode: true,
            listeners: {
                stdline: consumeClippyMessage,
            },
        })

        if (returnCode !== 0) {
            setFailed(`Clippy failed with return code ${returnCode}`)
        }
    } finally {
        endGroup()
    }
}

try {
    run()
} catch (error) {
    if (error instanceof Error) {
        setFailed(error.message)
    }
}
