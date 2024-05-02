const login = (users, req, res) => {
    let findUser = users.find(
        user => 
        user.username === req.username && 
        user.password === req.password
    )

    if(!findUser) {
        res.writeHead(403)

       return res.end(
           JSON.stringify({ message: 'Incorrect username or password'})
       )
   }
   res.end(JSON.stringify({Status: 200,  message: 'Success', data: findUser}))
}

module.exports = login