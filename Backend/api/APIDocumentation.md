# Note 
This documentation will be out of date from 10/12/2021 and will no longer be updated.
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
`http://foo.com/api/get_all_message/`

Sample:

Javascript:

```js
import axios from "axios";

axios
  .get("http://foo.com/api/get_all_message")
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

response = requests.get("http://foo.com/api/get_all_message")

# Write your code here...
random_function()
# ...
```

### Create user endpoint - POST

This endpoint will create a new user with the given username and password and will be stored in the database.

URL:
`http://foo.com/api/sign_up`

Sample:

Javascript:

```js
import axios from "axios";

axios
  .post("http://foo.com/api/sign_up", {
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

Python:

```py
import requests

response = requests.get("http://foo.com/api/sign_up")

#Write your code here:
random_function()
#...
```

### Get all user endpoint - GET

This endpoint is used to retrieve all user information from the database in mongodb.

NOTE: PLEASE NOTE THAT THIS ENDPOINT MUST NOT BE SHARED TO ANY OTHER PEOPLE BECAUSE ALL USER INFORMATION CAN BE LEAKED TO PUBLIC TO INSURE PRIVACY TO USERS.

URL:
`http://foo.com/get_all_users/`

Sample:

Javascript:

```js
import axios from "axios";

axios
  .get("http://foo.com/api/get_all_users")
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

response = requests.get("http://foo.com/api/get_all_users")

# Write your code here:
random_function()
#...
```

### Login endpoint - POST

This endpoint is used to authenticate the user with the provided inputs from the user.

URL:
`http://foo.com/api/login/`

Sample:

Javascript:

```js
import axios from "axios";

axios
  .post("http://foo.com/api/login", {
    user: "[USERNAME]",
    password: "[PASSWORD]",
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

Python:

NO CODE SAMPLES

### Find user endpoint - GET

This endpoint will return if the user does exist.

URL:
`http://foo.com/api/get_user/<USERNAME>/`

Sample:

Javascript:

```js
import axios from "axios";

axios
  .get("http://foo.com/api/get_user/<USERNAME>")
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

response = requests.get("http://foo.com/api/get_user/<USERNAME>")

# Write your code here:
random_function()
#...
```

### Block user endpoint - PUT

This is a simple put endpoint that can be used to block users in the chat room, this endpoint will fire off the function to modify the status of "blocked" element in the database.

Sample:

```js
import axios from "axios";

axios
  .put("http://foo.com/api/block_user", {
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

Python:

NO CODE SAMPLE

NOTE: THIS ENDPOINT CAN BE BUGGY AND HAVE ISSUES.

# Conclusion / Final thoughts

Thanks for reading this documentation, I will be writing new features in this api soon. And I will also be working on the documentation samples in python and other programming languages. Thanks for reading

#

API / documentation created by Alvin Cheng (Brother and sister software)
