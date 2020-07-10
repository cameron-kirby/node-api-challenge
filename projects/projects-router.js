const express = require('express');

const Projects = require('../data/helpers/projectModel')

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            res.status(400).json({ errorMessage: "There was an error getting projects." })
        })
})

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            res.status(400).json({ errorMessage: "There was an error getting project with specified id." })
        })
})

router.post('/', validatePost, (req, res) => {
    const name = req.body.name
    const description = req.body.description
    Projects.insert({ name, description })
        .then(project => {
            res.status(201).json(project)
        })
        .catch(error => {
            res.status(400).json({ errorMessage: "There was an error inserting project" })
        })
})

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            res.status(404).json({ errorMessage: "There was an error deleting project with specified id." })
        })
})

router.put('/:id', validatePost, (req, res) => {
    changes = req.body
    Projects.update(req.params.id, changes)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            res.status(404).json({ errorMessage: "There was an error updating project with specified id." })
        })
})

function validatePost(req, res, next) {
    if(req.body.name && req.body.description){
        next()
    } else {
        res.status(400).json({ errorMessage: "Please provide a valid post"} )
    }
}

module.exports = router;
