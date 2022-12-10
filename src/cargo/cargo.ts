import * as exec from "@actions/exec"
import { CargoArgs } from "../cargo-args"

export class Cargo {
    constructor(private cargoPath: string) {}

    async run(args: CargoArgs, options?: exec.ExecOptions): Promise<void> {
        const execArgs = args.toolchain ? [`+${args.toolchain}`, ...args.args] : args.args

        exec.exec(args.command, execArgs, options)
    }
}
