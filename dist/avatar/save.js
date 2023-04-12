"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.save = void 0;
const axios_1 = require("axios");
const crypto = require("crypto");
const fs = require("fs");
async function save(url) {
    const req = await axios_1.default.get(url, { responseType: 'arraybuffer' });
    const avatarHash = `${crypto.randomBytes(16).toString('hex')}.jpg`;
    const avatarPath = `${process.cwd()}/src/avatars/${avatarHash}`;
    fs.writeFileSync(avatarPath, req.data);
    return avatarHash;
}
exports.save = save;
//# sourceMappingURL=save.js.map