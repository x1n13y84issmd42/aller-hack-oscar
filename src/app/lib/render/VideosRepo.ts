export interface VideosRepo<V> {
  getVideo(id: string): V
}
