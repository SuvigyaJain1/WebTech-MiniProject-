const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { Post } = require('../models/Post');
const { Group } = require('../models/Group');
const { User } = require('../models/User');
const mongoose = require('mongoose');

// ============================================
// req should contain following
// email: author's email
// content: content of post
// caption: caption of post
// group: group you want to post to
// ============================================
router.post("/createpost", auth, (req, res) => {
  //const now=new Date()
  const newPost = new Post({
    author: req.user,
    email: req.user.email,
    content: req.body.content,
    caption: req.body.caption,
    //timestamps:
  });
  newPost.save((err, obj) => {
    if (err) {
      res.status(400).json({'err':err.message});
    } else {
      Group.findOne({
        name: req.user.email + '-home'
      })
        .then(doc => {
          doc.posts.push(newPost._id)
          doc.save()
            .then(() => {
              res.status(200).json({
                message: "Done",
                post: obj
              })
            })
        })
        .catch(err => {
          res.status(400).json({ "err": err })
        })
    }
  });
});


// =====================================
// req should consist of the  group name for which the posts need to be fetched
// or the author email
//
router.post("/getposts", auth, (req, res) => {

  const name = req.body.email || req.user.email;
  var allPosts = []

  User.findOne({
    'email': name
  })
    .then(doc => {
      let groups = [name + '-home'];

      // if no email provided then find all posts by user as well as follower. Else only find users posts
      if (req.body.email === undefined) {
        User.find().where('_id').in(doc.followees).exec((err, records) => {
          if (err) {
            return res.status(400).json(err);
          }
          groups = groups.concat(records.map((x) => { return (x.email + '-home') }))
          Group.find().where('name').in(groups).exec((err, records) => {
            if (err) {
              return res.status(400).json(err);
            }
            for (record in records) {
              allPosts = allPosts.concat(records[record].posts)
            }
            Post.find().where('_id').in(allPosts).exec((err, postrecs) => {
              if (err) {
                throw err;
              }
              res.status(200).send(postrecs)
            });
          })
        })
      }
      else {
        Group.find().where('name').in(groups).exec((err, records) => {
          if (err) {
            return res.status(400).json(err);
          }
          for (record in records) {
            allPosts = allPosts.concat(records[record].posts)
          }
          Post.find().where('_id').in(allPosts).exec((err, postrecs) => {
            if (err) {
              throw err;
            }
            res.status(200).send(postrecs)
          });
        })
      }
    })
})
module.exports = router;
