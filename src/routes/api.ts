import { Router } from 'express';
import * as TaskController from '../controllers/tasks.controller';

const router = Router();

router.get('/todo', TaskController.all);
router.post('/todo', TaskController.add);
router.put('/todo/:id', TaskController.update);
router.delete('/todo/:id', TaskController.remove);

export default router;