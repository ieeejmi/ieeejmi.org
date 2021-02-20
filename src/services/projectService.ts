import { firestore } from 'firebase'
import fire from './database'

export interface Project {
  id?: string
  title: string
  headerImage?: string 
  description?: string
  displayItems: ProjectDisplayItem[]
  createdOn: firebase.firestore.Timestamp
  publishedOn?: firebase.firestore.Timestamp
  author?: string
  isPublished?: boolean
  isDeleted?: boolean
}

export interface ProjectDisplayItem {
  contentType: 'image' | 'text'
  content: string 
}

const projects = fire.collection('projects')

/**
 * Recommend an Project based on age
 * @todo add relevant filtering
 */
export async function getProjects() {
  return (await projects
    .where('isPublished', '==', true)
    .where('isDeleted', '==', false)
    .orderBy('publishedOn', 'desc')
    .limit(20)
    .get())
  .docs.map(
    project => ({ ...project.data() } as Project)
  )
}

/**
 * List All 
 * @param age How old
 */
export async function listProjects() {
  return (await projects
    .orderBy('publishedOn', 'desc')
    .limit(20)
    .get())
  .docs.map(
    project => ({ ...project.data() } as Project)
  )
}

/**
 * Find Project by ID
 * @param projectId Project ID to get
 */
export async function getProjectById(projectId:string)  {
  return {
    ...(await projects.doc(projectId).get()).data()
  } as Project
}

/**
 * Save without publishing
 * @param Project Payload
 */
export async function saveDraftProject(project:Project) {
  const { id } = await projects.add({
    ...project,
    createdOn: new Date(),
    author: 'root',
    publishedOn: null,
    isPublished: false,
    isDeleted: false,
  })
  
  updateProject(id, { id })
  return id
}

/**
 * Publish immediately
 * @param Project Payload
 */
export async function publishProject(project:Project) {
  const { id } = await projects.add({
    ...project,
    createdOn: new Date(),
    author: 'root',
    publishedOn: firestore.Timestamp.fromDate(new Date()),
    isPublished: true,
    isDeleted: false,
  })

  updateProject(id, { id })
  return id
}

export async function publishSavedProject(projectId:string) {
  await projects.doc(projectId).update({
    isPublished: true
  })
}

export async function updateProject(projectId:string, payload:object) {
  if ((await projects.doc(projectId).get()).exists)
    await projects.doc(projectId).update({
      ...payload
    })
  else
    await saveDraftProject(payload as Project)
}

export async function deleteProject(projectId:string) {
  await projects.doc(projectId).update({
    isDeleted: true
  })
}

export async function permanentlyDeleteProject(projectId:string) {
  await projects.doc(projectId).delete()
}