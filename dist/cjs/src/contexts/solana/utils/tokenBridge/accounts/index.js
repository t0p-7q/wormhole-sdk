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
exports.deriveUpgradeAuthorityKey = void 0;
__exportStar(require("./config"), exports);
__exportStar(require("./custody"), exports);
__exportStar(require("./endpoint"), exports);
__exportStar(require("./transferWithPayload"), exports);
__exportStar(require("./signer"), exports);
__exportStar(require("./wrapped"), exports);
var wormhole_1 = require("../../wormhole");
Object.defineProperty(exports, "deriveUpgradeAuthorityKey", { enumerable: true, get: function () { return wormhole_1.deriveUpgradeAuthorityKey; } });
//# sourceMappingURL=index.js.map