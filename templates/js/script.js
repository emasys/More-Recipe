window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("floating-icon").style.display = "block";
    } else {
        document.getElementById("floating-icon").style.display = "none";
    }
}

$(document).ready(function() {
    $('.animate').bind('mouseenter click focus', function() {
        $(this).addClass('animated pulse');
    });

    $('.animate').bind('mouseleave', function() {
        $(this).removeClass('animated pulse');
    });

    $('.description').bind('mouseenter focus', function() {
        $(this).fadeTo(400, 1);
    });


    $('.description').on('mouseleave', function() {
        $(this).fadeTo(400, 0.0000000001);
    });

    

    $('#favorite').on('click', function() {
        $(this).toggleClass('fa-heart-o').toggleClass('fa-heart animated bounceIn flash red');
    });

    $('#like').on('click', function() {
        if($('#dislike').hasClass('animated')){
            $('#dislike').removeClass('fa-thumbs-down animated bounceIn flash blue').addClass('fa-thumbs-o-down');
        };
        $(this).toggleClass('fa-thumbs-o-up').toggleClass('fa-thumbs-up animated bounceIn flash blue');
    });

    $('#dislike').on('click', function() {
        if($('#like').hasClass('animated')){
            $('#like').removeClass('fa-thumbs-up animated bounceIn flash blue').addClass('fa-thumbs-o-up');
        }
        $(this).toggleClass('fa-thumbs-o-down').toggleClass('fa-thumbs-down animated bounceIn blue');
    });

$('#editable-select').editableSelect();

    $('.animate-catalog').scrolla({
        mobile: false,
        once: true
      });
});