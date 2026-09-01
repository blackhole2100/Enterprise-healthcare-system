import { Router } from 'express';
import { requireCapability } from '../middleware/require-capability.js';
import { paTasks } from '@health/core';

const router = Router();

router.get('/', requireCapability('schedule.read'), (req, res) => {
  res.json(paTasks);
});

export default router;