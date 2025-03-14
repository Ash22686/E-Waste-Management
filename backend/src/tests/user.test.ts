import { UserService } from '../services/user.service';
import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

describe('User Service Tests', () => {
    let userService: UserService;

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/ecommerce_test');
        userService = new UserService();
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it('should create a new user', async () => {
        const userData = {
            email: 'test@test.com',
            password: 'password123',
            name: 'Test User',
            role: 'buyer'
        };

        const user = await userService.create(userData);
        expect(user.email).toBe(userData.email);
        expect(user.name).toBe(userData.name);
    });

    // Add more tests as needed
});
