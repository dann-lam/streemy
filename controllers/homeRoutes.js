const router = require('express').Router();
const { User, Streamer, Platform } = require('../models');
const withAuth = require('../utils/auth');
const path = require('path');


router.get('/online', withAuth, async (req, res) => {
    try {
        const streamerData = await Streamer.findAll({
            where: {
              online: true
            }
          });
      const streamers = streamerData.map((streamer) => streamer.get({ plain: true }));
  
      res.sendFile(path.join(__dirname, '../public/index.html'));
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/offline', withAuth, async (req, res) => {
    try {
        const streamerData = await Streamer.findAll({
            where: {
              online: false
            }
          });
      const streamers = streamerData.map((streamer) => streamer.get({ plain: true }));
  
      res.sendFile(path.join(__dirname, '../public/index.html'));
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/favorites', withAuth, async (req, res) => {
    try {
        const streamerData = await Streamer.findAll({
            where: {
              favorite: true
            }
          });
      const streamers = streamerData.map((streamer) => streamer.get({ plain: true }));
  
      res.sendFile(path.join(__dirname, '../public/index.html'));
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/login', (req, res) => {
    // If a session exists, redirect the request to the homepage
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.sendFile(path.join(__dirname, '../public/login.html'));
  });


module.exports = router;
