"use client";

import { useState, useMemo } from "react";
import VideoCard from "@/components/VideoCard";
import { Video } from "@/types/video";
import videoData from "@/data/index.json";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKeyword, setSelectedKeyword] = useState<string>("全部");
  const [sortBy, setSortBy] = useState<"播放量" | "默认">("默认");

  // 验证和过滤数据
  const videos = useMemo(() => {
    const data = Array.isArray(videoData) ? videoData : [];
    return data
      .filter((v) => {
        if (v == null || typeof v !== "object") return false;
        const videoLink = (v as Record<string, unknown>).视频链接;
        return typeof videoLink === "string" && videoLink.length > 0;
      })
      .map((v) => v as Video);
  }, []);

  // 获取所有唯一的关键词
  const keywords = useMemo(() => {
    const uniqueKeywords = Array.from(
      new Set(videos.map((v) => v.关键词).filter(Boolean))
    ).sort();
    return ["全部", ...uniqueKeywords];
  }, [videos]);

  // 筛选和排序视频
  const filteredVideos = useMemo(() => {
    let filtered = videos;

    // 按关键词筛选
    if (selectedKeyword !== "全部") {
      filtered = filtered.filter((v) => v.关键词 === selectedKeyword);
    }

    // 搜索筛选
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (v) =>
          (v.标题 && v.标题.toLowerCase().includes(query)) ||
          (v.description && v.description.toLowerCase().includes(query)) ||
          (v.关键词 && v.关键词.toLowerCase().includes(query))
      );
    }

    // 排序
    if (sortBy === "播放量") {
      filtered = [...filtered].sort(
        (a, b) => (b.播放量 ?? 0) - (a.播放量 ?? 0)
      );
    }

    return filtered;
  }, [videos, selectedKeyword, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* 头部 */}
      <header className="bg-white dark:bg-zinc-900 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">
            瑜伽视频库
          </h1>

          {/* 搜索栏 */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索视频标题、描述或关键词..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 pr-4 text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* 筛选和排序 */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* 关键词筛选 */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                分类:
              </label>
              <select
                value={selectedKeyword}
                onChange={(e) => setSelectedKeyword(e.target.value)}
                className="px-4 py-2 text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {keywords.map((keyword) => (
                  <option key={keyword} value={keyword}>
                    {keyword}
                  </option>
                ))}
              </select>
            </div>

            {/* 排序 */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                排序:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "播放量" | "默认")}
                className="px-4 py-2 text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="默认">默认</option>
                <option value="播放量">按播放量排序</option>
              </select>
            </div>

            {/* 结果统计 */}
            <div className="ml-auto text-sm text-zinc-600 dark:text-zinc-400">
              找到 {filteredVideos.length} 个视频
            </div>
          </div>
        </div>
      </header>

      {/* 视频网格 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video, index) => (
              <VideoCard key={`${video.视频链接}-${index}`} video={video} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <svg
              className="mx-auto h-12 w-12 text-zinc-400"
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
            <h3 className="mt-2 text-sm font-medium text-zinc-900 dark:text-white">
              没有找到视频
            </h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              尝试调整搜索条件或筛选选项
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
