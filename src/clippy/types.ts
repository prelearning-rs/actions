export type Message = CompilerMessage

export type CompilerMessage = {
    reason: "compiler-message"
    message: Diagnostic
}

export type Diagnostic = {
    message: string
    code: DiagnosticCode | undefined
    level: DiagnosticLevel
    spans: DiagnosticSpan[]
    children: Diagnostic[]
    rendered: string | undefined
}

export type DiagnosticCode = {
    code: string
    explanation: string | undefined
}

export type DiagnosticSpan = {
    file_name: string
    byte_start: number
    byte_end: number
    line_start: number
    line_end: number
    column_start: number
    column_end: number
    is_primary: boolean
    label: string | undefined
}

export enum DiagnosticLevel {
    Error = "error",
    Warning = "warning",
    Note = "note",
    Help = "help",
}

export const verifyMessage = (obj: unknown): obj is Message => {
    return typeof obj === "object" && obj !== null && "reason" in obj
}
