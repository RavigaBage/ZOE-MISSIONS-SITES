if(window.localStorage.getItem('language_request')){
    const requested_language = window.localStorage.getItem('language_request');
    loadLanguage(requested_language);
}
console.log(window.localStorage.getItem('language_request'));


async function loadLanguage(lang = "en") {
    lang = lang.toLocaleLowerCase();
    try {
        //get page
        const GetPage = window.location.href;
        const SplitLink = GetPage.split('/');
        var PageName = SplitLink[SplitLink.length-1];
        if(SplitLink[SplitLink.length - 1] == ('index.html'|"")){
            PageName = 'missions';
        }
        console.log(SplitLink);
        

        const res = await fetch(`../js/languages/${PageName}.json`,
        {
            method: 'GET',
            cache: 'no-cache'
        }
        );
        if (!res.ok) return console.error("Language file not found");

        const data = await res.json();
        const langObj = data[lang.toLocaleLowerCase()]; 
        if (!langObj) return console.error("Language not found in JSON");

        
        Object.entries(langObj).forEach(([key, value]) => {
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
        document.querySelector('html').setAttribute('lang',lang);

    } catch (err) {
    console.error("Language loading error:", err);
    }
}
   