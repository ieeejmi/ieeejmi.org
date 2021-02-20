import { storage } from './database'

const images = storage.ref('uploads/images')

export async function upload(file:File, metadata?:object) {
  const ref = images.child(file.name)
  return (await ref.put(file, metadata)).ref.getDownloadURL()
}
