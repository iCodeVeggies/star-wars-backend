# Star Wars Characters API

The Star Wars Characters API is a RESTful web service that provides information about characters from the Star Wars universe. It allows users to retrieve, create, update, and delete characters.

## Installation

To install the necessary dependencies, run the following command:

```bash
$ npm install
```

## Running the App

To start the development server, use the following command:

```bash
$ npm run start
```

The API will be accessible at `http://localhost:3000`.

## API Endpoints

### GET /characters

Retrieve a list of characters.

### GET /characters/:id

Retrieve information about a specific character based on its ID.

### POST /characters

Create a new character. Provide character information in the request body.

### PUT /characters/:id

Update information for a specific character based on its ID. Provide character information in the request body.

### DELETE /characters/:id

Delete a specific character based on its ID.

## Test

To run unit tests, use the following command:

```bash
$ npm run test
```

To generate test coverage report, use:

```bash
$ npm run test:cov
```

## Testing the API

You can test the Star Wars Characters API using tools like Postman or curl. Here's how:

### Using Postman

1. Download and install Postman from the [official website](https://www.postman.com/downloads/).

2. Open Postman and create a new request.

3. Set the request type (GET, POST, PUT, DELETE) and provide the request URL, e.g., `http://localhost:3000/characters`.

4. If required, add headers, query parameters, or request body data as needed for the specific endpoint.

5. Click the "Send" button to send the request and view the response.

### Using curl

You can also test the API using the command-line tool `curl`.

#### GET Request:

```bash
$ curl http://localhost:3000/characters
```

#### POST Request:

```bash
$ curl -X POST -H "Content-Type: application/json" -d '{"name":"Luke Skywalker","episodes":["NEWHOPE","EMPIRE","JEDI"],"planet":"Tatooine"}' http://localhost:3000/characters
```

#### PUT Request:

```bash
$ curl -X PUT -H "Content-Type: application/json" -d '{"name":"Luke Skywalker","episodes":["NEWHOPE","EMPIRE","JEDI"],"planet":"Tatooine"}' http://localhost:3000/characters/:id
```

#### DELETE Request:

```bash
$ curl -X DELETE http://localhost:3000/characters/:id
```

Make sure to replace `:id` with the ID of the character you want to update or delete.

Using these methods, you can interact with the API and verify that it behaves as expected. Happy testing!

## Author

Sylvester Klirowski (klirowski.s@gmail.com)

## License

The Star Wars Characters API is [MIT licensed](LICENSE). Feel free to use, modify, and distribute it as you see fit. May the force be with you!
