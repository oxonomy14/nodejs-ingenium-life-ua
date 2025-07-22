//import createHttpError from 'http-errors';
import { getAllPost, createPost, getPostById } from '../services/post.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { PostCollection } from '../db/models/post.js';



export const getAllPostController = async (req, res, next) => {

  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    //const userId = req.user._id;
        const posts = await getAllPost({
          page,
          perPage,
          sortBy,
          sortOrder,
          filter,
         // userId, 
        });
    
        res.status(200).json({
          status: 200,
          message: 'Successfully found posts!',
          data: posts
        });
      } catch (err) {
        next(err);
      }
};
  

export const createPostController = async (req, res) => {
    //const userId = req.user._id;
  const files = req.files;

  const imgSrc = files?.imgSrc?.[0];
  const imgSrcPostTop = files?.imgSrcPostTop?.[0];

  let imgUrl, imgUrlPostTop;

  if (imgSrc) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      imgUrl = await saveFileToCloudinary(imgSrc);
    } else {
      imgUrl = await saveFileToUploadDir(imgSrc);
    }
  }

  if (imgSrcPostTop) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      imgUrlPostTop = await saveFileToCloudinary(imgSrcPostTop);
    } else {
      imgUrlPostTop = await saveFileToUploadDir(imgSrcPostTop);
    }
  }

  const post = await createPost({
    ...req.body,
    imgSrc: imgUrl,
    imgSrcPostTop: imgUrlPostTop,
  });

  if (!imgSrc || !imgSrcPostTop) {
  return res.status(400).json({
    message: "Images 'imgSrc' and 'imgSrcPostTop' are required",
    status: 400,
  });
}

  res.status(201).json({
    message: 'Successfully created a post',
    status: 201,
    data: post,
  });
};


export const getPostByIdController = async (req, res) => {
  const { postId } = req.params;

  const post = await getPostById(
    postId,
    { $inc: { views: 1 } }, // інкрементуємо views на 1
    { new: true } // повертаємо оновлений документ
  );

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.json({
    status: 200,
    data: post,
  });
};

