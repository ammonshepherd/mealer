$( document ).ready(function() {

  $.getJSON("./recipies.json")
    .done(function(json) {
      json.results.forEach(function(recipe) {
        const mealHTML = `
            <div class='meal card horizontal'>
              <div class="card-image">
                <img class="meal-image" src="`+ json.baseUri + recipe.image +`">
              </div>
              <div class="card-content">
                <span class='meal-title truncate'>`+ recipe.title +`</span> 
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

dragula([document.getElementById("sunday"), document.getElementById("monday"), document.getElementById("tuesday"),document.getElementById("wednesday"),document.getElementById("thursday"), document.getElementById("friday"), document.getElementById("saturday"), document.getElementById("meals")], {
  copy: true,
  accepts: function(el, target, source, sibling){
    return target !== document.getElementById("meals");
  }
});
