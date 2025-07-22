import { PostCollection } from '../db/models/post.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllPost = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
//userId,
}) => {
  
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const postQuery = PostCollection.find();
  
 

  if (filter.type) {
    postQuery.where('category').equals(filter.type);
  }
 

  const [postCount, post] = await Promise.all([
    PostCollection.find().merge(postQuery).countDocuments(),
    postQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(postCount, perPage, page);

  return {
    data: post,
    ...paginationData,
  }; 
};



export const createPost = async (payload) => {
  const post = await PostCollection.create(payload);
  return post;
};

export const getPostById = async (id, update = {}, options = {}) => {
  return PostCollection.findByIdAndUpdate(id, update, options);
};