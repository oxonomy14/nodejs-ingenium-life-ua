import { Router } from 'express';
//import contactsRouter from './contacts.js';
//import authRouter from './auth.js';
import postRouter from './post.js';

const router = Router();

//router.use('/contacts', contactsRouter);
//router.use('/auth', authRouter);
router.use('/blog', postRouter);

export default router;