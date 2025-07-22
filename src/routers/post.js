import { getAllPostController, createPostController, getPostByIdController } from '../controllers/post.js';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createPostSchema } from '../validation/post.js';
//import { updateContactSchema } from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { PostCollection } from '../db/models/post.js';


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

router.get('/:postId', isValidId(), ctrlWrapper(getPostByIdController));

router.post('/:postId/increment-views', async (req, res) => {
  try {
    const updatedPost = await PostCollection.findByIdAndUpdate(
      req.params.postId,
      { $inc: { views: 1 } },  // інкремент views на 1
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({
      status: 200,
      message: 'Views incremented',
      data: updatedPost,
    });
  } catch (error) {
    console.error('Error incrementing views:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// router.use(authenticate);

// router.get('/', ctrlWrapper(getAllContactsController));

// router.use('/:contactId', isValidId('contactId')); // більшь гнучка, можеме змнінювати змінну contactId


// router.get('/:contactId', ctrlWrapper(getContactByIdController)); 
// router.delete('/:contactId', ctrlWrapper(deleteContactController)); 
// router.post('/', upload.single('photo'), validateBody(createContactSchema), ctrlWrapper(createContactController));  
// router.patch('/:contactId',  upload.single('photo'), validateBody(updateContactSchema), ctrlWrapper(patchContactController));





export default router;