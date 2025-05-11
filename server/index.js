import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';
import termsRoutes from './routes/terms.js';
import productsRoutes from './routes/products.js';
import translationsRoutes from './routes/translations.js';
import sequelize from './config/database.js';
import imgRouter from './routes/imgRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: '*',
}));
app.use(express.json());
app.use(helmet());
app.use(requestLogger);

// API Routes
app.use('/api/terms', termsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/translations', translationsRoutes);

app.use('/',imgRouter);

// Serve frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Error handling
app.use(errorHandler);

// Database init and server start
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    await sequelize.sync({ force: false });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default app;
