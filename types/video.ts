export interface Video {
  /** 视频链接（必需） */
  视频链接: string;
  /** 视频标题 */
  标题?: string;
  /** 视频描述 */
  description?: string;
  /** 封面图片链接 */
  封面链接?: string;
  /** 视频时长 */
  时长?: string;
  /** 播放量 */
  播放量?: number;
  /** 博主主页链接 */
  博主链接?: string;
  /** 关键词/分类 */
  关键词?: string;
}
