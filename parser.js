const bodyParser = (req) => {
    return new Promise((resolve, reject) => {
        try {
            req.on('data', (data) => {
                resolve(JSON.parse(data.toString()))
            })
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = bodyParser