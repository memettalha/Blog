import db from '../database/index.js';

export interface Post {
  id: number;
  category_id: number;
  title: string;
  content: string;
  published_at?: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface CreatePostDTO {
  category_id: number;
  title: string;
  content: string;
}

export interface UpdatePostDTO {
  title?: string;
  content?: string;
  published_at?: Date;
}

const Post = {
  async getAll({ category, status = 'all', showDeleted = false, onlyDeleted = false }) {
    let query = db('posts').select('*');
    
    if (category) {
      query = query.where('category_id', category);
    }
    
    if (status !== 'all') {
      query = query.where('published_at', status === 'published' ? 'is not null' : 'is null');
    }
    
    if (!showDeleted) {
      query = query.whereNull('deleted_at');
    }
    
    if (onlyDeleted) {
      query = query.whereNotNull('deleted_at');
    }
    
    return query;
  },

  async getById(id: number) {
    return db('posts').where('id', id).first();
  },

  async create(data: CreatePostDTO) {
    const [post] = await db('posts')
      .insert({
        ...data,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning('*');
    return post;
  },

  async update(id: number, data: UpdatePostDTO) {
    const [post] = await db('posts')
      .where('id', id)
      .update({
        ...data,
        updated_at: new Date()
      })
      .returning('*');
    return post;
  },

  async delete(id: number) {
    const [post] = await db('posts')
      .where('id', id)
      .update({
        deleted_at: new Date(),
        updated_at: new Date()
      })
      .returning('*');
    return post;
  }
};

export default Post; 