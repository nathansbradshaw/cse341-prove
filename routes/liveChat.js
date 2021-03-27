const express = require('express')
const router = express.Router()

const users = ['admin'] // Dummy array for users

router.get('/', (req, res, next) => {
    res.render('pages/pr12-login', {
        pageTitle: 'Prove Activity 12',
        path: '/proveActivities/12'
    })
})

// Verify login submission to access chat room.
router.post('/login', (req, res, next) => {
    const username = req.body.data
    if (!username || username === '') {
        return res.status(400).send({ error: 'Username cannot be empty!' })
    }
    console.log(username)
    // Check if username already exists
    if (users.includes(username.trim())) {
        return res.status(409).send({ error: 'Username already exists!' })
    }
    // Add username to session and return success
    users.push(username.trim())
    req.session.user = username;
    res.status(200).send({username: username.trim() })

})

// Render chat screen.
router.get('/chat', (req, res, next) => {
    res.render('pages/pr12-chat', {
        pageTitle: 'Prove Activity 12',
        path: '/proveActivities/12',
        user: req.session.user
    })
})

module.exports = router
