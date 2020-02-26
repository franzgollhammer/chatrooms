const express = require('express');
const router = express.Router();
const { checkUserExists } = require('./userHelper');

router.get('/:chatroom/:username', (req, res) => {
    const userData = {
        chatroom: req.params.chatroom,
        username: req.params.username
    }

    res.send(checkUserExists(userData))
})

module.exports = router;