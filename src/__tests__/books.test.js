const request = require('supertest');

const db = require('../util/mongo');
const server = require('../routes/base_router');

describe('Books API', () => {
  beforeAll(async () => {
    await db.connectToDB();
  });

  afterAll(async () => {
    await db.disconnectFromDB();
  });

  describe('GET /api/books', () => {
    test('Response status 200', async () => {
      const response = await request(server).get('/api/books');
      expect(response.statusCode).toBe(200);
    });

    test('Pagination limit', async () => {
      const response = await request(server).get('/api/books/?limit=2');
      expect(Object.keys(response.body).length).toBe(2);
    });
  });

  describe('POST /api/books', () => {

    test('Valid book get correctly posted', async () => {
      const response = await request(server)
        .post('/api/books')
        .send({
          title: 'Valid book!',
          author: 'Its author!',
          releaseDate: new Date('January 1, 2001'),
          rating: '2.75'})
        .expect(201); // Expect response status 201

      expect(response.body).toMatchObject({
        title: 'Valid book!',
        author: 'Its author!'}); // Expect response body to have a copy of the data sent as the request

      expect(new Date(response.body.releaseDate).valueOf()).toBe(new Date('January 1, 2001').valueOf()); // Expect the date to be set correctly
    });

    test('Book with missing data don\'t get posted', async () => {
      const response = await request(server)
        .post('/api/books')
        .send({
          title: 'Invalid book',
          releaseDate: new Date('January 1, 2001'),
          rating: '2.0'})
        .expect(400); // Expect response status to be 400

        expect(response.body).toStrictEqual({error: 'Data missing!'}); // Check if the correct error object is sent
    });

    test('Book with blank data don\'t get posted', async () => {
      const response = await request(server)
        .post('/api/books')
        .send({
          title: '',
          author: 'Author name',
          releaseDate: new Date('January 1, 2001'),
          rating: '1.0'})
        .expect(400); // Expect response status to be 400

        expect(response.body).toStrictEqual({error: 'Data missing!'}); // Check if the correct error object is sent
    });

    test('Book with invalid release date don\'t get posted', async () => {
      const response = await request(server)
        .post('/api/books')
        .send({
          title: 'Invalid book',
          author: 'Its author',
          releaseDate: 'Surely not a date',
          rating: '1.5'})
        .expect(400); // Expect response status to be 400

        expect(response.body).toStrictEqual({error: 'Invalid release date!'}); // Check if the correct error object is sent
    });
  });

  describe('PUT /api/books', () => {
    const expected1 = {
      id: 1,
      title: 'The Case of Charles Dexter Ward',
      author: 'Great writer'};

    const expected2 = {
      id: 1,
      title: 'The Case of Charles Dexter Ward',
      author: 'H. P. Lovecraft'};

    test('Book data can be edited', async () => {
      var putResponse = await request(server)
        .put('/api/books/1')
        .send({author: 'Great writer'})
        .expect(200);

      expect(putResponse.body).toMatchObject(expected1); // Check if the edited object was sent correctly

      var getResponse = await request(server) // GET request to the edited book
        .get('/api/books/1')
        .expect(200);

      expect(getResponse.body).toMatchObject(expected1); // Check if the book data is the expected

      putResponse = await request(server) // Change again the book data
        .put('/api/books/1')
        .send({author: 'H. P. Lovecraft'})
        .expect(200);

      expect(putResponse.body).toMatchObject(expected2); // Check if the edited object was sent correctly

      getResponse = await request(server) // GET request to the edited book
        .get('/api/books/1')
        .expect(200);

      expect(getResponse.body).toMatchObject(expected2); // Check if the book was really edited
    });

    test('Book data won\'t change with a put request with only blank properties', async () => {
      const response = await request(server)
        .put('/api/books/1')
        .send({author: ''})
        .expect(200);

      expect(response.body).toMatchObject(expected2); // Check if the data wasn't changed
    });

    test('Put request can\'t be made to no specific id', async () => {
      await request(server)
        .put('/api/books')
        .send({author: 'Author name'})
        .expect(404); // Expect error status code
    });
  });

  describe('DELETE latest book', () => {
    test('Books can be deleted', async () => {
      const getLastBook = await request(server).get('/api/books/latest'); // Request the last book to get its id
      const lastId = getLastBook.body.id; // If everything is correct, the deleted book will be the one inserted in the post method test
      await request(server).delete(`/api/books/${lastId}`).expect(200); // Expect status 200 from delete request
      await request(server).get(`/api/books/${lastId}`).expect(404); // Expect the book to not be found after deletion
    });

    test('Delete request can\'t be made to no specific id', async () => {
      await request(server)
        .delete('/api/books')
        .expect(404); // Expect error status code
    });

    test('Delete request can\'t be made to an inexistent id', async () => {
      await request(server)
        .delete('/api/books/0') // The first book inserted into the database receives id = 1, so there is no book with id = 0
        .expect(404); // Expect error status code
    });
  });

});
