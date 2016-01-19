$(document).ready(function() {
  window.dancers = [];

  $(".addDancerButton").on("click", function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );
    
    dancer.$node.on('mouseover', function() {
      console.log('hello');
      //var thiz = this;
      //$(thiz).delay(2000).fadeOut(1, function() {
        //$(thiz).addClass('flipped').show().animate({ left: 1600 + "px" , top : 2370 + "px"}, 5000, 'linear');
      //});
      $(this).clearQueue();
      $(this).toggle('explode');
      window.dancers = window.dancers.filter( function(dancerinList) { 
        return dancerinList !== dancer;
      });
    });

    $('body').append(dancer.$node);
    window.dancers.push(dancer);
  });

  $(".lineUpButton").on("click", function() {
    //Line up dancers in dancersArray
    var increment = Math.floor(70 / (window.dancers.length / 2 + 1));
    // var increment = Math.floor(window.dancers.length/2); 
    var x = ['33%', '66%'];
    window.dancers.forEach(function(dancer, index) {
    console.log(' process: ' + dancer.processID);
    dancer.$node.clearQueue();
    clearTimeout(dancer.processID);
    dancer.$node.stop();
    dancer.$node.animate(
    {top: (100 - increment * (index + 1) + '%'), 
    left:x[index % 2]}, 'slow');
    });
  });


  $(".danceAroundButton").on("click", function() {
    window.dancers.forEach(function(dancer, index){
      dancer.$node.animate({top: dancer.top, left:dancer.left}, 'slow');
      dancer.step();
    });

  });
});
