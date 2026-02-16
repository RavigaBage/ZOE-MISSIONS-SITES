/**
 * Translation Manager for Zoe Tirzah Website
 * Handles multilingual support for English, French, and Arabic
 */

class TranslationManager {
    constructor() {
        this.currentLang = 'en';
        this.translations = null;
        this.initialized = false;
    }

    /**
     * Initialize the translation manager
     */
    async init() {
        try {
            
            const GetPage = window.location.href;
            const SplitLink = GetPage.split('/');
            var PageName = SplitLink[SplitLink.length-1];
            if(SplitLink[SplitLink.length - 1] == 'index.html'){
                PageName = SplitLink[SplitLink.length-2];
            }
            PageName = PageName.split('.html')[0];
            console.log(PageName.length);
            if(PageName.length <= 0){
                PageName = 'index';
            }
            
            const response = await fetch(`../js/languages/${PageName}.json`);
            this.translations = await response.json();
            
            // Get saved language preference or default to 'en'
            this.currentLang = localStorage.getItem('preferredLanguage') || 'en';
            
            // Apply translations to the page
            this.applyTranslations(this.currentLang);
            
            // Update UI elements
            this.updateLanguageUI(this.currentLang);
            
            this.initialized = true;
            
            console.log('Translation Manager initialized successfully');
        } catch (error) {
            console.error('Failed to initialize translations:', error);
        }
    }

    /**
     * Change the current language
     * @param {string} langCode - Language code (en, fr, ar)
     */
    changeLanguage(langCode) {
        if (!this.translations || !this.translations[langCode]) {
            console.error(`Language ${langCode} not found`);
            return;
        }

        this.currentLang = langCode;
        localStorage.setItem('preferredLanguage', langCode);
        
        this.applyTranslations(langCode);
        this.updateLanguageUI(langCode);
        
        // Handle RTL for Arabic
        this.handleRTL(langCode);
    }

    /**
     * Apply translations to all elements with data-i18n attribute
     * @param {string} langCode - Language code
     */
    applyTranslations(langCode) {
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translations[langCode][key];
            
            if (translation) {
                // Check if element is input with placeholder
                if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                } else {
                    // Preserve HTML structure if the element contains child elements
                    if (element.children.length === 0) {
                        element.textContent = translation;
                    } else {
                        // For elements with children, only update text nodes
                        this.updateTextNodes(element, translation);
                    }
                }
            }
        });
    }

    /**
     * Update only text nodes, preserving child elements
     * @param {HTMLElement} element - Target element
     * @param {string} translation - Translation text
     */
    updateTextNodes(element, translation) {
        // Find the first text node and update it
        for (let node of element.childNodes) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
                node.textContent = translation;
                break;
            }
        }
    }

    /**
     * Update language selector UI
     * @param {string} langCode - Language code
     */
    updateLanguageUI(langCode) {
        const langData = {
            en: { name: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
            fr: { name: 'Français', flag: 'https://flagcdn.com/w40/fr.png' },
            ar: { name: 'العربية', flag: 'https://flagcdn.com/w40/sa.png' }
        };

        const currentFlag = document.getElementById('currentFlag');
        const currentLangText = document.getElementById('currentLangText');

        if (currentFlag && langData[langCode]) {
            currentFlag.src = langData[langCode].flag;
            currentFlag.alt = langData[langCode].name;
        }

        if (currentLangText && langData[langCode]) {
            currentLangText.textContent = langData[langCode].name;
        }
    }

    /**
     * Handle Right-to-Left layout for Arabic
     * @param {string} langCode - Language code
     */
    handleRTL(langCode) {
        const htmlElement = document.documentElement;
        
        if (langCode === 'ar') {
            htmlElement.setAttribute('dir', 'rtl');
            htmlElement.setAttribute('lang', 'ar');
        } else {
            htmlElement.setAttribute('dir', 'ltr');
            htmlElement.setAttribute('lang', langCode);
        }
    }

    /**
     * Get translation for a specific key
     * @param {string} key - Translation key
     * @param {string} langCode - Optional language code (defaults to current)
     * @returns {string} - Translated text
     */
    getTranslation(key, langCode = null) {
        const lang = langCode || this.currentLang;
        
        if (this.translations && this.translations[lang] && this.translations[lang][key]) {
            return this.translations[lang][key];
        }
        
        return key; // Return key if translation not found
    }
}

// Create global instance
const translationManager = new TranslationManager();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        translationManager.init();
    });
} else {
    translationManager.init();
}

// Global function for language switching (called from HTML onclick)
function changeLanguage(langCode, langName, flagUrl) {
    translationManager.changeLanguage(langCode);
    toggleLangPopup(); // Close the popup
}

// Toggle language selector popup
function toggleLangPopup() {
    const popup = document.getElementById('langPopup');
    if (popup) {
        popup.classList.toggle('active');
    }
}

// Close popup when clicking outside
document.addEventListener('click', (event) => {
    const langContainer = document.querySelector('.lang-switcher-container');
    const popup = document.getElementById('langPopup');
    
    if (langContainer && popup && !langContainer.contains(event.target)) {
        popup.classList.remove('active');
    }
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TranslationManager;
}