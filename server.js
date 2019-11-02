const express = require('express')
const app = express()
const SERVER_PORT = 3000
const usersCtrl = require('./usersCtrl')

app.use(express.json())

app.get('/api/user', usersCtrl.getUser)
app.get('/api/user/:userId', usersCtrl.getUserById)
app.get('/api/admin', usersCtrl.getAdmins)
app.get('/api/nonadmin', usersCtrl.getNonAdmins)
app.get('/api/type/:userType', usersCtrl.getUserByType)

app.put('/api/user/:userId', usersCtrl.updateUser)

app.post('/api/user', usersCtrl.addUser)

app.delete('/api/user/:userId', usersCtrl.deleteUser)

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))