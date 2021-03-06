var DizzyDancer = class DizzyDancer extends Dancer {
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
  constructor(top, left, timeBetweenSteps) {
    super(top,left,timeBetweenSteps);  
    this.radius = 50;
    this.angle = 0;
  }
  // this.oldStep = DizzyDancer.step;
  step() {
    // call the old version of step at the beginning of any call to this new version of step
    //
    var thiz = this;
    this.angle += .05;
    var newX = Math.floor(this.left + this.radius * Math.cos(this.angle));
    var newY = Math.floor(this.top + this.radius * Math.sin(this.angle));
    this.$node.css({top: newY, left: newX});
    this.processID = setTimeout(function(){
      thiz.step();
    }, 10);
    
  }

  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
}

