describe("dizzyDancer", function() {

  var dizzyDancer;
  var timeBetweenSteps = 1000;
  var clock;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    dizzyDancer = new DizzyDancer(10, 20, timeBetweenSteps);
  });

  it("should have a jQuery $node object", function() {
    expect(dizzyDancer.$node).to.be.an.instanceof(jQuery);
  });

  it("should have a move function that increments its radial angle increment", function() {
    sinon.spy(dizzyDancer, 'move');
    dizzyDancer.move();
    expect(dizzyDancer.move.called).to.be.true;
  });

  describe("dances in a circle", function() {
    it("should call move function every second", function() {
      sinon.spy(dizzyDancer, "move");
      expect(dizzyDancer.move.callCount).to.be.equal(0);
      dizzyDancer.step();
      clock.tick(1000); // ? it seems an extra tick is necessary...
      expect(dizzyDancer.move.callCount).to.be.equal(2);

      clock.tick(1);
      expect(dizzyDancer.move.callCount).to.be.equal(3);
    });
  });
});
