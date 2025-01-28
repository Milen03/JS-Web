import express from 'express'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
const secret = 'SOMESECRETHERE';

app.get('/setCookie', (req, res) => {
    res.cookie('message', 'hello')
    res.end('Cooki set')
})

app.get('/readCookie', (req, res) => {
    res.json(req.cookies)
})

const users = []

app.get('/register', (req, res) => {
    res.send(`<form method="POST">
        <div>
            <label for="username">Username</label>
            <input type="text" id="username" name="username" />
        </div>

        <div>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" />
        </div>
        <div>
            <input type="submit" value="Register">
        </div>
    </form>`)
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    //save user data 
    users.push({
        username,
        password: hash
    })

    console.log(users);

    res.redirect('/login')

})

app.get('/login', (req, res) => {
    res.send(`<form method="POST">
        <div>
            <label for="username">Username</label>
            <input type="text" id="username" name="username" />
        </div>

        <div>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" />
        </div>
        <div>
            <input type="submit" value="Login">
        </div>
    </form>
    `)
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body

    const user = users.find(uesr => uesr.username === username)

    if (!user) {
        return res.send('Invalid user!')
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
        return res.send('Invalid password')
    }

    const token = jwt.sign({ username }, secret, { expiresIn: '2h' })

    res.cookie('auth', token)

    res.send('Valid Passowrd')
})
// Make an authorized request
app.get('/profile', async (req, res) => {
    const token = req.cookies['auth']

    if (!token) {
        return res.status(401).send('Unauthorized')
    }

    try {
        const decodedToken = jwt.verify(token, secret)
        res.send(`
     <h1>Profile Page | ${decodedToken.username}</h1>
    `)
    } catch (err) {
        return res.status(401).send('Invalid Token')
    }
})

app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));


