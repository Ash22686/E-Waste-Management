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
exports.getCurrentUser = exports.login = exports.register = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = process.env.JWT_SECRET || "fallbackSecretKey";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "86400";
console.log("JWT_SECRET:", JWT_SECRET ? "Loaded" : "Not Loaded"); // Debugging
// Register a new user
const register = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, userType, address } = userData;
    const existingUser = yield User_1.default.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = (yield User_1.default.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        userType,
        address: {
            city: address.city,
            area: address.area,
            colony: address.colony,
            coordinates: {
                lat: address.coordinates.lat,
                lng: address.coordinates.lng,
            },
        },
    }));
    const token = jsonwebtoken_1.default.sign({ id: user._id.toString() }, JWT_SECRET, {
        expiresIn: parseInt(JWT_EXPIRES_IN, 10),
    });
    const userResponse = {
        _id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        address: user.address,
    };
    return { user: userResponse, token };
});
exports.register = register;
// Login an existing user
const login = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = credentials;
    const user = (yield User_1.default.findOne({ email }).select("+password"));
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id.toString() }, JWT_SECRET, {
        expiresIn: parseInt(JWT_EXPIRES_IN, 10),
    });
    const userResponse = {
        _id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        address: user.address,
    };
    return { user: userResponse, token };
});
exports.login = login;
// Get the current logged-in user
const getCurrentUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (yield User_1.default.findById(userId));
    if (!user) {
        throw new Error("User not found");
    }
    const userResponse = {
        _id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        address: user.address,
    };
    return userResponse;
});
exports.getCurrentUser = getCurrentUser;
