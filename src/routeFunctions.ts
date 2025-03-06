import fs from 'fs'
import path from "node:path"
import { downloadGoogleImage, buildHeaders } from './utils'

const pickerUrl = `https://photospicker.googleapis.com/v1/` 

export const getPeople = async (req: any, res: any)=>{
    let cursor = await req.db.collection('people').find()
    res.json(await cursor.toArray())
}

export const postPeople = async (req: any, res: any) => {
    let collection = req.db.collection('people')
    let newPeople = req.body
    let query = { $or: [{ picture: {$exists: true}}, {badge_photo: {$exists: true} }]}
    let peoplePicture = await (await collection.find(query)).toArray()
    peoplePicture.forEach((person: any) => {
        let newPerson = newPeople.find((newPerson: any) => {
            return newPerson.login == person.login
        })
        if(newPerson){
            newPerson.badge_photo = person?.badge_photo
            newPerson.picture = person?.picture
        }
    })
    collection.drop()
    collection.insertMany(newPeople)
    res.json( { success: true } )
}

export const savePicture = async (req: any, res: any) => {
    const { email, picture } = req.body
    req.db.collection('people').updateOne({ email_cit: email }, { $set: { picture } } )
    res.json( { success: true } )
}

export const getPeoplePhotos = async (req: any, res: any) => {
    let url = `${pickerUrl}sessions`
    const response = await fetch(url, {
      method: 'POST',
      headers: buildHeaders(req.query.token)
    })
    let responseData = await response.json()
    res.json(responseData)
}

export const photosCheck = async (req: any, res: any) => {
    const url = `${pickerUrl}sessions/`
    const response = await fetch( url + req.query.id, {
      method: 'GET',
      headers: buildHeaders(req.query.token),
    })
    let responseData = await response.json()
    res.json(responseData)
}

export const fetchPhotos = async (req: any, res: any) => {
    let query = `sessionId=${req.query.id}&pageSize=100`
    if(req.query.pageToken){
        query+=`&pageToken=${req.query.pageToken}`
    }
    let url = `${pickerUrl}mediaItems?${query}`
    const response = await fetch(url, {
      method: 'GET',
      headers: buildHeaders(req.query.token),
    })
    let responseData = await response.json()

    for (const item of responseData.mediaItems){
        if (!fs.existsSync(path.join('public/browser/photos')))
            fs.mkdirSync(path.join('public/browser/photos'))
        if(item.type === 'PHOTO')
            if( !fs.existsSync(path.join(`public/browser/photos/${item.mediaFile.filename}`)) ){
                await downloadGoogleImage(item.mediaFile.baseUrl, req.query.token, item.mediaFile.filename)
                let login = item.mediaFile.filename.split('.')[0]
                let path = `/photos/${item.mediaFile.filename}`
                await req.db.collection('people').updateOne({login: login}, { $set: {badge_photo: path} })
            }
    }
    res.json({ success: true })
}

export const getPersonById = async (req: any, res: any) => {
    let person = await req.db.collection('people').findOne({email_cit: req.params.id})
    res.json(person)
}

export const sendBackToAngular = (req: any, res: any) => {
    res.sendFile(path.join(__dirname, '../public/browser/index.html'));
}
