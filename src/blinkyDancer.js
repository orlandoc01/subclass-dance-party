var BlinkyDancer = class BlinkyDancer extends Dancer {
  step() {
    // call the old version of step at the beginning of any call to this new version of step
    super.step();
    // toggle() is a jQuery method to show/hide the <span> tag.
    // See http://api.jquery.com/category/effects/ for this and
    // other effects you can use on a jQuery-wrapped html tag.
    this.$node.toggle();
  }
}
