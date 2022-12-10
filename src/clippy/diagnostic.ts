import { AnnotationProperties, error, warning } from "@actions/core"
import { Diagnostic, DiagnosticLevel, verifyMessage } from "./types"

export const consumeClippyMessage = (line: string) => {
    const message = JSON.parse(line)

    if (!verifyMessage(message)) {
        warning(`Unknown cargo message: ${line}`)
        return
    }

    if (message.reason !== "compiler-message") {
        return
    }

    consumeClippyDiagnostic(message.message)
}

const consumeClippyDiagnostic = (diagnostic: Diagnostic) => {
    if (!diagnostic.code || diagnostic.spans.length === 0) {
        return
    }

    const span = diagnostic.spans[0]
    const data = {
        title: diagnostic.message,
        file: span.file_name,
        startLine: span.line_start,
        endLine: span.line_end,
        startColumn: span.column_start,
        endColumn: span.column_end,
    } as AnnotationProperties

    switch (diagnostic.level) {
        case DiagnosticLevel.Error:
            error(diagnostic.rendered || diagnostic.message, data)
            return
        case DiagnosticLevel.Warning:
            warning(diagnostic.rendered || diagnostic.message, data)
            return
        default: {
            const message = `Unknown diagnostic level: ${diagnostic.level}`

            error(message)
            throw new Error(message)
        }
    }
}
