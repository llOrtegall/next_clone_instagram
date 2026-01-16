'use client';

import { Heart, MessageCircle, Bookmark, Smile } from "lucide-react";
import { Button, Separator, TextField } from "@radix-ui/themes";
import { addComment, toggleLike } from "@/lib/actions";
import { FormEvent, useCallback } from "react";
import { CommentItem } from "./CommentItem";
import { usePostComments, useLikeStatus } from "./hooks";
import { PostActionProps } from "./types";

export default function PostActions({ post, currentUserId }: PostActionProps) {
  const { comments, setComments, loading: commentsLoading } = usePostComments(post.id);
  const { liked, setLiked } = useLikeStatus(post.id, currentUserId!);

  const handleClickLike = useCallback(async () => {
    if (!currentUserId) return;
    try {
      const { liked: newLiked } = await toggleLike(post.id, currentUserId);
      setLiked(newLiked);
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  }, [post.id, currentUserId, setLiked]);

  const handleAddComment = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const content = formData.get("content") as string;

    if (!content?.trim() || !currentUserId) return;

    try {
      const newComment = await addComment(post.id, currentUserId, content);
      setComments([...comments, {
        id: newComment.id,
        content: newComment.content,
        createdAt: newComment.createdAt,
        username: newComment.user.username,
        userImage: newComment.user.image,
      }]);
      e.currentTarget.reset();
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  }, [post.id, currentUserId, comments, setComments]);

  const likeCount = liked ? post.likesCount + 1 : post.likesCount;

  return (
    <>
      {/* Comments Section */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
        {commentsLoading && <p className="text-gray-500 text-sm">Loading comments...</p>}
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      {/* Add Comment Form */}
      <form className="flex items-center gap-2" onSubmit={handleAddComment}>
        <TextField.Root
          type="text"
          size="3"
          name="content"
          placeholder="Add a comment..."
          className="flex-1"
        />
        <TextField.Slot>
          <Smile className="w-6 h-6 text-gray-400 hover:text-yellow-500 transition cursor-pointer" />
        </TextField.Slot>
        <Button type="submit" size="3">
          Post
        </Button>
      </form>

      <Separator size="4" className="my-4" />

      {/* Interactions Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <nav className="flex gap-4">
            <button
              onClick={handleClickLike}
              className="cursor-pointer hover:text-red-500 transition text-gray-400"
              aria-label={liked ? "Unlike post" : "Like post"}
            >
              {liked ? (
                <Heart className="w-6 h-6 fill-red-500 text-red-500" />
              ) : (
                <Heart className="w-6 h-6" />
              )}
            </button>

            <button
              className="cursor-pointer hover:text-blue-500 transition text-gray-400"
              aria-label="Comment on post"
            >
              <MessageCircle className="w-6 h-6" />
            </button>
          </nav>
          <button
            className="cursor-pointer hover:text-yellow-500 transition text-gray-400"
            aria-label="Save post"
          >
            <Bookmark className="w-6 h-6" />
          </button>
        </div>

        <article className="flex justify-between items-center">
          <p className="text-xs sm:text-sm font-semibold text-white">
            {likeCount} Likes
          </p>
          <p className="text-xs text-gray-500">
            {post.createdAt.toDateString()} - Posted
          </p>
        </article>
      </section>
    </>
  );
}
