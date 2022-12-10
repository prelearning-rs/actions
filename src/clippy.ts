import * as core from "@actions/core"
import { cargoInstall } from "./cargo/install"

const run = async () => {
    const cargo = await cargoInstall()

    await cargo.run(
        {
            command: "cargo",
            args: ["clippy", "--message-format=json"],
        },
        {
            listeners: {
                stdline: (data: string) => {
                    const json = JSON.parse(data)

                    if (json.reason !== "compiler-message") {
                        return
                    }

                    let method = "notice"
                    switch (json.level) {
                        case "warning":
                            method = "warning"
                            break
                        default:
                            throw new Error(`Unknown level ${json.level}`)
                    }

                    const span = json.spans.first()

                    // core[method]()
                    core[method](json.rendered, {
                        title: json.message,
                        file: span.file_name,
                        startLine: span.line_start,
                        endLine: span.line_end,
                        startColumn: span.column_start,
                        endColumn: span.column_end,
                    })
                },
            },
        },
    )
}

try {
    run()
} catch (error) {
    if (error instanceof Error) {
        core.setFailed(error.message)
    }
}
