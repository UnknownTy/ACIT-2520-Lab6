const express = require("express");
const session = require("express-session")
const router = express.Router();
const {isAdmin} = require("../middleware/checkAuth")

router.get('/', isAdmin, (req, res) => { 
    const allSessions = req.sessionStore.sessions
    res.render("admin", {
        sessions: allSessions, 
        user: req.user
    });
});

router.post('/', (req, res) => {
    const allSessions = req.sessionStore.sessions
    Object.keys(allSessions).forEach(key => {
        if (key === (req.body.sess)){
            delete allSessions[key]
        }
    });
    res.redirect("/admin")
})


module.exports = router