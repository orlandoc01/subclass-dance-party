var ShuffleDancer = class ShuffleDancer extends Dancer {
  constructor(top, left, timeBetweenSteps) {
    super(top,left,timeBetweenSteps);
    this.stepCSSLeft = {left: this.left - 50};
    this.stepCSSRight = {left: this.left + 50};
  }

  step() { 
    var thiz = this;
    this.$node.animate(this.stepCSSLeft, 'slow');
    this.$node.animate(this.stepCSSRight, 'slow');

    this.processID = setTimeout(function() {
    thiz.step();
    }, 1000);
  }
}