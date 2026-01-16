'use client';

import { Heart, MessageCircle, Bookmark } from "lucide-react";
import { Button, Separator, TextField } from "@radix-ui/themes";
import { EmojiPickerButton } from "./EmojiPickerButton";
import { FormEvent, useCallback, useRef } from "react";
import { useLikes, usePostComments } from "./hooks";
import { addComment } from "@/lib/actions";
import { CommentItem } from "./CommentItem";
import { PostActionProps } from "./types";

export default function PostActions({ post, currentUserId }: PostActionProps) {
  const { comments, setComments, loading: commentsLoading } = usePostComments(post.id);
  const { liked, likesCount, handleToggleLike } = useLikes(post.id, post.likesCount, currentUserId);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEmojiSelect = (emoji: string) => {
    if (inputRef.current) {
      inputRef.current.value += emoji;
      inputRef.current.focus();
    }
  };

  const handleAddComment = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
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
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      form.reset();
    }
  }, [post.id, currentUserId, comments, setComments]);

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
          ref={inputRef}
        />
        <TextField.Slot>
          <EmojiPickerButton onEmojiSelect={handleEmojiSelect} />
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
              className="cursor-pointer hover:text-red-500 transition text-gray-400"
              aria-label={liked ? "Unlike post" : "Like post"}
              onClick={handleToggleLike}
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
            {likesCount} Likes
          </p>
        </article>
      </section>
    </>
  );
}
