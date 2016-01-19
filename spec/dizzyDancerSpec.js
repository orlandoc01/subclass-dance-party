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

  it("should have an angle property to trace out circular path", function() {

    expect('angle' in dizzyDancer).to.be.true;
  });

  it("should have a radius property", function() {
    expect('radius' in dizzyDancer).to.be.true;
  });


  
});
