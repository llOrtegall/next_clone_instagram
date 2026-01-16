import { getPostComments, getPostLikeStatus, toggleLike } from "@/lib/actions";
import { useEffect, useState } from "react";
import { Comment } from "./types";

export function usePostComments(postId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const fetchedComments = await getPostComments(postId);

        const formattedComments = fetchedComments.map((comment) => ({
          id: comment.id,
          content: comment.content,
          createdAt: comment.createdAt,
          username: comment.user.username,
          userImage: comment.user.image,
        }));

        setComments(formattedComments);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load comments");
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  return { comments, setComments, loading, error };
}

export function useLikes(postId: string, initialLikesCount: number, currentUserId?: string) {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(initialLikesCount);

  useEffect(() => {
    if (!currentUserId) return

    const likeStatus = async () => {
      const likeStatus = await getPostLikeStatus(postId, currentUserId);
      setLiked(likeStatus);
    }

    likeStatus();
  }, [postId, currentUserId]);

  const handleToggleLike = async () => {
    if (!currentUserId) return;

    try {
      const { count, liked } = await toggleLike(postId, currentUserId);
      setLikesCount(count);
      setLiked(liked);
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  return { liked, likesCount, handleToggleLike };
}