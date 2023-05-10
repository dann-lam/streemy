const { Streamer } = require('../models');

const streamerData = [
    {
        name: 'streamer1',
        streamer_url: 'http://google.com',
        platform_id: 1
      },
      {
        name: 'streamer2',
        streamer_url: 'http://google.com',
        platform_id: 2
      },
      {
        name: 'streamer3',
        streamer_url: 'http://google.com',
        platform_id: 3
      },
      {
        name: 'streamer4',
        streamer_url: 'http://google.com',
        platform_id: 4
      },
      {
        name: 'streamer5',
        streamer_url: 'http://google.com',
        platform_id: 5
      },
      {
        name: 'streamer6',
        streamer_url: 'http://google.com',
        platform_id: 1
      },
      {
        name: 'streamer7',
        streamer_url: 'http://google.com',
        platform_id: 2
      },
      {
        name: 'streamer8',
        streamer_url: 'http://google.com',
        platform_id: 3
      },
      {
        name: 'streamer9',
        streamer_url: 'http://google.com',
        platform_id: 4
      }
  ];




const seedStreamer = () => Streamer.bulkCreate(streamerData);

module.exports = seedStreamer;