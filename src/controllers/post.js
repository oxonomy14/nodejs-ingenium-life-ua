//import createHttpError from 'http-errors';
import { getAllPost, createPost } from '../services/post.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';



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
  const imgSrc = req.file;

  let imgUrl;
  if (imgSrc) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      imgUrl = await saveFileToCloudinary(imgSrc);
    } else {
      imgUrl = await saveFileToUploadDir(imgSrc);
    }
  }

    const post = await createPost({
        ...req.body,
        //userId,
        imgSrc: imgUrl,
    });
    res.status(201).json({
        message: 'Successfully created a post',
        status: 201,
        data: post,
    });
};

