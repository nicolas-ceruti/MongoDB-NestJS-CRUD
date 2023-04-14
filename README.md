# BACK-END ASSIGNMENT | Nicolaas Ceruti

## Getting Started
The following instructions will help you get a copy of this project up and running on your local machine. You will be able to test it as Production or Development mode.

## Requirements
You need to install the following technologies and run them locally:

 - https://nodejs.org/en/download/ - Node.js
 - https://www.mongodb.com/try/download/community - MongoDB
 - https://www.rabbitmq.com/download.html - RabbitMQ
 
* For MongodB you can use its Atlas service so you don't have to install it on your machine. Atlas Service: https://www.mongodb.com/atlas/database.

## Download and Installation
 - Downloading the .zip file, you already have all the necessary files in the root folder so you can move along.

 - Open the '.env' file and follow the instructions in it.

 - After setting up your environment variables, run ```npm install``` to install all dependencies.
 
 - ```npm runx start:dev ``` will start up the application using a nest.js script, running on port 3000. 3
 
 * After this, you can starting sending request or running tests.
 
## API Resources
You can use an http client to send requests to this application, such as Insomnia or Postman.

### Endpoints
1. POST /api/users <br/>
On the request store the user entry in db. After the creation, send an email and rabbit event. Both can be dummy sending (no consumer needed).
2. GET /api/user/{userId}  <br/>
Retrieves data from https://reqres.in/api/users/{userId} and returns a user in JSON representation.
3. GET /api/user/{userId}/avatar  <br/>
Retrieves image by 'avatar' URL.
On the first request it should save the image as a plain file, stored as a mongodb entry with userId and hash. Return its base64-encoded representation.
On following requests should return the previously saved file in base64-encoded. representation (retrieve from db).
4. DELETE /api/user/{userId}/avatar  <br/>
Removes the file from the FileSystem storage.
Removes the stored entry from db.

## Test
These test files have been designed to ensure that the code and its functionalities are working effectively and reliably.

* The Unit Test files for each code file can be found right next to it, in the same directory

To run the tests, just run:
```
npm run test
```
PS.: To be able to join the project on time, I couldn't write many tests, but I assure you that everything is working according to the project documents
