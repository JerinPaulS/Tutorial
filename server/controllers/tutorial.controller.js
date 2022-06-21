const db = require("../models");
const Tutorial = db.tutorials;
// Create and Save a new Tutorial
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({ message: "content cant be empty" });
        return;
    }
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });
    tutorial.save(tutorial).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "error while creating"
            });
        });
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Tutorial.find(condition).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "error while creating"
            });
        });
        
};
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Tutorial.findById(id).then(data => {
        if (!data)
            res.status(404).send({ message: "not found by id" + id });
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "error while finding"
            });
        });

};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(404).send({ message: "data to update cant be empty" });

    }
    const id = req.params.id;
    Tutorial.findByIdAndUpdate(id, req.body, { userFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({ message: "not found by id" + id });
    }
        else {
            res.send({ message: "tutorial was updated succesfully" });
        }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "error while finding"
            });
        });

};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Tutorial.findByIdAndRemove(id, { userFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({ message: "not delete by id" + id });
        }
        else {
            res.send({ message: "tutorial was deleted succesfully" });
        }
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "error while deleting"
            });
        });

};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({}).then(data => {
        res.send({
            message: '${data.deletedCount} deleted succesucfully'
        });

    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "error while deletinging"
            });
        });

};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.find({ published: true }).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "error while finding"
            });
        });

};