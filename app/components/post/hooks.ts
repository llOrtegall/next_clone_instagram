import { useEffect, useState } from "react";
import { getPostComments, getPostLikeStatus } from "@/lib/actions";
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

export function useLikeStatus(postId: string, userId: string) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const isLiked = await getPostLikeStatus(postId, userId);
        setLiked(isLiked);
      } catch (err) {
        console.error("Failed to check like status:", err);
      } finally {
        setLoading(false);
      }
    };

    checkLikeStatus();
  }, [postId, userId]);

  return { liked, setLiked, loading };
}
