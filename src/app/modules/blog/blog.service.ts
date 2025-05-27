import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: Partial<IBlog>) => {
  const result = await Blog.create(payload);
  return result;
};

const getAllBlogsFromDB = async () => {
  const result = await Blog.find();
  return result;
};

const getBlogByIdFromDB = async (_id: string) => {
  const result = await Blog.findById(_id);
  return result;
};

// update blog into db
const updateBlogIntoDB = async (_id: string, payload: Partial<IBlog>) => {
  const result = await Blog.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// delete blog into db
const deleteBlogFromDB = async (_id: string) => {
  const result = await Blog.findByIdAndDelete(_id);
  return result;
};

export const BlogService = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getBlogByIdFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
