import fire from './database'

export type SocialPlatforms = 'facebook' | 'instagram'

const settings = fire.collection('settings')

export async function getSocialHandles(platform:SocialPlatforms | 'all' = 'all') {
  const handles = (await settings.doc('social').get()).data()
  if (platform === 'all')
    return handles
  else if (handles)
    return handles[platform] 
}

export async function addSocialHandles(platform:SocialPlatforms, handle:string) {
  await settings.doc('social').set({
    [platform]: handle
  })
}

