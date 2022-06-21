const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const ObjectId = require('mongoose').Types.ObjectId;

//get post delete put
//Base Path :http://localhost:3000/employee
//get api
router.get('/', (req, res) => {
    Employee.find((err, doc) => {
        if (err) {
            console.log('error in get data' + err);

        }
        else {
            res.send(doc);
        }
    })

});

// get by id 
router.get('/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        Employee.findById(req.params.id, (err, doc) => {
            if (err) {
                console.log('error in get  by id data' + err);

            }
            else {
                res.send(doc);
                console.log("get by id  api succesful");

            }
        });
    }
    else {
        return res.status(400).send('no record found with id' + req.params.id) 
    }

    

});

//Post api
router.post('/', (req, res) => {
    let emp = new Employee({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published
    });
    emp.save((err, doc) => {
        if (err) {
            console.log('error in post data' + err);

        }
        else {
            res.send(doc);

            console.log("post api succesful");

        }
    })
});
// put api
router.put('/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        let emp = {
            title: req.body.title,
            description: req.body.description,
            published: req.body.published
        };
        Employee.findByIdAndUpdate(req.params.id,{ $set: emp },{new: true},(err, doc) => {
            if (err) {
                console.log('error in update  by id data' + err);

            }
            else {
                res.send(doc);
                console.log("put api succesful");
            }
        });
    }
    else {
        return res.status(400).send('no record found with id' + req.params.id)
    }

    });
//delete api
router.delete('/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        Employee.findByIdAndRemove(req.params.id, (err, doc) => {
            if (err) {
                console.log('error in delete  by id api  data' + err);

            }
            else {
                res.send(doc);
                console.log("delete by id  api succesful");

            }
        });
    }



});

module.exports = router;

