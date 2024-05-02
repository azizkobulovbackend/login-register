const http = require('http')
const User = require('./user')
const parser = require('./parser')
const login = require('./login')
const register = require('./register')
const Io = require('./io')

const PORT = 5000

let userDb = new Io(`${process.cwd()}/db/users.json`)

const app = http.createServer( async(req, res) => {
    req.body = await parser(req)
    res.setHeader('Content-Type', 'application/json')

   const users = await userDb.read()

   if(req.method === 'POST') {

    if(req.url === '/login') {
       return login(users, req.body, res)

       
    }else if(req.url === '/register') {
        if(register(users, req.body, res)) {
            return res.end(JSON.stringify({message: 'Username already exists'}))
        }

        let id = Math.floor(Math.random() * 1000)
        let from = 'Tashkent'
        const newUser = new User(id, req.body.username, req.body.password, from)

        users.push(newUser)
        await userDb.write(users)

        res.end(JSON.stringify({message: 'Successfully Registered', data: newUser}))
    }
   }
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})