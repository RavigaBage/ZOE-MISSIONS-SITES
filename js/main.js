 $(document).ready(function () {
            const lazyImages = document.querySelectorAll('.lazy-img');

            // Intersection Observer setup
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;   // set actual src
                    img.classList.add('loaded');
                    observer.unobserve(img);     // stop observing once loaded
                }
                });
            }, {
                rootMargin: "50px",   // preload just before it enters the view
                threshold: 0.1        // trigger when 10% is visible
            });

            lazyImages.forEach(img => {
                observer.observe(img);
            });
            AOS.init();
            var $slider = $('.recentSlider_main');

            let receivedDate = new Date(2025,11,16).getTime();
            let LaunchDate = new Date(2025,10,8).getTime();
            const menu_icon = document.querySelector('.menu_icon .open');
            const menu_icon_close = document.querySelector('.menu_icon .close');
            const nav_bar = document.querySelector('nav');
            function timer_refiner(num){
                if(num < 10){
                    value = '0'+ String(num);
                    num = value;
                }
                return num;
            }
            const Timer = setInterval(()=>{
                let distance = receivedDate - (new Date().getTime());
                const days = Math.floor(distance / (1000*60*60*24));
                const hours = Math.floor((distance % (1000*60*60*24))  / (1000*60*60));
                const minutes = Math.floor((distance %(1000*60*60)) /(1000*60));
                const seconds = Math.floor((distance %(1000*60)) /1000);

                document.querySelector('.days h1').innerHTML = `${timer_refiner(days)} <span>d</span>`;
                document.querySelector('.hr h1').innerHTML = `${timer_refiner(hours)} <span>h</span>`;
                document.querySelector('.min h1').innerHTML = `${timer_refiner(minutes)} <span>m</span>`;
                document.querySelector('.sec h1').innerHTML = `${timer_refiner(seconds)} <span>s</span>`;
            });
            const Timer2 = setInterval(()=>{
                let distance = LaunchDate - (new Date().getTime());
                const days = Math.floor(distance / (1000*60*60*24));
                const hours = Math.floor((distance % (1000*60*60*24))  / (1000*60*60));
                const minutes = Math.floor((distance %(1000*60*60)) /(1000*60));
                const seconds = Math.floor((distance %(1000*60)) /1000);

                document.querySelector('.launch_pad.day span').innerText = `${timer_refiner(days)}`;
                document.querySelector('.launch_pad.hour span').innerText = `${timer_refiner(hours)}`;
                document.querySelector('.launch_pad.minute span').innerText = `${timer_refiner(minutes)}`;
                document.querySelector('.launch_pad.second span').innerText = `${timer_refiner(seconds)}`;
            });

            menu_icon.addEventListener('click',function(){
                nav_bar.classList.add('active');
            });
            menu_icon_close.addEventListener('click',function(){
                nav_bar.classList.remove('active');
            });


            if ($slider.length) { 
                var cardCount = $slider.find('.card').length;
                var isLargeScreen = $(window).width() >= 1024;

                if (isLargeScreen && cardCount < 3) {
                // Check if Slick is initialized before unslicking
                    if ($slider.hasClass('slick-initialized')) {
                        $slider.slick('unslick'); 
                    }
                } else {
                    $slider.slick({
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        autoplay: true,
                        arrows: false,
                        dots: true,
                        infinite: true,
                        cssEase: 'linear', // Corrected typo
                        responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            infinite: true
                            }
                        },
                        {
                            breakpoint: 500,
                            settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: true
                            }
                        }
                        ]
                    });
                }
            } else {
                console.error('Slider element with class "recentSlider_main" not found.');
            }
            
            
            Slider_event = document.querySelector('#mission_stories');
                var $slider = $('#mission_stories');
                if ($slider.length) {
                    var cardCount = $slider.find('.card').length;
                    var isLargeScreen = $(window).width() >= 1024;
                    if (isLargeScreen && cardCount < 3) {
                    if ($slider.hasClass('slick-initialized')) {
                        $slider.slick('unslick'); 
                    }
                    } else {
                        $slider.slick({
                            slidesToShow: 3,
                            slidesToScroll: 2,
                            autoplay: true,
                            arrows: false,
                            dots: true,
                            infinity: true,
                            cssCase: true,
                            responsive: [{
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 3,
                                    infinity: true
                                }
                            }, {
                                breakpoint: 500,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    infinity: true
                                }


                            }]

                        });
                    }
            }else {
                console.error('Slider element with class  not found.');
            }

            var swiper = new Swiper(".swiper", {
                effect: "coverflow",
                grabCursor: true,
                // centeredSlides: true,
                slidesPerView: "auto",
                initialSlide: 1,
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2,
                    slideShadows: true
                },
                keyboard: {
                    enabled: true
                },
                // mousewheel: {
                //     thresholdDelta: 70
                // },
                spaceBetween: 60,
                loop: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                },
                autoplay:{
                    delay:9000,
                }
                });
            })