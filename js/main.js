$(document).ready(function () {

    const enquiryText = "Hello, I would like to know more about donation options.";
    const encodedText = encodeURIComponent(enquiryText);
    const whatsappLink = `https://wa.me/233553838464?text=${encodedText}`;
    const UpSend = document.querySelector('.up_send');
    const counters = document.querySelectorAll('.count');
    const menu_icon_main = document.querySelector('.menu_icon');
    const menu_icon = document.querySelector('.menu_icon .open');
    const menu_icon_close = document.querySelector('.menu_icon .close');
    const nav_bar = document.querySelector('nav');
    const images_all = document.querySelectorAll('.slider_landing img');
    const Cross_img = document.querySelector('.image_convey');
    const TimeLineAnimate = document.querySelectorAll('.timeline-item .wrap');
    const TimeLineAnimate_items = document.querySelectorAll('.timeline-item.main');

    const receivedDate = new Date(2026, 8, 16).getTime();
    const LaunchDate = new Date(2025, 10, 8).getTime();
    const waElements = ['whatsappLink', 'whatsappLink_footer', 'whatsappLink_footer_2'];
    waElements.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.href = whatsappLink;
    });

    document.querySelectorAll("#closeHeaderBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute('data-spawn');
            document.querySelector(`.timeline-container#${targetId}`).classList.remove('active');
            document.body.style.overflow = "";
        });
    });
    const toggleFocus = (btn) => {
        btn.parentElement.parentElement.classList.toggle('focus');
    };
    document.querySelectorAll(".involve-card .cta-btn").forEach(btn => {
        btn.addEventListener("click", () => toggleFocus(btn));
    });
    document.querySelectorAll(".btn_exec_summ").forEach(btn => {
        btn.addEventListener("click", () => toggleFocus(btn));
    });
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('click', () => {
            const targetId = card.getAttribute('data-spawn');
            const targetEl = document.querySelector(`.timeline-container#${targetId}`);
            if (targetEl) {
                targetEl.classList.add('active');
                document.body.style.overflow = "hidden";
            }
        });
    });
    menu_icon.addEventListener('click', function () {
        nav_bar.classList.add('active');
        menu_icon_main.classList.add('active');
        document.body.style.overflow = "hidden";
    });
    menu_icon_close.addEventListener('click', function () {
        nav_bar.classList.remove('active');
        menu_icon_main.classList.remove('active');
        document.body.style.overflow = "";
    });
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            UpSend.classList.add('active');
        } else {
            UpSend.classList.remove('active');
        }
    });
    UpSend.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    const animateCount = (counter) => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const step = () => {
            let increment = Math.ceil((target - count) / 10);
            count += increment;
            if (count < target) {
                counter.innerText = count.toLocaleString();
                requestAnimationFrame(step);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        step();
    };

    const timeLineObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate_timeline');
            } else {
                entry.target.classList.remove('animate_timeline');
            }
        });
    }, { threshold: 0.5 });

    TimeLineAnimate.forEach(item => timeLineObserver.observe(item));
    TimeLineAnimate_items.forEach(item => timeLineObserver.observe(item));

    const observer_r = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                observer_r.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer_r.observe(counter));

    function timer_refiner(num) {
        return num < 10 ? '0' + num : num;
    }
    const Timer = setInterval(() => {
        let distance = receivedDate - (new Date().getTime());
        if (distance < 0) return clearInterval(Timer);
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.querySelector('.days h1').innerHTML = `${timer_refiner(days)} <span>d</span>`;
        document.querySelector('.hr h1').innerHTML = `${timer_refiner(hours)} <span>h</span>`;
        document.querySelector('.min h1').innerHTML = `${timer_refiner(minutes)} <span>m</span>`;
        document.querySelector('.sec h1').innerHTML = `${timer_refiner(seconds)} <span>s</span>`;
    }, 1000);

    setInterval(() => {
        images_all.forEach(element => {
            if (element.classList.contains('slick-current')) {
                if (Cross_img.src !== element.src) {
                    Cross_img.classList.add('hide');
                    setTimeout(() => {
                        Cross_img.src = element.src;
                        Cross_img.classList.remove('hide');
                    }, 300);
                }
            }
        });
    }, 1000);

    $('#slider_container_id').slick({
        slidesToShow: 1,
        autoplay: true,
        arrows: false,
        dots: false,
        autoplaySpeed: 10000,
        fade: false
    });

    var swiper = new Swiper(".swiper", {
        grabCursor: true,
        slidesPerView: "auto",
        initialSlide: 1,
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
        },
        keyboard: { enabled: true },
        spaceBetween: 60,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        autoplay: { delay: 9000 }
    });

    AOS.init();

    setTimeout(() => {
        const popup = document.getElementById('popup-overlay');
        if (popup) popup.classList.add('active');
    }, 1000);

    function closePopup() {
        const popup = document.getElementById('popup-overlay');
        if (popup) popup.classList.remove('active');
    }
    const closeTrigger = document.querySelector('.close-trigger');
    if (closeTrigger) {
        closeTrigger.addEventListener('click', closePopup);
    }
    window.onclick = function (event) {
        const overlay = document.getElementById('popup-overlay');
        if (event.target === overlay) {
            closePopup();
        }
    };
});

function sharePage() {
    if (navigator.share) {
        navigator.share({
            title: "Working Together to Advance the Kingdom",
            text: "Here’s a glimpse of the impact we are making in communities across Ghana.",
            url: window.location.href
        });
    } else {
        alert('Sharing is not supported on this device.');
    }
}