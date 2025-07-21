import { getAllContactsController, getContactByIdController, deleteContactController, createContactController, patchContactController } from '../controllers/contacts.js';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/contacts.js';
import { updateContactSchema } from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllContactsController));

router.use('/:contactId', isValidId('contactId')); // більшь гнучка, можеме змнінювати змінну contactId


router.get('/:contactId', ctrlWrapper(getContactByIdController)); 
router.delete('/:contactId', ctrlWrapper(deleteContactController)); 
router.post('/', upload.single('photo'), validateBody(createContactSchema), ctrlWrapper(createContactController));  
router.patch('/:contactId',  upload.single('photo'), validateBody(updateContactSchema), ctrlWrapper(patchContactController));





export default router;