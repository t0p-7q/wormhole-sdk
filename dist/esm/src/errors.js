export function NoProviderError(chain) {
    return `Missing provider for domain: ${chain}.\nHint: Have you called \`context.registerProvider(${chain}, provider)\` yet?`;
}
//# sourceMappingURL=errors.js.map