describe('Order API Routes', function() {
  
  beforeEach(function(done) {
    setTimeout(() => {
      done();
    }, 1000);
  });

  describe('GET /api/order/customer/49', function() {
    it('Fetch Customer Orders', function(done) {
      request.get('/api/order/customer/49')
        .expect(200)
        .end(function(err, res) {
          assert.isArray(res.body);
          expect(res.body[0]).to.have.property('orderId');
          expect(res.body[0]).to.have.property('custId');
          expect(res.body[0]).to.have.property('restId');
          done(err);
        });
    });
  });
});