"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoProviderError = void 0;
function NoProviderError(chain) {
    return `Missing provider for domain: ${chain}.\nHint: Have you called \`context.registerProvider(${chain}, provider)\` yet?`;
}
exports.NoProviderError = NoProviderError;
//# sourceMappingURL=errors.js.map