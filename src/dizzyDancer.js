var DizzyDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
 
  this.radius = 50;
  this.angle = 0;
  // this.oldStep = DizzyDancer.step;
};

DizzyDancer.prototype = Object.create(Dancer.prototype);

DizzyDancer.prototype.constructor = DizzyDancer;

DizzyDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  //
  console.log(this.angle);
  var thiz = this;
  this.angle += .05;
  var newX = Math.floor(this.left + this.radius * Math.cos(this.angle));
  var newY = Math.floor(this.top + this.radius * Math.sin(this.angle));
  this.$node.animate({top: newY, left: newX}, 1, function() {
    thiz.step();
  });

  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
};

