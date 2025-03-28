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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.getFeaturedListings = exports.deleteListing = exports.updateListing = exports.createListing = exports.getSellerListings = exports.getListingById = exports.getAllListings = void 0;
const listingService = __importStar(require("../services/listingService"));
const Listing_1 = __importDefault(require("../models/Listing"));
// Get all listings
const getAllListings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listings = yield listingService.getAllListings();
        res.status(200).json({
            success: true,
            data: listings,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getAllListings = getAllListings;
// Get listing by ID
const getListingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const listing = yield listingService.getListingById(id);
        if (!listing) {
            res.status(404).json({
                success: false,
                message: 'Listing not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: listing,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getListingById = getListingById;
// Get seller-specific listings
const getSellerListings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'Not authenticated',
            });
            return;
        }
        const sellerId = req.user._id.toString(); // Get the seller's ID from the authenticated user
        const listings = yield listingService.getSellerListings(sellerId);
        res.status(200).json({
            success: true,
            data: listings,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getSellerListings = getSellerListings;
// Create listing
const createListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'Not authenticated',
            });
            return;
        }
        const sellerId = req.user._id; // Get the seller's ID from the authenticated user
        const listingData = Object.assign(Object.assign({}, req.body), { sellerId });
        const listing = yield listingService.createListing(listingData);
        res.status(201).json({
            success: true,
            data: listing,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createListing = createListing;
// Update listing
const updateListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updates = req.body;
        // Ensure the sellerId is not overwritten
        delete updates.sellerId;
        const updatedListing = yield Listing_1.default.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });
        if (!updatedListing) {
            res.status(404).json({ success: false, message: "Listing not found" });
            return;
        }
        res.status(200).json({ success: true, data: updatedListing });
    }
    catch (error) {
        console.error("Error updating listing:", error);
        res.status(500).json({ success: false, message: "Failed to update listing" });
    }
});
exports.updateListing = updateListing;
// Delete listing
const deleteListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'Not authenticated',
            });
            return;
        }
        const { id } = req.params;
        const sellerId = req.user._id.toString();
        yield listingService.deleteListing(id, sellerId);
        res.status(200).json({
            success: true,
            message: 'Listing deleted successfully',
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
exports.deleteListing = deleteListing;
const getFeaturedListings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the latest 4 listings as featured listings
        const listings = yield Listing_1.default.find().sort({ createdAt: -1 }).limit(4).lean();
        res.status(200).json({
            success: true,
            data: listings,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
exports.getFeaturedListings = getFeaturedListings;
