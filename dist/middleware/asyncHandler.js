"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
exports.default = asyncHandler;
