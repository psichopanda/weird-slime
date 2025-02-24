import Database from './mongo'

export const db = async (req: any, res: any, next: any) => {
  req.db = new Database().getInstance()
  next()
}

export const setHeaders = async (req: any, res: any, next: any) => {
  res.setHeader('Content-Security-Policy', 'frame-ancestors *; frame-src *')
  next()
}
