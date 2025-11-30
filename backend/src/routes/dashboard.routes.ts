import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { AppDataSource } from '../data-source.js';
import { DashboardData } from '../entity/DashboardData.js';
import { Customer } from '../entity/Customer.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.middleware.js';

const router = Router();

// Get dashboard data for the authenticated customer
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const customerId = req.user!.id;
    const dashboardRepo = AppDataSource.getRepository(DashboardData);

    let dashboardData = await dashboardRepo.findOne({
      where: { customerId },
    });

    // If no data exists, create empty record
    if (!dashboardData) {
      dashboardData = new DashboardData();
      dashboardData.customerId = customerId;
      dashboardData.textContent = '';
      await dashboardRepo.save(dashboardData);
    }

    return res.json({
      textContent: dashboardData.textContent,
      updatedAt: dashboardData.updatedAt,
    });
  } catch (error) {
    console.error('Get dashboard data error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Save dashboard data for the authenticated customer
router.put(
  '/',
  authenticateToken,
  [body('textContent').isString().withMessage('Text content must be a string')],
  async (req: AuthRequest, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const customerId = req.user!.id;
      const { textContent } = req.body;
      const dashboardRepo = AppDataSource.getRepository(DashboardData);

      let dashboardData = await dashboardRepo.findOne({
        where: { customerId },
      });

      if (dashboardData) {
        dashboardData.textContent = textContent;
      } else {
        dashboardData = new DashboardData();
        dashboardData.customerId = customerId;
        dashboardData.textContent = textContent;
      }

      await dashboardRepo.save(dashboardData);

      return res.json({
        textContent: dashboardData.textContent,
        updatedAt: dashboardData.updatedAt,
      });
    } catch (error) {
      console.error('Save dashboard data error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Get dashboard data for specific customer by ID (admin)
router.get('/:customerId', authenticateToken, async (req, res) => {
  try {
    const { customerId } = req.params;
    const dashboardRepo = AppDataSource.getRepository(DashboardData);
    const customerRepo = AppDataSource.getRepository(Customer);

    // Verify customer exists
    const customer = await customerRepo.findOne({ where: { id: customerId } });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const dashboardData = await dashboardRepo.findOne({
      where: { customerId },
    });

    if (!dashboardData) {
      return res.json({
        textContent: '',
        updatedAt: null,
      });
    }

    return res.json({
      textContent: dashboardData.textContent,
      updatedAt: dashboardData.updatedAt,
    });
  } catch (error) {
    console.error('Get customer dashboard data error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
