const express = require('express');
const xss = require('xss');
const NotesService = require('./notes-service');

const notesRouter = express.Router();
const jsonParser = express.json();

const serializeNote = (note) => ({
  id: note.id,
  name: xss(note.name),
  modified: note.modified,
  folder_id: note.folder_id,
  content: xss(note.content),
});

notesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    NotesService.getAllNotes(knexInstance)
      .then((notes) => {
        res.json(notes.map(serializeNote));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const newNote = {
      name: req.body.name,
    };
    if (!newNote.name) {
      return res.status(400).send('Name required');
    }
    if (!newNote.content) {
      return res.status(400).send('Content required');
    }

    NotesService.insertNote(req.app.get('db'), newNote)
      .then((note) => {
        res.status(201).json(serializeNote(note));
      })
      .catch(next);
  });

notesRouter.route('/:id').delete((req, res, next) => {
  const knexInstance = req.app.get('db');
  NotesService.deleteNote(knexInstance, req.params.id);
});

module.exports = notesRouter;
