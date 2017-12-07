// window.onscroll = function() {
//   scrollFunction();
// };

// function scrollFunction() {
//   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//     document.getElementById('floating-icon').style.display = 'block';
//   } else {
//     document.getElementById('floating-icon').style.display = 'none';
//   }
// }

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
});
