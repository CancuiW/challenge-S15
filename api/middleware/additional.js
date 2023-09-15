
const Users = require('./../auth/auth-model')


async function checkUsernameFree(req, res, next) {
    try {
        const { username } = req.body
        const exist = await Users.findBy({ username })
        if (exist) {
            next({ status: 422, message: "username taken" })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }

}

function checkExist(req, res, next) {
    const { password, username } = req.body
    if (!password || !username) {
        next({ status: 422, message: "username and password required" })
    } else {
        next()
    }
}


    




const checkUsernameExists = (req, res, next) => {

    const { username } = req.body
    Users.findBy({ username })
        .then(user => {
            if (user) {
                next()
            } else {
                next({ status: 401, message: "Invalid credentials" })
            }
        })
        .catch(next)
}






module.exports = {
    
    checkUsernameExists,
    checkUsernameFree,
    checkExist
}