"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rustup = void 0;
const exec = __importStar(require("@actions/exec"));
/**
 * An interface into the rustup toolchain manager.
 *
 *   https://rust-lang.github.io/rustup/index.html
 */
class Rustup {
    rustupPath;
    constructor(rustupPath) {
        this.rustupPath = rustupPath;
    }
    async installToolchain(args) {
        const rustupArgs = ["toolchain", "install", args.toolchain];
        rustupArgs.push(`--profile`, args.profile);
        rustupArgs.push(...args.components.reduce((prev, curr) => [...prev, "--component", curr], []));
        // https://rust-lang.github.io/rustup/installation/index.html#installing-nightly
        if (args.toolchain === "nightly" && args.components.length > 0) {
            rustupArgs.push("--allow-downgrade");
        }
        await exec.exec(this.rustupPath);
    }
}
exports.Rustup = Rustup;
