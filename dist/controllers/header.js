"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prayerTime = void 0;
const axios_1 = __importDefault(require("axios"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const moment_1 = __importDefault(require("moment"));
const prayerTime = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var currentDate = (0, moment_1.default)();
        const response = yield axios_1.default.get(`https://api.aladhan.com/v1/timingsByAddress/'${currentDate}'?address=Dubai,UAE&method=8&tune=2,3,4,5,2,3,4,5,-3`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = yield response.data;
        console.log(data);
        res.status(200).json({
            success: true,
            response: data.data
        });
    }
    catch (e) {
        console.log(e);
    }
}));
exports.prayerTime = prayerTime;
