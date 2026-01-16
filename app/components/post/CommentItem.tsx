'use client';

import Image from "next/image";
import { CommentItemProps } from "./types";

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={comment.userImage || 'https://unavatar.io/default'}
        alt={`${comment.username}'s avatar`}
        width={48}
        height={48}
        className="w-12 h-12 rounded-full object-cover shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="text-xs sm:text-sm">
          <span className="font-semibold text-white">{comment.username}</span>
          <span className="text-gray-400 ml-2">{comment.content}</span>
        </p>
        <p className="text-xs text-gray-600 mt-1">
          {comment.createdAt.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
