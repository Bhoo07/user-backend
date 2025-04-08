import * as chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const { expect } = chai;

describe('GET /users/', () => {
  it('should fetch all users from the API', (done) => {
    chai
      .request('http://localhost:5000')
      .get('/users/')
      .end((err, res) => {
        if (err) return done(err);

        try {
          expect(res).to.have.status(200);
          expect(res.body.status).to.be.true;
          expect(res.body.data).to.be.an('array');
          console.log('Success: /users/ API test passed.');
          done();
        } catch (assertionError) {
          // Pass the error to Mocha without logging success
          done(assertionError);
        }
      });
  });
});
