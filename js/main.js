 $(document).ready(function () {
    const enquiryText = "Hello, I would like to know more about donation options.";
    const UpSend = document.querySelector('.up_send');
    const encodedText = encodeURIComponent(enquiryText);
    const lazyImages = document.querySelectorAll('.lazy-img');
    const counters = document.querySelectorAll('.count');

    const receivedDate = new Date(2025,11,16).getTime();
    const LaunchDate = new Date(2025,10,8).getTime();
    const menu_icon_main = document.querySelector('.menu_icon');
    const menu_icon = document.querySelector('.menu_icon .open');
    const menu_icon_close = document.querySelector('.menu_icon .close');
    const nav_bar = document.querySelector('nav');
    const Slider_event = document.querySelector('#mission_stories');
    const images_all = document.querySelectorAll('.slider_landing img');
    const Cross_img =  document.querySelector('.image_convey');
    const TimeLineAnimate = document.querySelectorAll('.timeline-item .wrap');
    const TimeLineAnimate_items = document.querySelectorAll('.timeline-item.main');

    const whatsappLink = `https://wa.me/233553838464?text=${encodedText}`;
    document.getElementById('whatsappLink').href = whatsappLink;
    document.getElementById('whatsappLink_footer').href = whatsappLink;
    document.getElementById('whatsappLink_footer_2').href = whatsappLink;

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
            console.log('ksd');
            const targetId = card.getAttribute('data-spawn');
            document.querySelector(`.timeline-container#${targetId}`).classList.add('active');
            document.body.style.overflow = "hidden";
            console.log(targetId);
        }); 
    });



    const countDate = getNextChristmas();

    const timer = setInterval(function() {
        const now = new Date().getTime();
        const gap = countDate - now;

        // Math for time units
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        // Calculate
        const d = Math.floor(gap / day);
        const h = Math.floor((gap % day) / hour);
        const m = Math.floor((gap % hour) / minute);
        const s = Math.floor((gap % minute) / second);

        // Update DOM elements with leading zeros
        document.getElementById('days').innerText = d < 10 ? '0' + d : d;
        document.getElementById('hours').innerText = h < 10 ? '0' + h : h;
        document.getElementById('minutes').innerText = m < 10 ? '0' + m : m;
        document.getElementById('seconds').innerText = s < 10 ? '0' + s : s;

        // If timer ends
        if (gap < 0) {
            clearInterval(timer);
            document.querySelector('.timer-header').innerText = "Merry Christmas!";
            document.getElementById('countdown').style.display = "none";
        }
    }, 1000);
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
    const timeLineObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate_timeline');
            }else{
                entry.target.classList.remove('animate_timeline');
            }
    })
    }, { threshold: 0.5 });
    TimeLineAnimate.forEach(item => {
        timeLineObserver.observe(item);
    });
    TimeLineAnimate_items.forEach(item => {
        timeLineObserver.observe(item);
    });
    // Animate only when visible
    const observer_r = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            animateCount(entry.target);
            observer_r.unobserve(entry.target); // animate once
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
    observer_r.observe(counter);
    });




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
    // const Timer2 = setInterval(()=>{
    //     let distance = LaunchDate - (new Date().getTime());
    //     const days = Math.floor(distance / (1000*60*60*24));
    //     const hours = Math.floor((distance % (1000*60*60*24))  / (1000*60*60));
    //     const minutes = Math.floor((distance %(1000*60*60)) /(1000*60));
    //     const seconds = Math.floor((distance %(1000*60)) /1000);

    //     document.querySelector('.launch_pad.day span').innerText = `${timer_refiner(days)}`;
    //     document.querySelector('.launch_pad.hour span').innerText = `${timer_refiner(hours)}`;
    //     document.querySelector('.launch_pad.minute span').innerText = `${timer_refiner(minutes)}`;
    //     document.querySelector('.launch_pad.second span').innerText = `${timer_refiner(seconds)}`;
    // });

    window.addEventListener('scroll', function(e){
        if(window.scrollY > 100){
            UpSend.classList.add('active');
        }else{
            UpSend.classList.remove('active');
        }
    })
    UpSend.addEventListener('click',function(){
        console.log(window.scrollY);
        window.scrollTo({
            top:0,
            behavior:'smooth'
        });
    })
    menu_icon.addEventListener('click',function(){
        nav_bar.classList.add('active');
        menu_icon_main.classList.add('active');
        document.body.style.overflow = "hidden";
    });
    menu_icon_close.addEventListener('click',function(){
        nav_bar.classList.remove('active');
        menu_icon_main.classList.remove('active');
        document.body.style.overflow = "";
    });


    $('#slider_container_id').slick({
        slidesToShow: 1,
        autoplay: true,
        arrows:false,
        dots:false,
        autoplaySpeed: 10000,
        fade: false,           // no fade
    });
    setInterval(() => {
        images_all.forEach(element=>{
            if(element.classList.contains('slick-current')){
                
                    if(Cross_img.src != element.src){
                        Cross_img.classList.add('hide');
                        setTimeout(()=>{
                        Cross_img.src = element.src;
                        Cross_img.classList.remove('hide');
                    },0)
                    }
                
            }
        })
    }, 1000);

    var swiper = new Swiper(".swiper", {
        grabCursor: true,
        // centeredSlides: true,
        slidesPerView: "auto",
        initialSlide: 1,
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
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

    async function loadLanguage(lang = "en") {
        window.localStorage.setItem('language_request',lang);
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
    function getNextChristmas() {
        const now = new Date();
        const currentYear = now.getFullYear();
        const christmas = new Date(`December 25, ${currentYear} 00:00:00`);
        
        // If Christmas has passed this year, target next year
        if (now > christmas) {
            christmas.setFullYear(currentYear + 1);
        }
        return christmas.getTime();
    }

    function sharePage() {
        if (navigator.share) {
            navigator.share({
                title: "Working Together to Advance the Kingdom",
                text: "Here’s a glimpse of the impact we are making in communities across Ghana. Join us as we build, lift, and shine the light of Christ.",
                url: window.location.href
            });
        } else {
            alert('Sharing is not supported on this device.');
        }
    }

    AOS.init();
})