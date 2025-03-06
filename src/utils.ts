import fs from 'fs'

export const downloadGoogleImage = async (url: string, token:string, filename:string) => {
    let filepath = `public/browser/photos/${filename}`
    let response = await fetch( url, { headers: buildHeaders(token) })
    let buffer = await response.arrayBuffer()
    fs.writeFileSync(filepath, Buffer.from(buffer))
}

export const buildHeaders = (token: string) => {
    let headers: any = { 'Content-Type': 'application/json' }
    headers['Authorization'] = 'Bearer ' + token
    return headers
}
