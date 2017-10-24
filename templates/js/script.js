$(document).ready(function() {
    $('.animate').bind('mouseenter click focus', function() {
        $(this).addClass('animated pulse');
    });

    $('.animate').bind('mouseleave', function() {
        $(this).removeClass('animated pulse');
    });

    $('#favorite').bind('mouseenter click focus', function() {
        $(this).removeClass('fa-heart-o').addClass('fa-heart animated bounceIn flash red fa-3x');
    });

    $('#favorite').on('mouseleave', function() {
        $(this).removeClass('fa-heart animated bounceIn flash red fa-3x').addClass('fa-heart-o');
    });

    $('#like').bind('mouseenter click focus', function() {
        $(this).removeClass('fa-thumbs-o-up').addClass('fa-thumbs-up animated bounceIn flash blue');
    });

    $('#like').on('mouseleave', function() {
        $(this).removeClass('fa-thumbs-up animated bounceIn flash blue').addClass('fa-thumbs-o-up');
    });

    $('#dislike').bind('mouseenter click focus', function() {
        $(this).removeClass('fa-thumbs-o-down').addClass('fa-thumbs-down animated bounceIn blue');
    });

    $('#dislike').on('mouseleave', function() {
        $(this).removeClass('fa-thumbs-down animated bounceIn blue').addClass('fa-thumbs-o-down');
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
});