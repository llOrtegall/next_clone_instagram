'use client';

import { Heart, MessageCircle, Bookmark, Smile } from "lucide-react";
import { Button, Separator, TextField } from "@radix-ui/themes";
import { addComment, getPostComments, getPostLikeStatus, toggleLike } from "@/lib/actions";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";

interface PostTestProps {
  currentUserId?: string;
  post: {
    id: string;
    likesCount: number;
    createdAt: Date;
  }
}

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  username: string | null;
  userImage: string | null;
}

function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={comment.userImage || 'https://unavatar.io/default'}
        alt="Commenter"
        width={48}
        height={48}
        className="w-12 h-12 rounded-full object-cover shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="text-xs sm:text-sm">
          <span className="font-semibold text-white">{comment.username}</span>
          <span className="text-gray-400 ml-2">{comment.content}</span>
        </p>
        <p className="text-xs text-gray-600 mt-1">{comment.createdAt.toLocaleString()}</p>
      </div>
      {/* <button className="text-gray-400 hover:text-red-500 transition shrink-0">
        <Heart className="w-4 h-4" />
      </button> */}
    </div>
  )
}

export default function PostTest({ post, currentUserId }: PostTestProps) {
  const [likes, setLikes] = useState(post.likesCount || 0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const handleClickLike = async () => {
    const { liked, count } = await toggleLike(post.id, currentUserId!);
    setLikes(count);
    setLiked(liked);
  }

  const handleAddComment = async (e: FormEvent) => {
    e.preventDefault();

    const content = (e.currentTarget as HTMLFormElement).content.value;

    if (!content || content.trim().length === 0) {
      return;
    }

    try {
      const res = await addComment(post.id, currentUserId!, content);
      console.log(res);
      (e.currentTarget as HTMLFormElement).reset();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchComments = async () => {
      const comments = await getPostComments(post.id);

      const formattedComments = comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        username: comment.user.username,
        userImage: comment.user.image
      }))

      setComments(formattedComments);
    }

    const checkIfLiked = async () => {
      const res = await getPostLikeStatus(post.id, currentUserId!);
      setLiked(res);
    }

    checkIfLiked();
    fetchComments();
  }, [post.id, currentUserId]);

  return (
    <>
      {/* Section comments */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
        {
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        }
      </div>

      {/* Section add comment */}
      <form className="flex items-center gap-2" onSubmit={handleAddComment}>
        <TextField.Root
          type="text"
          size={"3"}
          name="content"
          placeholder="Add a comment..."
          className="flex-1"
        />
        <TextField.Slot>
          <Smile className="w-6 h-6 text-gray-400 hover:text-yellow-500 transition cursor-pointer" />
        </TextField.Slot>
        <Button type="submit" size={"3"}>
          Post
        </Button>
      </form>

      <Separator size="4" className="my-4" />

      {/* Section likes and date */}
      <section className="">
        <div className="flex items-center justify-between mb-4">
          <nav className="flex gap-4">

            <button
              onClick={handleClickLike}
              className="cursor-pointer hover:text-red-500 transition text-gray-400">
              {
                liked ? <Heart className="w-6 h-6 fill-red-500 text-red-500" /> : <Heart className="w-6 h-6" />
              }
            </button>

            <button className="cursor-pointer hover:text-blue-500 transition text-gray-400">
              <MessageCircle className="w-6 h-6" />
            </button>
          </nav>
          <button className="cursor-pointer hover:text-yellow-500 transition text-gray-400">
            <Bookmark className="w-6 h-6" />
          </button>
        </div>

        <article className="flex justify-between items-center">
          <p className="text-xs sm:text-sm font-semibold text-white">
            {
              likes
            } Likes
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {
              post?.createdAt.toDateString() || ''
            } - Posted
          </p>
        </article>
      </section>
    </>
  )
}