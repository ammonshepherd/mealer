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

});

/* Create the drake object that allows the meals cards to be dropped onto day cards
* Options: copy = clone the meal card instead of moving the actual meal card
*          accepts = function to state that only the meals can be dragged, not the day cards
* on: waits for the drop, then calls the function to add the delete button to the meal card.
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
