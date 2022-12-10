import * as exec from "@actions/exec"

export class Cargo {
    constructor(private cargoPath: string, private toolchain: string | undefined = undefined) {}

    withToolchain(toolchain?: string): Cargo {
        return new Cargo(this.cargoPath, toolchain)
    }

    async install(binary: string): Promise<number> {
        return await this.run(["install", binary])
    }

    async run(args: string[], options?: exec.ExecOptions): Promise<number> {
        const execArgs = args.slice()

        if (this.toolchain) {
            execArgs.unshift(`+${this.toolchain}`)
        }

        return exec.exec(this.cargoPath, execArgs, options)
    }
}
