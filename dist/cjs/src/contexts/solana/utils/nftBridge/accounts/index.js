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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndpointRegistration = exports.deriveUpgradeAuthorityKey = exports.deriveMintAuthorityKey = exports.deriveEndpointKey = exports.deriveCustodySignerKey = exports.deriveCustodyKey = exports.deriveAuthoritySignerKey = exports.EndpointRegistration = void 0;
__exportStar(require("./config"), exports);
__exportStar(require("./wrapped"), exports);
var tokenBridge_1 = require("../../tokenBridge");
Object.defineProperty(exports, "EndpointRegistration", { enumerable: true, get: function () { return tokenBridge_1.EndpointRegistration; } });
Object.defineProperty(exports, "deriveAuthoritySignerKey", { enumerable: true, get: function () { return tokenBridge_1.deriveAuthoritySignerKey; } });
Object.defineProperty(exports, "deriveCustodyKey", { enumerable: true, get: function () { return tokenBridge_1.deriveCustodyKey; } });
Object.defineProperty(exports, "deriveCustodySignerKey", { enumerable: true, get: function () { return tokenBridge_1.deriveCustodySignerKey; } });
Object.defineProperty(exports, "deriveEndpointKey", { enumerable: true, get: function () { return tokenBridge_1.deriveEndpointKey; } });
Object.defineProperty(exports, "deriveMintAuthorityKey", { enumerable: true, get: function () { return tokenBridge_1.deriveMintAuthorityKey; } });
Object.defineProperty(exports, "deriveUpgradeAuthorityKey", { enumerable: true, get: function () { return tokenBridge_1.deriveUpgradeAuthorityKey; } });
Object.defineProperty(exports, "getEndpointRegistration", { enumerable: true, get: function () { return tokenBridge_1.getEndpointRegistration; } });
//# sourceMappingURL=index.js.map