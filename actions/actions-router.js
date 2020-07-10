const express = require('express');

const Actions = require('../data/helpers/actionModel')

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(error => {
            res.status(400).json({ errorMessage: "There was an error getting all actions." })
        })
})

router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(error => {
            res.status(400).json({ errorMessage: "There was an error getting action with specified id." })
        })
})

router.post('/', validateAction, (req, res) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(error => {
            res.status(400).json({ errorMessage: "There was an error inserting action" })
        })
})

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(error => {
            res.status(404).json({ errorMessage: "There was an error deleting project with specified id." })
        })
})

router.put('/:id', validateAction, (req, res) => {
    changes = req.body
    Actions.update(req.params.id, changes)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(error => {
            res.status(404).json({ errorMessage: "There was an error updating project with specified id." })
        })
})

function validateAction(req, res, next) {
    if(req.body.project_id && req.body.description && req.body.notes){
        next()
    } else {
        res.status(400).json({ errorMessage: "Please provide a valid action"} )
    }
}

module.exports = router;