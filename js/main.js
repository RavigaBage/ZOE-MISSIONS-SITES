 $(document).ready(function () {

    //encode whatsApp link
    const enquiryText = "Hello, I would like to know more about donation options.";

// URL-encode the text
const encodedText = encodeURIComponent(enquiryText);

// Create the WhatsApp link
const whatsappLink = `https://wa.me/233553838464?text=${encodedText}`;
document.getElementById('whatsappLink').href = whatsappLink;
document.getElementById('whatsappLink_footer').href = whatsappLink;
document.getElementById('whatsappLink_footer_2').href = whatsappLink;
  const counters = document.querySelectorAll('.count');

const animateCount = (counter) => {
  const target = +counter.getAttribute('data-target');
  let count = 0;

  const step = () => {
    // dynamic increment: bigger at start, smaller near target
    let increment = Math.ceil((target - count) / 10); // ease-out effect
    count += increment;

    if (count < target) {
      counter.innerText = count.toLocaleString();
      requestAnimationFrame(step);
    } else {
      counter.innerText = target.toLocaleString(); // ensure exact target
    }
  };

  step(); // start animation
};

  // Animate only when visible
  const observer_r = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.5 });

counters.forEach(counter => {
  observer_r.observe(counter);
});




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

            document.querySelectorAll("#closeHeaderBtn").forEach(btn => {
                btn.addEventListener("click", () => {
                    const targetId = btn.getAttribute('data-spawn');
                    document.querySelector(`.timeline-container#${targetId}`).classList.remove('active');
                    document.body.style.overflow = "";
                });
            });
            document.querySelectorAll(".involve-card .cta-btn").forEach(btn => {
                btn.addEventListener("click", () => {
                    btn.parentElement.parentElement.classList.toggle('focus');
                });
            });
            document.querySelectorAll(".btn_exec_summ").forEach(btn => {
                btn.addEventListener("click", () => {
                    btn.parentElement.parentElement.classList.toggle('focus');
                });
            });
            document.querySelectorAll('.stat-card').forEach(card => {
                card.addEventListener('click', () => {
                    const targetId = card.getAttribute('data-spawn');
                    document.querySelector(`.timeline-container#${targetId}`).classList.add('active');
                    document.body.style.overflow = "hidden";
                }); 
            });

        $('.linear-slider').slick({
            slidesToShow: 1,      // show one slide at a time
            slidesToScroll: 1,
            speed: 2000,           // transition speed
            autoplaySpeed: 0,      // delay between slides
            cssEase: 'linear',     // linear animation (continuous)
            arrows: true,         // hide navigation arrows
            pauseOnHover: false,   // continuous even on hover
            fade: false,           // no fade
        });
        document.querySelector('#select_language').addEventListener('change',(e)=> loadLanguage(e.target.value));
        async function loadLanguage(lang = "en") {
    try {
        const res = await fetch('js/language.json',
            {
                method: 'GET',
                cache: 'no-cache'
            }
        );
        if (!res.ok) return console.error("Language file not found");
        
        const data = await res.json();
        const langObj = data[lang]; // example: data["fr"], data["ar"], etc.

        if (!langObj) return console.error("Language not found in JSON");

        Object.entries(langObj).forEach(([key, value]) => {
            // check if a dom element has a class that matches the key
            const el = document.querySelector(`.${key}`);            
                if (el) {
                    el.classList.add('animate_x');
                    el.classList.add('hide');   
                    setTimeout(()=>{
                        if (value.includes("<") && value.includes(">")) {
                        el.innerHTML = value;
                        } else {
                            el.textContent = value;
                        }
                        el.classList.remove('hide'); 
                    },900)
                }
           

        });

    } catch (err) {
        console.error("Language loading error:", err);
    }
}


