describe('Credential API Routes', function() {
  
  beforeEach(function(done) {
    setTimeout(() => {
      done();
    }, 1000);
  });
  
  describe('POST /api/creds/sign-in', function() {
    it('sign in customer', function(done) {
      const body = { email: 'c1@ue.com', pwd: 'aws@12', accountRole: 'CUSTOMER' };
      const bodyWithoutPwd = { email: 'c1@ue.com', accountRole: 'CUSTOMER' };
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

  describe('POST /api/creds/sign-up', function() {
    it('sign up customer', function(done) {
      const body = { email: 'test5@ue.com', pwd: 'aws@12', accountRole: 'CUSTOMER', fullname: 'Test User One' };
      const bodyWithoutPwd = { email: 'test5@ue.com', accountRole: 'CUSTOMER', fullname: 'Test User One' };
      request.post('/api/creds/sign-up')
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