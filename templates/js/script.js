$(document).ready(function() {
    $('body').fadeTo(1, 0);
    $('body').fadeTo(1000, 1);
    $('.animate').bind('mouseenter click focus', function() {
        $(this).addClass('animated pulse');
    });

    $('.animate').bind('mouseleave', function() {
        $(this).removeClass('animated pulse');
    });

    $('.description').bind('mouseenter focus', function() {
        $(this).addClass('animated fadeInUp');
    });

    $('.description').on('mouseleave', function() {
        $(this).removeClass('animated fadeInUp')
    });

    

    // let now = 0;
    // let int = self.setInterval("changeBG()", 1000);
    // let imgSrc = ["../img/bannerBg.fw.png", "../img/bannerBg.fw.png", "../img/bannerBg.fw.png", ];

    // const changeBG = () => {
    //     //array of backgrounds
    //     now = (now+1) % array.length ;
    //     $('.header').css('color','yellow');
    // }
    

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


   
    // $('.slides').slick({
    //     dots: false,
    //     infinite: true,
    //     speed: 300,
    //     autoplay: true,
    //     autoplaySpeed: 3000,
    //     arrow: false,
    //     slidesToShow: 5,
    //     slidesToScroll: 1,
    //     responsive: [{
    //             breakpoint: 1024,
    //             settings: {
    //                 slidesToShow: 3,
    //                 slidesToScroll: 1,
    //                 infinite: false,
    //                 dots: false
    //             }
    //         },
    //         {
    //             breakpoint: 600,
    //             settings: {
    //                 slidesToShow: 3,
    //                 slidesToScroll: 1
    //             }
    //         },
    //         {
    //             breakpoint: 480,
    //             settings: {
    //                 slidesToShow: 2,
    //                 slidesToScroll: 1
    //             }
    //         }

    //     ]
    // });

    $('.animate-catalog').scrolla({
        mobile: false,
        once: true
      });
});