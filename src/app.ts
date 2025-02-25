import 'dotenv/config'
import express from "express"
import session from "express-session"
import passport from "passport"
import { db, setHeaders } from "./middleware"
import path from "node:path"

const app = express()

app.set('trust proxy', 1);

app.use(express.json())
app.use(express.static('public/browser'))
app.use(session({secret: process.env.SESSION_SECRET ?? "aham", resave: true,
    saveUninitialized: true, cookie: { secure: false }}))
app.use(passport.initialize());
app.use(passport.session());
app.use(db)
app.use(setHeaders)

app.post('/api/people', async (req: any, res) => {
    req.db.collection('people').drop()
    req.db.collection('people').insertMany(req.body)
    res.json( { success: true } )
})
app.post('/api/save-picture', async (req: any, res) => {
    const { email, picture } = req.body
    req.db.collection('people').updateOne({ 'Email CI&T': email }, { $set: { picture } } )
    res.json( { success: true } )
})
app.get('/api/people', async (req: any, res) => {
    let cursor = await req.db.collection('people').find()
    res.json(await cursor.toArray())
})
app.get('/api/person/:id', async (req: any, res) => {
    let person = await req.db.collection('people').findOne({'Email CI&T': req.params.id})
    res.json(person)
})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/browser/index.html'));
});

app.listen(process.env.PORT ?? 3000, () => console.log("running"))
