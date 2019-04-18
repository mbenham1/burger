
$(function () {
    $(".devour").on("click", function (event) {

        var id = $(this).data("id");
        var isDevoured = {
            devoured: true
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: isDevoured
        }).then(
            function () {
                location.reload();
            }
        );

    });

    $(".create-form").on("submit", function (event) {

        event.preventDefault();

        var newBurger = {
            name: $("#burger").val().trim(),
            devoured: false
        };

        $.ajax("/api/burgers/", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                location.reload();
            }
        );
    });

    $(".delete").on("click", function(event) {

        var id = $(this).data("id");
    
        $.ajax("/api/burgers/" + id, {
          type: "DELETE"
        }).then(
          function() {
            location.reload();
          }
        );
      });
})