const MEDIA_VIDEO_BASE_URL =
  process.env.NEXT_PUBLIC_MEDIA_VIDEO_URL ??
  "http://media.turismodabar.cl/medias/videos";

/** URL absoluta de un video alojado en media.turismodabar.cl */
export function mediaVideoUrl(filename: string) {
  const base = MEDIA_VIDEO_BASE_URL.replace(/\/$/, "");
  const file = filename.replace(/^\//, "");
  return `${base}/${file}`;
}
