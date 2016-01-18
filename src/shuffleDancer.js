var ShuffleDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
  this.stepCSSLeft = {left: '-50px'};
  this.stepCSSRight = {left: '+50px'};
};

ShuffleDancer.prototype = Object.create(Dancer.prototype);

ShuffleDancer.prototype.constructor = ShuffleDancer;

ShuffleDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  //
  Dancer.prototype.step.call(this);
  


  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  this.$node.animate(this.stepCSSLeft, 'slow');
  this.$node.animate(this.stepCSSRight, 'slow');
};