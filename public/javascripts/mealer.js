function getDaysList() {
  var today = new Date();

  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var daysList = new Array();
  // 0 = list days starting with today
  // 1 = list days starting with tomorrow
  var d = 0;
  // the number here determins how many days to show
  while (d < 18) {
    var dday = new Date(today);
    dday.setDate(today.getDate()+d);
    dday.setHours(17,30);

    daysList.push({"name": days[dday.getDay()], "datum": dday}); 
    d++;
  }

  return daysList;
}

$( document ).ready(function() {

  $.getJSON("./recipies.json")
    .done(function(json) {
      json.results.forEach(function(recipe) {
        const mealHTML = `
            <div class='meal card horizontal orange lighten-5'>
              <div class="card-image">
                <img class="meal-image" src="`+ json.baseUri + recipe.image +`">
              </div>
              <div class="card-stacked">
                <div class="card-content">
                  <span class='meal-title'>`+ recipe.title +`</span> 
                </div> 
              </div>
          </div>`;
        $("#meals").append(mealHTML);
      });
    })
    .fail(function(data, textStatus, error){
      var err = textStatus + ", " + error;
      console.log("Request failed: " + err);
    });

  var dayJSON = getDaysList();
  dayJSON.forEach(function(day) {
    const dayHTML = `
      <div class="row">
        <div class="card" id="`+ day.name.toLowerCase() +`-card">
          <div class="card-content">`+ day.datum +`
            <div class="day" id="`+ day.name.toLowerCase() +`"></div>
          </div>
        </div>
      </div>
      `;
    $("#week").append(dayHTML); 
  });

});


// Make sure all of this gets called very last, or else it can't detect the
// dynamically created day cards.
window.onload = function() {

  /* 
  * Create the object that allows the meals cards to be dropped onto day cards 
  * Options: 
  * copy = clone the meal card instead of moving the actual meal card
  * accepts = function to state that only the meals can be dragged, not the day
  *           cards 
  * on: waits for the drop, then calls the function to add the delete button to
  *     the meal card.
  */
  var drake = dragula(
    [
      document.getElementById("sunday"), 
      document.getElementById("monday"), 
      document.getElementById("tuesday"),
      document.getElementById("wednesday"),
      document.getElementById("thursday"), 
      document.getElementById("friday"), 
      document.getElementById("saturday"), 
      document.getElementById("meals")
    ], {
      copy: function(el, source){
        return source === document.getElementById("meals");
      },
      accepts: function(el, target, source, sibling){
        return target !== document.getElementById("meals");
      }
  }).on('drop', addDeleteMealButton);

  function addDeleteMealButton(el, to, from) {
    // Only add the delete button if it is not already there.
    if (el.querySelector(".delete-meal-card") === null) {
      el.insertAdjacentHTML('beforeend', '<div class="card-action delete-meal"><i class="material-icons delete-meal-card red-text" onclick="this.parentNode.parentNode.remove()">delete</i></div>');
    }
  }

  // Allow window to scroll when dragging a meal card
  var scroll = autoScroll([ 
      window,
      document.querySelector('#week'), document.querySelector('#recipes') 
    ],{
      margin: 20,
      autoScroll: function() {
        return this.down && drake.dragging;
      }
  });
}
