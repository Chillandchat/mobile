## Chill&chat API documentation

# Introduction

Welcome to the Chill&chat documentation, here you can learn more about the chill&chat api. where I will cover every endpoint in this API.

# License

Please note this code is licensed under the MIT license. please find the LICENSE file for more information.

(c) copyright 2021-2022 Alvin Cheng

# Websocket in backend

This api includes a websocket in the backend, to allow easy communication to clients to send real time messages between different ends. In the client, send the message to the server by using the "message" event in the client websocket with SocketIO, The server will send the message to all clients connected.
