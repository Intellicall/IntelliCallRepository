import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source.js';

// Routes
import authRoutes from './routes/auth.routes.js';
import customerRoutes from './routes/customer.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'IntelliCall API is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Initialize database and start server
AppDataSource.initialize()
  .then(() => {
    console.log('✓ Database connection established');
    console.log('✓ TypeORM initialized successfully');

    app.listen(PORT, () => {
      console.log(`✓ IntelliCall API server running on port ${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV}`);
      console.log(`✓ CORS enabled for: ${process.env.CORS_ORIGIN}`);
    });
  })
  .catch((error) => {
    console.error('✗ Error during database initialization:', error);
    process.exit(1);
  });

export default app;
