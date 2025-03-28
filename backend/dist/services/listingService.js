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
exports.deleteListing = exports.updateListing = exports.createListing = exports.getListingById = exports.getSellerListings = exports.getAllListings = void 0;
const Listing_1 = __importDefault(require("../models/Listing"));
// Get all listings
const getAllListings = () => __awaiter(void 0, void 0, void 0, function* () {
    const listings = yield Listing_1.default.find().sort({ createdAt: -1 }).lean(); // Use .lean() to return plain JavaScript objects
    return listings; // Explicitly cast to IListing[]
});
exports.getAllListings = getAllListings;
// Get seller-specific listings
const getSellerListings = (sellerId) => __awaiter(void 0, void 0, void 0, function* () {
    const listings = yield Listing_1.default.find({ sellerId }).sort({ createdAt: -1 }).lean();
    return listings;
});
exports.getSellerListings = getSellerListings;
// Get listing by ID
const getListingById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const listing = yield Listing_1.default.findById(id).populate('seller', 'firstName lastName email').lean(); // Use .lean()
    return listing; // Explicitly cast to IListing or null
});
exports.getListingById = getListingById;
// Create listing
const createListing = (listingData) => __awaiter(void 0, void 0, void 0, function* () {
    const listing = yield Listing_1.default.create(listingData);
    return listing.toObject(); // Use .toObject() and explicitly cast to IListing
});
exports.createListing = createListing;
// Update listing
const updateListing = (id, listingData, sellerId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingListing = yield Listing_1.default.findOne({ _id: id, sellerId });
    if (!existingListing) {
        throw new Error('Listing not found or unauthorized');
    }
    const updatedListing = yield Listing_1.default.findByIdAndUpdate(id, listingData, {
        new: true,
        runValidators: true,
    })
        .populate('seller', 'firstName lastName email')
        .lean(); // Use .lean()
    if (!updatedListing) {
        throw new Error('Listing not found');
    }
    return updatedListing; // Explicitly cast to IListing
});
exports.updateListing = updateListing;
// Delete listing
const deleteListing = (id, sellerId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingListing = yield Listing_1.default.findOne({ _id: id, sellerId });
    if (!existingListing) {
        throw new Error('Listing not found or unauthorized');
    }
    yield Listing_1.default.findByIdAndDelete(id);
});
exports.deleteListing = deleteListing;
