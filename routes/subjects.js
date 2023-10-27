const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const {authSub} = require('../config/manageroles')
const SpecificPost = require("../models/SpecificPost");
router.get('/:sub', ensureAuthenticated, authSub, async(req, res) => { 
    let subjects = ['mathematics', 'physics', 'economics', 'accountancy', 'geography', 'biology', 'chemistry', 'english']
    console.log(req.params.sub)
    if(subjects.includes(req.params.sub)){
        console.log('found')
        try{
            let posts = await SpecificPost.find();
            const x = posts
            res.render('subject', { user: req.user, data:x, subject:req.params.sub })
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.render('notfound')
    }
});

module.exports = router;