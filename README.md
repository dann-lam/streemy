# Streemy - Your Stream Aggregator
Streemy is an application that aggregates streams from different platforms, allowing users to track their favorite streamers easily. It provides features such as displaying online and offline streamers and the ability to favorite streamers.

## Table of Contents
Instructions
Usage
Features
Contributing

## Instructions
In order to install, run npm install.
Seed your database, schema can be found in schema/dbj.
DB can be seeded with npm run seed.

## Usage
This application is simple to use! Simply login to Streemy and start adding your favorite streamers. The interface allows you to see the online/offline status of your streamers and navigate directly to their streams.


USABLE LOGIN NAMES:
-----------------------
user1@example.com : password123

user2@example.com : password123

user#@example.com : password123

#'s go up until 6.


## Features
User Cards
Streemy uses User Cards to represent streamers. Each User Card displays the streamer's name, platform, and favorite status. Users can click on a card to go directly to the streamer's stream.

The addUserCard function in index.js is used to create a User Card. It takes a user object as an argument, which represents a streamer. The user object should have the following properties:

name: The name of the streamer.
user_streamer: An object representing the streamer's platform and status.
is_online: The online status of the streamer.
The User Card also has a 'favorite' button that users can click to favorite/unfavorite the streamer. This functionality is handled within the addUserCard function.

A similar function, addUserCardFavorite, is used to add a User Card to the user's list of favorite streamers.

## Streamer Status
Streemy allows users to filter streamers based on their online/offline status. This is handled by event listeners attached to the 'Online' and 'Offline' buttons. When a button is clicked, an HTTP GET request is made to the /online or /offline endpoint, respectively. The response, which contains an array of streamers with the specified status, is then used to populate the User Cards.

## Favorites
Users can favorite streamers by clicking the 'favorite' button on a User Card. The favorited streamers are stored and can be viewed by clicking the 'Favorites' button.

## Authentication
Streemy also includes a basic authentication system. Users can log in or sign up for an account.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the terms of the MIT license.
