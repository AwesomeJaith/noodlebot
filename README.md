# noodlebot

noodlebot is a Discord bot that shows you the difference between between the original message and the edited message when a Discord message is edited.

# Demo

https://github.com/user-attachments/assets/26ee3a46-9a2b-473e-9145-f5e7fb99de95

## Getting Started

To get noodlebot up and running, follow these simple steps.

### Prerequisites
* node.js
* docker desktop

### Installation

1. Clone the repo
   ```sh
     git clone https://github.com/AwesomeJaith/noodlebot.git
   ```
2. Create a .env file following the .env.example file. There are further details on how you can get the necessary .env variables required to run the application.
3. Create a docker image and start the container (Windows)
   ```sh
      docker-compose up --build
   ```

## Motivation

As a Discord moderator, it can be challenging at times to see the difference between messages on Discord. So, I created this Difference bot to help me find the changes in messages more easily.

## Notes

I would be interested in expanding upon this application and improving the code in the future. Some things I would add are:
* A SQL database that saves different channel and guild ids so the bot can serve multiple servers instead of just one
* A website dashboard to see the message edits and other analytics
* Fun activities such as economy slash commands

## Contributing

noodlebot is an open-source project and we welcome contributions from the community.

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are welcome.

## License

MIT License

Copyright (c) 2024 Jaith Darrah

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
