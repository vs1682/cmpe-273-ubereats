describe('Restaurant API Routes', function() {
  
  beforeEach(function(done) {
    setTimeout(() => {
      done();
    }, 1000);
  });

  let restaurant = {};

  describe('POST /api/creds/sign-in', function() {
    it('sign in restaurant', function(done) {
      const body = { email: 'testrest1@ue.com', pwd: 'aws@12', accountRole: 'RESTAURANT' };
      const bodyWithoutPwd = { email: 'testrest1@ue.com', accountRole: 'RESTAURANT' };
      request.post('/api/creds/sign-in')
        .send(body)
        .expect(200)
        .end(function(err, res) {
          restaurant = res.body;
          expect(res.body).to.have.property('token');
          expect(res.body).to.have.include(bodyWithoutPwd);
          done(err);
        });
    });

    it('update restaurant profile' + restaurant.credId, function(done) {
      const body = {
        credId: restaurant.credId,
        name: 'Test Restaurant One',
        description: 'This spot is one of the 3 most popular spots for American takeout in all of San Jose. At this evening go-to, the Little Cheeseburger is one of the most ordered items on the menu and the Bacon Cheeseburger and the Milkshake are two of the items most commonly ordered together. • $ • American • Burgers',
        phone: '8787878787',
        location: '172 Sunol Street, San Jose, CA 95126'
      };
      request.put(`/api/restaurant/profile/${restaurant.credId}`)
        .send(body)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.have.include(body);
          done(err);
        });
    });
  });
});