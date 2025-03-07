import 'dotenv/config'
import express from "express"
import session from "express-session"
import passport from "passport"
import { db, setHeaders } from "./middleware"
import { fetchPhotos, getPeople, getPeoplePhotos, getPersonById, 
    photosCheck, postPeople, savePicture, sendBackToAngular } from './routeFunctions'
const cors = require('cors');
const app = express()
const sessionConfig = {
    secret: process.env.SESSION_SECRET ?? "session_secret",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}

app.use(cors({
  origin: '*'
}));

app.set('trust proxy', 1)

app.use(express.json())
app.use(express.static('public/browser'))
app.use(session(sessionConfig))
app.use(passport.initialize())
app.use(passport.session())
app.use(db)
app.use(setHeaders)

app.get('/api/people', getPeople)
app.post('/api/people', postPeople)
app.post('/api/save-picture', savePicture)
app.get('/api/people/photos', getPeoplePhotos)
app.get('/api/people/photosCheck', photosCheck)
app.get('/api/people/fetchPhotos', fetchPhotos)
app.get('/api/person/:id', getPersonById)
app.get('*', sendBackToAngular)

app.listen(process.env.PORT ?? 3000, () => console.log("running"))
