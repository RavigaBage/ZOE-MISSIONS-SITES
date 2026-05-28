if(window.localStorage.getItem('language_request')){
    const requested_language = window.localStorage.getItem('language_request');
    loadLanguage(requested_language);
}
const skeleton = document.querySelector('.skeleton');
const LanguageChange = document.querySelectorAll('.List_drop .item');
LanguageChange.forEach(element=>{
    element.addEventListener('click',function(){
    const Language_type = element.querySelector('b').textContent;
    document.querySelectorAll('.item.default').forEach(element=>{
    element.querySelector('b').textContent = Language_type;})
    loadLanguage(Language_type);
    });
})
function languageConvert(lang){
    setLanguage(lang)
    switch (lang) {
        case 'en':
            return 'English';
            break;
        case 'fr':
            return 'FRENCH';
        case 'ar':
            return 'Arabic';
    
        default:
            return 'English'
            break;
    }
}
function setLanguage(lang) {
  document.documentElement.lang = lang;

  if (lang === "ar") {
    document.documentElement.dir = "rtl";
  } else {
    document.documentElement.dir = "ltr";
  }
}
async function loadLanguage(lang = "en") {

    skeleton.classList.add('scrolled');
    lang = lang.toLocaleLowerCase();
    try {
        const GetPage = window.location.href;
        const SplitLink = GetPage.split('/');
        var PageName = SplitLink[SplitLink.length-1];
        if(SplitLink[SplitLink.length - 1] == ('index.html'|"")){
            PageName = 'missions';
        }
        const regex = /[.html]/
        if(regex.test(PageName)){
            PageName = PageName.split('.html')[0];
        }

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
        const Data_list = document.querySelectorAll(`[data-i18n]`);
        const splitkey = key.split('-')[1];
        var ElementList = null;
        Data_list.forEach(element_r=>{
            const ArrayListing = [...Data_list];
             const Index = ArrayListing.indexOf(element_r);
             if(Index == parseInt(splitkey)){
                ElementList = element_r;
             }
        })
        
        if(ElementList !=null){
            
            const el = ElementList;
            if (el) {
                 
                skeleton.querySelector('span').textContent = languageConvert(lang);

                el.classList.add('animate_x');
                el.classList.add('hide');  
                setTimeout(()=>{
                    if (value.includes("<") && value.includes(">")) {
                    el.innerHTML = value;
                    } else {
                        el.textContent = value;
                    }
                    el.classList.remove('hide'); 
                     skeleton.classList.remove('scrolled');
                },900)

            }


  
            document.querySelector('html').setAttribute('lang',lang);
                
        }
 
            });
    } catch (err) {
    console.error("Language loading error:", err);
    }
}
   