$(document).ready(function() {
  window.dancers = [];
  var removeDancer = false;
  var danceImages = ['url("peanut.gif")', 'url("pink.gif")',
                    'url("purple.gif")', 'url("green.gif")'];
  var danceImageIndex = 0;
  var pairDancers = function (dancer1, dancer2) { 
    //arrange dancer 1 and dancer 2
    clearTimeout(dancer2.processID);
    clearTimeout(dancer1.processID);
    dancer1.$node.clearQueue();
    dancer2.$node.clearQueue();
    dancer2.$node.animate( {top: dancer1.top, left: dancer1.left + 100}, 'slow');    
  };

  $('.topbar').find('a').on('mouseenter', function() {
    $(this).addClass('highlighted');
  });
  
  $('.topbar').find('a').on('mouseleave', function() {
    $(this).removeClass('highlighted');
  });



  $(".explodeDancer").on("click", function(event){
    if(removeDancer === false) {
      removeDancer = true;
      $(this).html("Explode Dancer: On");
    } else {
      removeDancer = false;
      $(this).html("Explode Dancer: Off");
    }
  });

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
      $("body").height() * (Math.random() * 0.55 + 0.2) ,
      $("body").width() * (Math.random() * 0.8 + 0.05),
      Math.random() * 3000
    );
    dancer.$node.css(
      {'background-image': danceImages[danceImageIndex++ % 4]});
    dancer.$node.on('mouseover', function() {
      if(removeDancer) {
        $(this).clearQueue();
        clearTimeout(dancer.processID);
        $(this).toggle('explode');
        window.dancers = window.dancers.filter( function(dancerinList) { 
          return dancerinList !== dancer;
        });
      }
    });

    $('body').append(dancer.$node);
    window.dancers.push(dancer);
  });

  $(".lineUpButton").on("click", function() {
    //Line up dancers in dancersArray
    var dy = (50 / (Math.ceil(window.dancers.length / 2)));
    var dx = (15 / (Math.ceil(window.dancers.length / 2)));
    // var increment = Math.floor(window.dancers.length/2); 
    window.dancers.forEach(function(dancer, index) {
      dancer.$node.clearQueue();
      clearTimeout(dancer.processID);
      dancer.$node.stop();
      var newLeft;
      if (index % 2) {
        newLeft = 33 - dx * (Math.floor(index/2));
      } else {
        newLeft = 56 + dx * (Math.floor(index/2));
      }
        dancer.$node.animate(
        {top: 30 + dy * (Math.floor(index/2)) + '%', 
        'left': newLeft + '%'}, 'slow');
    });
  });



  $(".findPartnerButton").on("click", function() {
    var dancersCopy = window.dancers.slice();
    var matchAndArrange = function(dancer1, list) {
      if(list.length === 0) {
        return;
      } else if(list.length === 1) {
        dancer2 = list[0];
        //arrange dancer 1 and dancer 2
        pairDancers(dancer1 ,dancer2);
      } else {
        dancer2 = list.reduce( function(lastDancer, currDancer) {
          var sqDistLast = Math.pow((lastDancer.top - dancer1.top), 2) + Math.pow((lastDancer.left - dancer1.left), 2);
          var sqDistCurr = Math.pow((currDancer.top - dancer1.top), 2) + Math.pow((currDancer.left - dancer1.left), 2);
          if (sqDistCurr < sqDistLast) {
            return currDancer;
          } else {
            return lastDancer;
          }
        });
        //arrange dancer 1 and dancer2
        pairDancers(dancer1 ,dancer2);

        //remove dancer 2
        list = list.filter( (dancerinList) => dancer2 !== dancerinList);
        //pop and store to dancer 1
        dancer1 = list.pop();
        matchAndArrange(dancer1, list);
      }
    };
    matchAndArrange(dancersCopy.pop(), dancersCopy);
  });


  $(".danceAroundButton").on("click", function() {
    window.dancers.forEach(function(dancer, index){
      dancer.$node.animate({top: dancer.top, left:dancer.left}, 'slow');
      dancer.step();
    });

  });
});
