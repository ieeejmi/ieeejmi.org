export const env = JSON.parse(Buffer.from(process.env.REACT_APP_SECRET as string, 'base64').toString('ascii'))
export default env