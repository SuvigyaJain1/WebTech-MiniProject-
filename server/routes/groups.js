//editor.formatOnSave
const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

router.get("/search/:email", auth, (req, res) => {
    const email = req.params.email;


    User.findOne({ email: email }, (err, doc) => {
        if (err) {
            res.status(400).json({"err":err.message});
        } else {
            if (doc && doc.email !== req.user.email) {
                res.json({ message: true, user: doc });
            } else {
                res.json({ message: false });
            }
        }
    });
});

module.exports = router;
