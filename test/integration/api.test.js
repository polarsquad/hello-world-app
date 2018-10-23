
import supertest from 'supertest';
import app from '../../src/app';

const request = supertest(app);

afterAll(() => app.close());

describe('/api/version', () => {
  describe('GET', () => {
    it('should return version', async () => {
      const { body } = await request.get('/api/version').expect(200);

      expect(body).toMatchSnapshot({
        commit: expect.any(String),
        tag: expect.any(String),
        hostIp: expect.any(String),
        namespace: expect.any(String),
        podName: expect.any(String),
        podUid: expect.any(String),
        startedAt: expect.any(String),
      });
    });
  });
});

describe('/api/healthy', () => {
  describe('GET', () => {
    it('should return ok', async () => {
      const { body } = await request.get('/api/healthy').expect(200);

      expect(body).toMatchSnapshot();
    });
  });
});
