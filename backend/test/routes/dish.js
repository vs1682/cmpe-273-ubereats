describe('Dish API Routes', function() {
  
  beforeEach(function(done) {
    setTimeout(() => {
      done();
    }, 1000);
  });
  
  describe('POST /api/dish/create', function() {
    it('Create Dish', function(done) {
      const dishDetails = {
        category: 2,
        description: "The Italian B.M.T.® sandwich is filled with Genoa salami, spicy pepperoni, and Black Forest Ham. Big. Meaty. Tasty. Get it.",
        imageUrl: null,
        ingredients: "VEggies",
        name: "Italian B.M.T.® Footlong Regular Sub",
        price: "10",
        restId: 51,
        type: 1
      };

      request.post('/api/dish/create')
        .send(dishDetails)
        .expect(200)
        .end(function(err, res) {
          expect(res.body).to.have.property('id');
          done(err);
        });
    });
  });
});