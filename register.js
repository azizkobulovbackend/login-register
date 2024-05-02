const register = (users, req, res) => {
    let findUser = users.find(
        user => 
        user.username === req.username
    )
    return findUser
}

module.exports = register