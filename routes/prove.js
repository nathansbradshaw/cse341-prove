const express = require('express');
const router = express.Router();

// Path to your JSON file, although it can be hardcoded in this file.
const dummyData = require('../data/ta10-data.json')

router.get('/prove', (req, res, next) => {
    res.render('prove/prove10', {
        pageTitle: 'Prove 10',
        path: 'prove/prove10',
    });
});

router.get('/prove/fetchAll', (req, res, next)=> {
    res.json(dummyData);
});

router.post('/prove/insert', (req, res, next) => {
    /************************************************
     * INSERT YOUR WEB ENDPOINT CODE HERE
     ************************************************/
    if (req.body.newAvenger !== undefined) {
        const newAvenger = req.body.newAvenger
        if (dummyData.avengers.find(element => element.name === newAvenger) === undefined) {
            dummyData.avengers.push({ name: newAvenger})
            res.sendStatus(200)
        }
    } else {
        console.log("not found")
        res.sendStatus(400)
    }
});



module.exports = router;