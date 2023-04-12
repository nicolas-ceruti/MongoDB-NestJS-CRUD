"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    avatar: String,
});
//# sourceMappingURL=user.schema.js.map