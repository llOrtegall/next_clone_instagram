'use client';

import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import { Smile, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface EmojiPickerButtonProps {
  onEmojiSelect?: (emoji: string) => void;
}

export function EmojiPickerButton({ onEmojiSelect }: EmojiPickerButtonProps) {
  const [showPicker, setShowPicker] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    if (onEmojiSelect) {
      onEmojiSelect(emojiData.emoji);
    }
    setShowPicker(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showPicker]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        className="text-gray-400 hover:text-yellow-500 transition cursor-pointer flex items-center justify-center"
        aria-label="Open emoji picker"
      >
        <Smile className="w-8 h-8" />
      </button>
      {showPicker && (
        <div className="absolute bottom-10 right-0 z-50">
          <div className="relative bg-gray-900 rounded-lg shadow-lg">
            <button
              type="button"
              onClick={() => setShowPicker(false)}
              className="absolute top-2 right-2 z-10 p-1 hover:bg-gray-800 rounded transition"
              aria-label="Close emoji picker"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
            <EmojiPicker onEmojiClick={handleEmojiClick} theme={Theme.DARK} />
          </div>
        </div>
      )}
    </div>
  );
}
