import { Router } from 'express';
import { createURLRecord } from '../controllers/urlRecordController.js';

const urlRecordRouter = new Router();

urlRecordRouter.route('/urlRecord').post(createURLRecord);

export default urlRecordRouter;
