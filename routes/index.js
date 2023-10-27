const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const {authMentor} = require('../config/manageroles')
const SpecificPost = require("../models/SpecificPost");
const Post = require("../models/Post");

router.get('/', (req, res) => res.render('dashboard', { user: req.user }));
router.get('/map', (req, res) => res.render('map'));
router.get('/plastic', (req, res) => res.render('plastic'));
router.get('/marine', (req, res) => res.render('marine'));
router.get('/oilspill', (req, res) => res.render('oilspill'));
router.get('/about', (req, res) => res.render('about'));
router.get('/posts/create', ensureAuthenticated, (req, res) => res.render('create', { user: req.user }));

router.get('/profile', ensureAuthenticated, async(req, res) =>{ 
    try{
        let posts = await SpecificPost.find();
        const x = posts
        let general = await Post.find();
        const y = general
        res.render('profile', { user: req.user, data:x.concat(y)})
    }catch(err){
        res.status(500).json(err);
    }
});
router.get('/createcontent', ensureAuthenticated, authMentor, (req, res) => res.render('createcontent', {user: req.user}))
router.get('/updateprofile', ensureAuthenticated, (req, res) => res.render('updateprofile', { user: req.user }))
router.get('/accessdenied', (req, res) => res.render('accessdenied'))
module.exports = router;




