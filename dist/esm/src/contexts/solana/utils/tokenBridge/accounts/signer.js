import { deriveAddress } from '../../utils';
export function deriveAuthoritySignerKey(tokenBridgeProgramId) {
    return deriveAddress([Buffer.from('authority_signer')], tokenBridgeProgramId);
}
export function deriveCustodySignerKey(tokenBridgeProgramId) {
    return deriveAddress([Buffer.from('custody_signer')], tokenBridgeProgramId);
}
export function deriveMintAuthorityKey(tokenBridgeProgramId) {
    return deriveAddress([Buffer.from('mint_signer')], tokenBridgeProgramId);
}
//# sourceMappingURL=signer.js.map