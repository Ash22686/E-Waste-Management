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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelRequest = exports.getBuyerRequests = void 0;
// Use a direct URL or create a config file
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'; // Adjust port as needed
const getBuyerRequests = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_URL}/api/requests/buyer`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch requests');
    }
    const data = yield response.json();
    return data.data;
});
exports.getBuyerRequests = getBuyerRequests;
const cancelRequest = (requestId, token) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_URL}/api/requests/${requestId}/status`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'cancelled' }),
    });
    if (!response.ok) {
        throw new Error('Failed to cancel request');
    }
});
exports.cancelRequest = cancelRequest;
