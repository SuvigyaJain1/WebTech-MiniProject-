const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Group } = require("../models/Group");
const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    })
});

router.post("/register", (req, res) => {

    const user = new User(req.body);
    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        const home = new Group({
            name: user.email + '-home',
            members: [user._id], // add members as followers join
            createdBy: user._id,
        });
        const profile = new Group({
            name: user.email + '-profile',
            members: [user._id], // don't add members. Only user can post to their profile
            createdBy: user._id
        })
        home.save((err) => {
            if (err) return res.json({ success: false, err });
            user.groups.push(home._id)
            user.save()
                .then(() => {
                    profile.save(err => {
                        if (err) return res.json({ success: false, err });
                        user.groups.push(profile._id)
                        user.save()
                            .then(() => {
                                return res.status(200).json({
                                    success: true
                                });
                            })
                    })

                })
        })

    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id, user: user.token
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});


router.post("/addfollower", auth, (req, res) => {
    User.findOne({ 'email': req.body.follower_email }, (err, followee) => {
        const id = followee._id;
        if (err) return res.status(400).json({ err: err.message })
        User.findById({ _id: req.user._id }, (err, doc) => {
            if (err) return res.status(400).json({ err: err.message })
            doc.followees.push(id);
            doc.save()
                .then((err) => {

                    followee.followers.push(doc._id)
                    followee.save()
                        .then((err) => {
                            // if (err) return res.status(400).json(err);
                            return res.status(200).json({
                                success: req.body.follower_email
                            })
                        })
                })
        })
    })
})

router.post("/removefollower", (req, res) => {
    User.findOne({ _id: req.user._id }, (err, doc) => {

        if (err) return res.status(400).json({ err: err.message })

        doc.followers.pull(req.body.follower_id);
        doc.save()
            .then(() => {
                return res.status(200).json({
                    success: req.body.follower_email
                })
            })


    })
})


router.post("/subscribe", (req, res) => {
    User.findOne({ email: req.body.email }, (err, doc) => {

        if (err) return res.status(400).json({ err: err.message })

        doc.groups.push(req.body.group_id);
        doc.save()
            .then(() => {
                return res.status(200).json({
                    success: req.body.group_id
                })
            })

    })
})

router.post("/unsubscribe", (req, res) => {
    User.findOne({ email: req.body.email }, (err, doc) => {

        if (err) return res.status(400).json({ err: err.message })

        doc.groups.pull(req.body.group_id);
        doc.save()
            .then(() => {
                return res.status(200).json({
                    success: req.body.group_id
                })
            })

    })
})





router.post("/userdataemail", auth, (req, res) => {
    const userEmail = req.body.email;

    if (userEmail === null) {
        return res.json(req.user);
    }
    User.findOne({ email: userEmail }, (err, doc) => {
        if (err) {
            return res.json({ err: err.message });
        }
        res.json(doc);
    })
});



router.get("/userdata/:id", auth, (req, res) => {
    const id = req.params.id
    User.findById(id, (err, doc) => {
        if (err) {
            return res.json({ err: err.message });
        }
        res.json(doc);
    })
});
module.exports = router;
