$(document).ready(function() {
    $d = '#slide';
    $($d).slick({
        dots:true,
        lazyLoad: 'ondemand', 
       infinite: true,
       autoplay: true,
       nextArrow : '<button class="small ArrowsNext"><i class="fas fa-angle-right"></i></button>',
          prevArrow : '<button class="small ArrowsPrev"><i class="fas fa-angle-left"></i></button>',  
    });
})