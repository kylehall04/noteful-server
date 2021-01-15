const express = require('express');
const xss = require('xss');
const FoldersService = require('./folders-service');

const foldersRouter = express.Router();
const jsonParser = express.json();

const serializeFolder = (folder) => ({
  id: folder.id,
  name: xss(folder.name),
});

foldersRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    FoldersService.getAllFolders(knexInstance)
      .then((folders) => {
        res.json(folders.map(serializeFolder));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const newFolder = {
      name: req.body.name,
    };
    if (!newFolder.name) {
      return res.status(400).send('Name required');
    }

    FoldersService.insertFolder(req.app.get('db'), newFolder)
      .then((folder) => {
        res.status(201).json(serializeFolder(folder));
      })
      .catch(next);
  });

module.exports = foldersRouter;
