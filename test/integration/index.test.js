
import supertest from 'supertest';
import app from '../../src/app';

const request = supertest(app);

afterAll(() => app.close());

describe('/', () => {
  describe('GET', () => {
    it('should return page', async () => {
      const { body } = await request.get('/').expect(200);

      expect(body).toMatchSnapshot();
    });
  });
});
