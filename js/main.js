//Global Variables
var carouselIndex = 0;
var repos = [
                { name:"derekherbert.github.io", img:"portfolio.png",     indexPage:"/play", overlay:"Portfolio"                  },
                { name:"TicTacToe",              img:"bamboo_temple.jpg", indexPage:"/play", overlay:"Tic Tac Toe"                }, //1st visible repo 
                { name:"JAG",                    img:"jag.png",           indexPage:"/play", overlay:"Java Application for GMail" }, //2nd visible repo
                { name:"TravelACDZ",             img:"acdz.png",          indexPage:"/play", overlay:"Travel ACDZ Android App"    }, //3rd visible repo
                { name:"derekherbert.github.io", img:"portfolio.png",     indexPage:"/play", overlay:"Portfolio"                  }, //4rd visible repo
                { name:"BambooTempleBookStore",  img:"bamboo_temple.jpg", indexPage:"/play", overlay:"Bamboo Temple eBook Store"  },
                { name:"JAG",                    img:"jag.png",           indexPage:"/play", overlay:"Java Application for GMail" },
                { name:"TravelACDZ",             img:"acdz.png",          indexPage:"/play", overlay:"Travel ACDZ Android App"    },
                { name:"TravelACDZ",             img:"acdz.png",          indexPage:"/play", overlay:"Travel ACDZ Android App"    }
                
            ];
var imgPath = './images/';
var githubPath = 'https://github.com/derekherbert/';
var websitePath = 'https://derekherbert.github.io/';

//Event Listeners
$(document).ready(function() { 
    prepareCarousel(); 
    $('#carousel-left button').click(function() { carouselLeft(); });
    $('#carousel-right button').click(function() { carouselRight(); });
    $('.overlay').click(function(e) { repoCollapse(e); });
    $('.overlay').hover(function() 
        {
            $(this).css('opacity', 1);
        }, 
        function() {
            $(this).css('opacity', 0);
        }
    );
});    



$( "#header_dropdown_button" ).click( function() {
    $("#header_dropdown_row").toggleClass("hide");
    $(".header-nav-bar").toggleClass("square-bottoms");
});

function prepareCarousel() 
{
    $('.overlay-container').each(function(index) { updateRepo($(this), index); });
    $(repos).each(function(index) 
        {
            (index < 4) ? $('#carousel-index').append('<span class="active-bullet">&bull;</span>') 
                        : $('#carousel-index').append('<span>&bull;</span>');
        }
    );
}

function updateRepo(repo, index)
{
    repo.find('img').attr('src', imgPath + repos[index].img);
    //repo.find('a').attr('href', githubPath + repos[index].name);
    repo.find('.overlay-text').text(repos[index].overlay);
    repo.attr('repoIndex', index);
}

function updateCarouselIndex() 
{
    var visibleOverlays = $($('.overlay-container').slice(1, 5));
    var bullets = $('#carousel-index span');

    bullets.removeClass('active-bullet');

    visibleOverlays.each(function() 
        {
            var repoIndex = (parseInt($(this).attr('repoIndex')));
            (repoIndex == 0) ? $(bullets[bullets.length - 1]).addClass('active-bullet') : $(bullets[repoIndex - 1]).addClass('active-bullet');
        }
    );
}

function carouselRight() 
{
    var allOverlays = $('.overlay-container');
    var activeOverlays = $(allOverlays.slice(1, 6)); //Only the last 5 overlays have animations
    var invisibleRightOverlay = $(activeOverlays[4]);
    var colWidth = invisibleRightOverlay.parent().css('width');

    //Disable carousel-right button until animation finishes
    $('#carousel-right button').prop('disabled', true);

    //Disable overlay:hover animation until carousel animation finishes
    $(allOverlays[5]).hover(function() { $(this).css('opacity', 0); });

    //Fade in the invisible item on the right of the carousel
    invisibleRightOverlay.removeClass('visibility-hidden');
    invisibleRightOverlay.fadeOut(0); //Fade it out so it can be faded in
    invisibleRightOverlay.fadeIn(500);

    //Fade out the last visible item on the left of the carousel
    $(activeOverlays[0]).fadeOut(500);

    //Carousel left animation
    activeOverlays.animate( { left: '-' + colWidth }, { duration: 1000, queue: false }, 'swing', function(){} );

    //Carousel rotation animation 
    activeOverlays.animateRotate(0, -15, 500, 'swing', function() //Swing counter-clockwise 15 degrees
        {
            activeOverlays.animateRotate(-15, 0, 500, 'swing');   //Swing clockwise 15 degrees (back to normal)
        }
    );

    //Move animated elements back to their original position and update DOM
    setTimeout(function() 
        {
            //Reset the activeOverlays to their original positions
            activeOverlays.css('left', '');

            //Fade out the right-most repo instantly
            $(activeOverlays[4]).addClass('visibility-hidden');

            //Fade in the left-most visible repo instantly
            $(activeOverlays[0]).fadeIn(0);
                                    
            //Update each icon with new repo[repoIndex] to match what the animation did
            allOverlays.each(function() 
                {
                    var repoIndex = parseInt($(this).attr('repoIndex'));
                    (repoIndex == (repos.length - 1)) ? updateRepo($(this), 0) : updateRepo($(this), repoIndex + 1);
                }
            );

            //Enable carousel-right button now that the animation is finished
            $('#carousel-right button').prop('disabled', false);

            //Update carousel index to match animation
            updateCarouselIndex();

        }, 1025); //Starts 25ms after the carousel animation completes

    //Avoid any glitchy hover effects during the carousel animation
    setTimeout(function() 
        {
            //Enable overlay:hover animation now that the carousel animation is finished
            $(allOverlays[5]).hover(function() 
                {
                    $(this).css('opacity', 1); //Hover enter
                }, 
                function() {
                    $(this).css('opacity', 0); //Hover leave
                }
            );

        }, 1450); //Starts 450ms after the carousel animation completes
}

function carouselLeft() 
{
    var allOverlays = $('.overlay-container');
    var activeOverlays = $(allOverlays.slice(0, 5)); //Only the first 5 overlays have animations
    var invisibleLeftOverlay = $(activeOverlays[0]);
    var colWidth = invisibleLeftOverlay.parent().css('width');

    //Disable carousel-left button until animation finishes
    $('#carousel-left button').prop('disabled', true);

    //Disable overlay:hover animation until carousel animation finishes
    $(allOverlays[0]).hover(function() { $(this).css('opacity', 0); });

    //Fade in the invisible item on the left of the carousel
    invisibleLeftOverlay.removeClass('visibility-hidden');
    invisibleLeftOverlay.fadeOut(0); //Fade it out so it can be faded in
    invisibleLeftOverlay.fadeIn(500);

    //Fade out the last visible item on the right of the carousel
    $(activeOverlays[4]).fadeOut(500);

    //Carousel left animation
    activeOverlays.animate( { left: colWidth }, { duration: 1000, queue: false }, 'swing', function(){} );

    //Carousel rotation animation 
    activeOverlays.animateRotate(0, 15, 500, 'swing', function() //Swing clockwise 15 degrees
        {
            activeOverlays.animateRotate(15, 0, 500, 'swing');   //Swing counter-clockwise 15 degrees (back to normal)
        }
    );

    //Move animated elements back to their original position and update DOM
    setTimeout(function() 
        {
            //Reset the activeOverlays to their original positions
            activeOverlays.css('left', '');

            //Fade out the left-most repo instantly
            $(activeOverlays[0]).addClass('visibility-hidden');

            //Fade in the right-most visible repo instantly
            $(activeOverlays[4]).fadeIn(0);
                                    
            //Update each repo visually to match the animation
            allOverlays.each(function() 
                {
                    var repoIndex = parseInt($(this).attr('repoIndex'));
                    (repoIndex == 0) ? updateRepo($(this), (repos.length - 1)) : updateRepo($(this), repoIndex - 1);
                }
            );

            //Enable carousel-left button now that the animation is finished
            $('#carousel-left button').prop('disabled', false);

            //Update carousel index to match animation
            updateCarouselIndex();

        }, 1025); //Starts 25ms after the carousel animation completes
    
    //Avoid any glitchy hover effects during the carousel animation
    setTimeout(function() 
        {
            //Enable overlay:hover animation now that the carousel animation is finished    
            $(allOverlays[0]).hover(function() 
                {
                    $(this).css('opacity', 1); //Hover enter
                }, 
                function() {
                    $(this).css('opacity', 0); //Hover leave
                }
            );

        }, 1450); //Starts 450ms after the carousel animation completes
}

function repoCollapse(e) 
{
    var repo = repos[parseInt($(e.target).closest('.overlay').parent().attr('repoIndex'))];
    $('#repo-collapse').collapse("show");
    $('#repo-iframe').attr('src', websitePath + repo.name + repo.indexPage);
    
   // setTimeout(function() 
    //    {
            var iframeBody = $(document.getElementById('repo-iframe').contentWindow).find('body');
            var height = parseInt(iframeBody.css('height'));

            //Set the height of the iframe to match its content's height
            alert('new iframe actual height: ' + height);
            $('#repo-iframe').css('height', (height + 10) + 'px');
    //    }, 1000);
}

$.fn.animateRotate = function(startAngle, endAngle, duration, easing, complete) {
    var args = $.speed(duration, easing, complete);
    var step = args.step;
    return this.each(function(i, e) {
      args.complete = $.proxy(args.complete, e);
      args.step = function(now) {
        $.style(e, 'transform', 'rotate(' + now + 'deg)');
        if (step) return step.apply(e, arguments);
      };
  
      $({deg: startAngle}).animate({deg: endAngle}, args);
    });
};