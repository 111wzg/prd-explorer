/**
 * @fileoverview 验证项路由
 * @description 定义验证项相关的 API 路由
 */

import { Router } from 'express';
import {
  getValidations,
  getValidation,
  createValidation,
  updateValidation,
  deleteValidation,
} from '../services/validationsService';

export const validationsRoutes = Router();

validationsRoutes.get('/', getValidations);
validationsRoutes.get('/:id', getValidation);
validationsRoutes.post('/', createValidation);
validationsRoutes.put('/:id', updateValidation);
validationsRoutes.delete('/:id', deleteValidation);
