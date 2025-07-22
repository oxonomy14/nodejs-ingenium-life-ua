import { getAllPostController, createPostController } from '../controllers/post.js';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createPostSchema } from '../validation/post.js';
//import { updateContactSchema } from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.get('/', ctrlWrapper(getAllPostController));
  
router.post(
  '/',
  upload.fields([
    { name: 'imgSrc', maxCount: 1 },
    { name: 'imgSrcPostTop', maxCount: 1 },
  ]),
  validateBody(createPostSchema), // тепер правильний порядок
  ctrlWrapper(createPostController)
);

// router.use(authenticate);

// router.get('/', ctrlWrapper(getAllContactsController));

// router.use('/:contactId', isValidId('contactId')); // більшь гнучка, можеме змнінювати змінну contactId


// router.get('/:contactId', ctrlWrapper(getContactByIdController)); 
// router.delete('/:contactId', ctrlWrapper(deleteContactController)); 
// router.post('/', upload.single('photo'), validateBody(createContactSchema), ctrlWrapper(createContactController));  
// router.patch('/:contactId',  upload.single('photo'), validateBody(updateContactSchema), ctrlWrapper(patchContactController));





export default router;