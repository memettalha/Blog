import db from '../database/index.js';

export interface Comment {
  id: number;
  post_id: number;
  content: string;
  commenter_name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface CreateCommentDTO {
  post_id: number;
  content: string;
  commenter_name: string;
}

export interface UpdateCommentDTO {
  content: string;
}

const Comment = {
  async getAll({ post, commenter }: { post?: number; commenter?: string } = {}) {
    let query = db('comments').select('*');
    
    if (post) {
      query = query.where('post_id', post);
    }
    
    if (commenter) {
      query = query.where('commenter_name', commenter);
    }
    
    return query;
  },

  async getById(id: number) {
    return db('comments').where('id', id).first();
  },

  async create(data: CreateCommentDTO) {
    const [comment] = await db('comments')
      .insert({
        ...data,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning('*');
    return comment;
  },

  async update(id: number, data: UpdateCommentDTO) {
    const [comment] = await db('comments')
      .where('id', id)
      .update({
        ...data,
        updated_at: new Date()
      })
      .returning('*');
    return comment;
  },

  async delete(id: number) {
    const [comment] = await db('comments')
      .where('id', id)
      .update({
        deleted_at: new Date(),
        updated_at: new Date()
      })
      .returning('*');
    return comment;
  }
};

export default Comment; 