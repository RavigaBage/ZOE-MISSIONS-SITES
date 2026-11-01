const menu_icon_main = document.querySelector('.menu_icon');
const menu_icon = document.querySelector('.menu_icon .open');
const menu_icon_close = document.querySelector('.menu_icon .close');
const nav_bar = document.querySelector('nav');
const footer_btn = document.getElementById('newsletter_signup');
const Newsletter_email = document.getElementById('newsletter_email');
const newsletter_form = document.querySelector('.email-signup form');
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


async function addSubscriber(email) {
    try {
        if(email.length > 0){
            const validateEmail = (email) => {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            };
            if(!validateEmail(email)){
                throw new Error('Invalid email address');
            }
            const response = await fetch('http://localhost:5001/subscriber/add', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (!response.ok) {
                throw new Error('Failed to subscribe');
            }

            const data = await response.text();
            console.log('Subscribed:', data)
            alert(data);
        }else{
            throw new Error(`Email is required ${email}`);
        }
    } catch (err) {
    console.error(err.message);
    }
}
newsletter_form.addEventListener('submit', function(e) {
    e.preventDefault(); 
    console.log(Newsletter_email);
    addSubscriber(Newsletter_email.value);
});
