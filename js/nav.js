const menu_icon_main = document.querySelector('.menu_icon');
const menu_icon = document.querySelector('.menu_icon .open');
const menu_icon_close = document.querySelector('.menu_icon .close');
const nav_bar = document.querySelector('nav');
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

if(sessionStorage.getItem('language_request')){
    const requested_language = sessionStorage.getItem('language_request');
    
    if(requested_language == 'en'){
        changeLanguage('en', 'English', 'https://flagcdn.com/w40/gb.png');
    }
    if(requested_language == 'fr'){
        changeLanguage('fr', 'Français', 'https://flagcdn.com/w40/fr.png');
    }
    if(requested_language == 'ar'){
        changeLanguage('ar', 'العربية', 'https://flagcdn.com/w40/sa.png');
    }
    loadLanguage(requested_language);
}

function toggleLangPopup() {
    const popup = document.getElementById('langPopup');
    popup.style.display = (popup.style.display === 'block') ? 'none' : 'block';
}

async function loadEntryLanguage(lang) {
    try {
        
        sessionStorage.setItem('language_request',lang);
        PageName = 'index'
        const res = await fetch(`../js/languages/${PageName}.json`,
        {
            method: 'GET',
            cache: 'no-cache'
        }
        );

        const data = await res.json();
        const langObj = data[lang]; 

        if (!langObj) return console.error("Language not found in JSON");

        Object.entries(langObj).forEach(([key, value]) => {
        // check if a dom element has a class that matches the key
        const elMain = document.querySelectorAll(`[data-i18n="${key}"]`);  
            elMain.forEach(el =>{
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
            })


        });

    } catch (err) {
    console.error("Language loading error:", err);
    }
}
async function loadLanguage(lang = "en") {
    try {
        //get page
        sessionStorage.setItem('language_request',lang);
        const GetPage = window.location.href;
        const SplitLink = GetPage.split('/');
        PageName = SplitLink[SplitLink.length-1];
        if(SplitLink[SplitLink.length - 1] == 'index.html'){
            PageName = SplitLink[SplitLink.length-2];
        }
        PageName = PageName.split('.html')[0];
        

        const res = await fetch(`../js/languages/${PageName}.json`,
        {
            method: 'GET',
            cache: 'no-cache'
        }
        );
        if(res.ok){
            const data = await res.json();
            const langObj = data[lang]; 

            if (!langObj) return console.error("Language not found in JSON");

            Object.entries(langObj).forEach(([key, value]) => {
            // check if a dom element has a class that matches the key
            const elMain = document.querySelectorAll(`[data-i18n="${key}"]`);  
                elMain.forEach(el =>{
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
                })
            });
        }else{
            console.error("Language file not found");
            loadEntryLanguage(lang);
        } 



    } catch (err) {
        console.error("Language loading error:");
    }
}
function changeLanguage(langCode, langName, flagUrl) {
    document.getElementById('currentFlag').src = flagUrl;
    document.getElementById('currentLangText').innerText = langName;
    
  
    document.documentElement.lang = langCode;

  
    document.getElementById('langPopup').style.display = 'none';


    if (typeof loadLanguage === "function") {
        loadLanguage(langCode);
    }

    console.log("Language changed to: " + langCode);
}

// Close pop-up if user clicks outside
window.onclick = function(event) {
    if (!event.target.closest('.lang-switcher-container')) {
        document.getElementById('langPopup').style.display = 'none';
    }
}
