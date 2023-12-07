import { deriveAddress } from '../../utils';
export function deriveSenderConfigAddress(programId) {
    return deriveAddress([Buffer.from('sender')], programId);
}
//# sourceMappingURL=senderConfig.js.map