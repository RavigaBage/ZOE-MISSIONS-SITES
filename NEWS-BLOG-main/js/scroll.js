const Menubar = document.querySelector('#main-bar');
const Content = document.querySelector('#main-details');
const VoteUp = document.querySelectorAll('.icon i');
var menuIndicator = document.querySelector('#menuBar');
var menu  = document.querySelector('.menu ul');
var Icon = menuIndicator.querySelector('i');
var VideoItem = document.querySelectorAll('.item2');


/*---------------HideIcons and item Menu----------------- */
var slash_eye = document.querySelectorAll('.fa-eye-slash');
var menus_eye = document.querySelectorAll('.hide-items');
var Extra_menus = document.querySelectorAll('.menuOrder');

function openContent(e){
    element = e.srcElement.getAttribute('data_value');
    for (const menus_eyeElement of menus_eye) {
        if(menus_eyeElement.getAttribute('data_value') == element){
            menus_eyeElement.classList.add('active');
            me
        }else{
            menus_eyeElement.classList.remove('active');
        }
    }
}
function openExtra(e){
    element = e.srcElement.getAttribute('data_value');
    for (const menus_eyeElement of Extra_menus) {
        if(menus_eyeElement.getAttribute('data_value') == element){
            menus_eyeElement.classList.toggle('active');
        }else{
            menus_eyeElement.classList.remove('active');
        }
    }
}
function closeMenu(e){
parent = e.parentElement;
parent.classList.remove('active');
}
function showHide(){
    menu.classList.toggle('active');
    Icon.classList.toggle('fa-times');
}
function RecordVoteUp(e){
figure = e.srcElement.getAttribute('num');
numFig = parseInt(figure) + 1;
element = e.srcElement.nextSibling;
element.innerText = numFig;
e.srcElement.setAttribute('num', numFig);
}


VoteUp.forEach(element => {
    if(!element.hasAttribute('num')){
        element.setAttribute('num', 0)
    }
});

window.addEventListener('click', (e) => {
    if(e.target.matches('.fa-eye-slash')){
        openContent(e);
    }
    if(e.target.matches('.extraMenu')){
        openExtra(e);
    }

    if(e.target.matches('.fa-thumbs-up')){
        RecordVoteUp(e)
    }else 
    if(e.target.matches('.fa-thumbs-down')){
        RecordVoteUp(e)
    }
})
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
menuIndicator.onclick = ()=>showHide();
var textArea = document.querySelector('.typetext');
text = ['N','E','W','S',' ','H','U','B',' ','I','S',' ','R','E','A','D','Y',' ','E','N','J','O','Y'];
var cursor = document.querySelector('.cursor');
var loader = document.querySelector('.loader');
var Animations = document.querySelector('.Animation');
charlength = 0;

function type(){
    if(loader.classList.contains('active')){
    }else{
            if(charlength < text.length){
        cursor.classList.add('active');
        textArea.textContent += text[charlength];
        charlength++;
        setTimeout(type,200);
    }else{
        setTimeout(()=>{
            cursor.classList.remove('active')
            Animations.classList.remove('active');
        },500);
    }
    }

}

//   setTimeout(function(){
//     loader.classList.remove('active');
//     type();
//     },10000)

///observer
const observer  = new IntersectionObserver((entries)=>{
    entries.forEach(element => {
        videoElement = element.target.querySelector('video');
    if(element.isIntersection){
        videoElement.setAttribute('autoplay', true);
        console.log(videoElement)
    }else{
       
    }
});
});
VideoItem.forEach((el)=>observer.observe(el));