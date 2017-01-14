$(document).ready(function() {
    
    
    $( "#header_dropdown_button" ).click( function() {
        $("#header_dropdown_row").toggleClass("hide");
        $(".header-nav-bar").toggleClass("square-bottoms");
    });
});

