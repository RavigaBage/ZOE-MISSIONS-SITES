import dotenv from 'dotenv';
import ExpressService from './services/ExpressService.js';
import { connectDB } from './services/dataBase.js';

await connectDB(); 
dotenv.config();
new ExpressService().start();