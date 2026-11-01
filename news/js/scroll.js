const Menubar = document.querySelector('#main-bar');
const Content = document.querySelector('#main-details');


function scrolling(){
if(scrollY > 15){
    Menubar.classList.add('active');
    Content.classList.add('active');
}else{
    Menubar.classList.remove('active');
    Content.classList.remove('active');
}
}

window.addEventListener('scroll', scrolling);
