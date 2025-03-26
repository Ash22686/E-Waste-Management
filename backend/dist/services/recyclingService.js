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
exports.getRecyclingCenterById = exports.getNearbyRecyclingCenters = exports.getAllRecyclingCenters = void 0;
const RecyclingCenter_1 = __importDefault(require("../models/RecyclingCenter"));
// Get all recycling centers
const getAllRecyclingCenters = () => __awaiter(void 0, void 0, void 0, function* () {
    const recyclingCenters = yield RecyclingCenter_1.default.find().sort({ createdAt: -1 });
    return recyclingCenters.map(center => ({
        _id: center._id,
        name: center.name,
        address: center.address,
        phone: center.phone,
        hours: center.hours,
        location: center.location,
        createdAt: center.createdAt,
        updatedAt: center.updatedAt,
        acceptedItems: center.acceptedItems,
    }));
});
exports.getAllRecyclingCenters = getAllRecyclingCenters;
// Get nearby recycling centers
const getNearbyRecyclingCenters = (lat, lng) => __awaiter(void 0, void 0, void 0, function* () {
    const recyclingCenters = yield RecyclingCenter_1.default.find({
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [lng, lat],
                },
                $maxDistance: 10000, // 10 km radius
            },
        },
    });
    return recyclingCenters;
});
exports.getNearbyRecyclingCenters = getNearbyRecyclingCenters;
// Get recycling center by ID
const getRecyclingCenterById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const recyclingCenter = yield RecyclingCenter_1.default.findById(id);
    return recyclingCenter;
});
exports.getRecyclingCenterById = getRecyclingCenterById;
