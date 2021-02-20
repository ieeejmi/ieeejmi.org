import { firestore } from 'firebase'
import fire from './database'

export interface Article {
  id?: string
  title: string
  subtitle?: string
  content: string
  createdOn?: firebase.firestore.Timestamp
  publishedOn?: firebase.firestore.Timestamp
  author?: string
  isPublished?: boolean
  isDeleted?: boolean
}

export type ArticleAge = "recent" | "older" | "all" | number

const DAYS = (n:number) => n * 1000 * 60 * 60 * 24
const blogposts = fire.collection('blogposts')

/**
 * Recommend an article based on age
 * @param age How old
 * @todo add relevant filtering
 */
export async function getArticles(age:ArticleAge = 'recent') {
  return (await blogposts
    .where('isPublished', '==', true)
    .where('isDeleted', '==', false)
    .where('publishedOn', '>=', (
      typeof age === 'number' ? (
        new Date( Date.now() - DAYS(age) )
      ) : (
        age === 'recent' ? new Date( Date.now() - DAYS(30) ) : (
          age === 'older' ? new Date( Date.now() - DAYS(90) ) : (
            new Date(0)
          )
        )
      ) 
    ))
    .where('publishedOn', '<=', (
      typeof age === 'number' ? (
        new Date()
      ): (
        age === 'recent' ? new Date() : (
          age === 'older' ? new Date( Date.now() - DAYS(30) ) : (
            new Date()
          )
        )
      ) 
    ))
    .orderBy('publishedOn', 'desc')
    .limit(20)
    .get())
  .docs.map(
    article => ({ ...article.data() } as Article)
  )
}

/**
 * List All 
 * @param age How old
 */
export async function listArticles() {
  return (await blogposts
    .orderBy('publishedOn', 'desc')
    .limit(20)
    .get())
  .docs.map(
    article => ({ ...article.data() } as Article)
  )
}

/**
 * Find article by ID
 * @param articleId Article ID to get
 */
export async function getArticleById(articleId:string)  {
  return {
    ...(await blogposts.doc(articleId).get()).data()
  } as Article
}

/**
 * Save without publishing
 * @param article Payload
 */
export async function saveDraftArticle(article:Article) {
  const { id } = await blogposts.add({
    ...article,
    createdOn: new Date(),
    author: 'root',
    publishedOn: null,
    isPublished: false,
    isDeleted: false,
  })
  
  updateArticle(id, { id })
  return id
}

/**
 * Publish immediately
 * @param article Payload
 */
export async function publishArticle(article:Article) {
  const { id } = await blogposts.add({
    ...article,
    createdOn: new Date(),
    author: 'root',
    publishedOn: firestore.Timestamp.fromDate(new Date()),
    isPublished: true,
    isDeleted: false
  })

  updateArticle(id, { id })
  return id
}

export async function publishSavedArticle(articleId:string) {
  await blogposts.doc(articleId).update({
    isPublished: true
  })
}

export async function updateArticle(articleId:string, payload:object) {
  if ((await blogposts.doc(articleId).get()).exists)
    await blogposts.doc(articleId).update({
      ...payload
    })
  else
    await saveDraftArticle(payload as Article)
}

export async function deleteArticle(articleId:string) {
  await blogposts.doc(articleId).update({
    isDeleted: true
  })
}

export async function permanentlyDeleteArticle(articleId:string) {
  await blogposts.doc(articleId).delete()
}