# Chill&chat API documentation

Welcome to the Chill&chat API documentation, here you can learn more about the chill&chat api. Where I will cover every endpoint in this API. and I will also have samples on how to use this api in your application with javascript.
# License

Please note this API is licensed under the MIT license. please find the LICENSE file for more information.

(c) copyright 2021-2022 Alvin Cheng
# Endpoints:

### Websocket

This api includes a websocket in the backend, to allow easy communication to clients, and to send real time messages between different ends. In the client, send the message to the server by using the "message" event in the client websocket with SocketIO, the server will send the message to all clients connected and store a message history in MongoDB.

Sample:

```js
const socketName = io("http://foo.com");

socketName.on("message", (data) => {
  //Write your code here:
  randomFunction();
  //...
});
```

Please note: PLEASE NOTE THAT CURRENTLY WE CANNOT FIND A WAY TO INTERACT WITH THE WEBSOCKET IN OTHER LANGUAGES.

### Get all message endpoint - GET

This endpoint will return all messages in the message history which is stored in the database on MongoDB, in this format:
```
{
id: "123abc",
user: "John smith",
content: "Hello world!",
}
```

URL:
``` http://foo.com/api/messages/get```

Sample:

Javascript:
```js
import axios from "axios";

axios
  .get("http://foo.com/api/messages/get")
  .then((data) => {
    //Write your code here:
    randomFunction();
    //...
  })
  .catch((err) => {
    //Error handling:
  });
```

Python:
```py
import requests

response = requests.get("http://foo.com/api/messages/get")

# Write your code here...
random_function()
# ...
```

### Create user endpoint - POST

This endpoint will create a new user with the given username and password and will be stored in the database.

Sample:

```js
import axios from "axios";

axios
  .post("http://foo.com/api/users/post/create", {
    id: "xxxx",
    username: "John smith",
    password: "password1234",
    blocked: false,
    onDeleteList: false,
  })
  .then((data) => {
    //Write your code here:
    randomFunction();
    //...
  })
  .catch((err) => {
    //Error handling:
  });
```

### Get all user endpoint - GET

This endpoint is used to retrieve all user information from the database in mongodb.

NOTE: PLEASE NOTE THAT THIS ENDPOINT MUST NOT BE SHARED TO ANY OTHER PEOPLE BECAUSE ALL USER INFORMATION CAN BE LEAKED TO PUBLIC TO INSURE PRIVACY TO USERS.

Sample:

```js
import axios from "axios";

axios
  .get("http://foo.com/api/users/get/all")
  .then((data) => {
    //Write your code here:
    randomFunction();
    //...
  })
  .catch((err) => {
    //Error handling:
  });
```

### Login endpoint - GET

This endpoint is used to authenticate the user with the provided inputs from the user.

Sample:

```js
import axios from "axios";

axios
  .get("http://foo.com/api/users/get/<USERNAME>/<PASSWORD>")
  .then((data) => {
    //Write your code here:
    randomFunction();
    //...
  })
  .catch((err) => {
    //Error handling:
  });
```

### Find user endpoint - GET

This endpoint will return if the user does exist.

Sample:

```js
import axios from "axios";

axios
  .get("http://foo.com/api/users/get/<USERNAME>")
  .then((data) => {
    //Write your code here:
    randomFunction();
    //...
  })
  .catch((err) => {
    //Error handling:
  });
```

### Block user endpoint - PUT

This is a simple put endpoint that can be used to block users in the chat room, this endpoint will fire off the function to modify the status of "blocked" element in the database.

Sample:

```js
import axios from "axios";

axios
  .put("http://foo.com/api/users/block/", {
    user: "John smith",
    blockedStatus: true,
  })
  .then((data) => {
    //Write your code here:
    randomFunction();
    //...
  })
  .catch((err) => {
    //Error handling:
  });
```

# Conclusion / Final thoughts

Thanks for reading this documentation, I will be writing new features in this api soon. And I will also be working on the documentation samples in python and other programming languages. Thanks for reading

#

API / documentation created by Alvin Cheng (Brother and sister software)