$(document).ready(function() {
    $('.animate').bind('mouseenter click focus', function() {
        $(this).addClass('animated pulse');
    });

    $('.animate').bind('mouseleave', function() {
        $(this).removeClass('animated pulse');
    });

    
    

    $('#favorite').on('click', function() {
        $(this).toggleClass('fa-heart-o').toggleClass('fa-heart animated bounceIn flash red fa-3x');
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


    $('body').fadeTo(1, 0);
    $('body').fadeTo(1000, 1);
    $('.slides').slick({
        dots: false,
        infinite: true,
        speed: 300,
        autoplay: true,
        autoplaySpeed: 3000,
        arrow: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }

        ]
    });

    $('.animate-catalog').scrolla({
        mobile: false,
        once: true
      });
});