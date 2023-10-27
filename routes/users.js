const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport');
const User = require('../models/User');
const { update } = require('../models/User');
router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));

router.post('/register', (req, res) => {
    const { name, email, phy, math, accountancy, economics, english, chemistry, biology, geography, role, password, password2 } = req.body;
    let errors = []
    if(!name || !email || !password || !password2){
        errors.push({ msg: 'Please fill in all fields'});
    }
    if(password !== password2){
        errors.push({ msg: 'Passwords do not match' });
    }
    if(password.length < 6){
        errors.push({ msg: 'Password should be atleast 6 characters' });
    }
    if(math === undefined && phy === undefined && accountancy === undefined && economics === undefined && english === undefined && chemistry===undefined && biology === undefined && geography === undefined){
        errors.push({ msg: 'Select atleast one subject' });
    }
    if(errors.length > 0){
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
        User.findOne({ email:email })
        .then(user => {
            if(user){
                errors.push({ msg: 'Email is already registered' })
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2,
            });
        }else{
            let subjects = []
            if(math === "on"){
                subjects.push("mathematics")
            }
            if(phy === "on"){
                subjects.push("physics")
            }
            if(accountancy === "on"){
                subjects.push("accountancy")
            }
            if(economics === "on"){
                subjects.push("economics")
            }
            if(english === "on"){
                subjects.push("english")
            }
            if(chemistry === "on"){
                subjects.push("chemistry")
            }
            if(biology === "on"){
                subjects.push("biology")
            }
            if(geography === "on"){
                subjects.push("geography")
            }
            const newUser = new User({
                name,
                email,
                password,
                subjects,
                role
            });
            bcrypt.genSalt(10, (err, salt) => 
            bcrypt.hash(newUser.password, salt, (err, hash) =>{
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                .then(user => {
                    req.flash('success_msg', 'You are now registered. Login to continue');
                    res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            }))
        }
    });
}
});

router.post('/login', (req, res, next) =>{
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
      })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login')
});

router.post('/updprofile', async(req,res) => {
    const { name, email, phy, math, accountancy, economics, english, chemistry, biology, geography, role } = req.body;
    let errors = []
    if(!name){
        errors.push('Please enter your name')
    }
    if(math === undefined && phy === undefined && accountancy === undefined && economics === undefined && english === undefined && chemistry===undefined && biology === undefined && geography === undefined){
        errors.push({ msg: 'Select atleast one subject' });
    }
    let subjects = []
        if(math === "on"){
            subjects.push("mathematics")
        }
        if(phy === "on"){
            subjects.push("physics")
        }
        if(accountancy === "on"){
            subjects.push("accountancy")
        }
        if(economics === "on"){
            subjects.push("economics")
        }
        if(english === "on"){
            subjects.push("english")
        }
        if(chemistry === "on"){
            subjects.push("chemistry")
        }
        if(biology === "on"){
            subjects.push("biology")
        }
        if(geography === "on"){
            subjects.push("geography")
        }
    if(errors.length > 0){
        res.render('updateprofile', {
            user: req.user,
            errors,
            name,
            email,
            subjects
        })}
    else{
        const updated = await User.updateOne(  {email: req.body.email} , { $set: { name:name, subjects:subjects, role: role } })
        res.redirect('/profile')
    }
        
    
})

module.exports = router;