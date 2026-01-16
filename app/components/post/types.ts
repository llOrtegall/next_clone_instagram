export interface PostActionProps {
  currentUserId?: string;
  post: {
    id: string;
    likesCount: number;
    createdAt: Date;
  }
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  username: string | null;
  userImage: string | null;
}

export interface CommentItemProps {
  comment: Comment;
}
