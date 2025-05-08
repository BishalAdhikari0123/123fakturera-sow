import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';
import termsRoutes from './routes/terms.js';
import productsRoutes from './routes/products.js';
import translationsRoutes from './routes/translations.js';
import sequelize from './config/database.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(requestLogger);

// Routes
app.use('/api/terms', termsRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/translations', translationsRoutes);

// Error handling
app.use(errorHandler);

// Database init and server start
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync models with database
    await sequelize.sync({ force: false });
    
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default app;