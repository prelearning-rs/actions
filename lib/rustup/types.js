"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseToolchainProfile = exports.ToolchainProfile = void 0;
var ToolchainProfile;
(function (ToolchainProfile) {
    ToolchainProfile["MINIMAL"] = "minimal";
    ToolchainProfile["DEFAULT"] = "default";
})(ToolchainProfile = exports.ToolchainProfile || (exports.ToolchainProfile = {}));
const parseToolchainProfile = (profile) => {
    switch (profile) {
        case ToolchainProfile.DEFAULT:
            return ToolchainProfile.DEFAULT;
        case ToolchainProfile.MINIMAL:
            return ToolchainProfile.MINIMAL;
    }
    throw new Error(`Unknown toolchain profile '${profile}'`);
};
exports.parseToolchainProfile = parseToolchainProfile;
