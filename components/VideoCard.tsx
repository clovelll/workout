"use client";

import { Video } from "@/types/video";
import { useState } from "react";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [imageError, setImageError] = useState(false);

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const handleCardClick = () => {
    window.open(video.视频链接, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      onClick={handleCardClick}
      className="group block bg-white dark:bg-zinc-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
        {!imageError && video.封面链接 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={video.封面链接}
            alt={video.标题 || "视频封面"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-300 dark:bg-zinc-700">
            <svg
              className="w-12 h-12 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        {video.时长 && (
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {video.时长}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {video.标题 || "无标题"}
        </h3>
        {video.description && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 line-clamp-2">
            {video.description}
          </p>
        )}
        <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            {video.播放量
              ? `${formatViews(video.播放量)} 次观看`
              : "未知播放量"}
          </span>
          {video.博主链接 && (
            <a
              href={video.博主链接}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              博主主页
            </a>
          )}
        </div>
        {video.关键词 && (
          <div className="mt-2">
            <span className="inline-block bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs px-2 py-1 rounded">
              {video.关键词}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
