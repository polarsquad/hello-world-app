
import supertest from 'supertest';
import app from '../../../src/app';

const request = supertest(app);

afterAll(() => app.close());

describe('/api/version', () => {
  describe('GET', () => {
    it('should return ok', async () => {
      const { body } = await request.get('/api/version').expect(200)

      expect(body).toMatchSnapshot();
    });
  });
});
