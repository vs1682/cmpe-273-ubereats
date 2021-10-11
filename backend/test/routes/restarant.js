describe('Restaurant API Routes', function() {
  
  beforeEach(function(done) {
    setTimeout(() => {
      done();
    }, 1000);
  });

  describe('POST /api/creds/sign-in', function() {
    it('sign in restaurant', function(done) {
      const body = { email: 'testrest1@ue.com', pwd: 'aws@12', accountRole: 'RESTAURANT' };
      const bodyWithoutPwd = { email: 'testrest1@ue.com', accountRole: 'RESTAURANT' };
      request.post('/api/creds/sign-in')
        .send(body)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.have.property('token');
          expect(res.body).to.have.include(bodyWithoutPwd);
          done(err);
        });
    });
  });
});