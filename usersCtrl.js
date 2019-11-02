let userData = require('./userData.json')

module.exports = {
    getUser: (req, res, next) => {
        const {age, email, favorites} = req.query
        if (age) {
            let lessThanAge = userData.filter(el => el.age < age)
            res.status(200).send(lessThanAge)
        } else if (email) {
            let emailMatch = userData.filter(el => el.email === email)
            res.status(200).send(emailMatch)
        } else if (favorites) {
            let favoritesMatch = userData.filter(el => el.favorites.includes(favorites))
            res.status(200).send(favoritesMatch)
        } else {
            res.status(200).send(userData)
        }
    },
    getUserById: (req, res, next) => {
        const {userId} = req.params
        let index = userData.findIndex(el => el.id === +userId)
        if (index === -1) return res.sendStatus(404)
        res.status(200).send(userData[index])
    },
    getAdmins: (req, res, next) => {
        let admins = userData.filter(el => el.type === 'admin')
        res.status(200).send(admins)
    },
    getNonAdmins: (req, res, next) => {
        let nonAdmins = userData.filter(el => el.type !== 'admin')
        res.status(200).send(nonAdmins)
    },
    getUserByType: (req, res, next) => {
        const {userType} = req.params
        let users = userData.filter(el => el.type === userType)
        res.status(200).send(users)
    },
    updateUser: (req, res, next) => {
        const {userId} = req.params
        let index = userData.findIndex(el => el.id === +userId)
        let user = {id: +userId, ...req.body}
        userData.splice(index, 1, user)
        res.status(200).send(userData)
    },
    addUser: (req, res, next) => {
        let newId = userData[userData.length - 1].id + 1
        let user = {id: newId, ...req.body}
        userData.push(user)
        res.status(200).send(userData)
    },
    deleteUser: (req, res, next) => {
        const {userId} = req.params
        let index = userData.findIndex(el => el.id === +userId)
        userData.splice(index, 1)
        res.status(200).send(userData)
    }
}