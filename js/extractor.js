    const translator = {}
    function isValidText(text) {
        return text && text.replace(/\s+/g, " ").trim().length > 0;
    }
    function extractI18nClean() {
        const result = {};

        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            const index = [...document.querySelectorAll("[data-i18n]")].indexOf(el);
            if (!key) return;

            const clone = el.cloneNode(true);

            const text = clone.textContent
            .replace(/\s+/g, " ")
            .trim();

            result[key] = text;
        });
        return result;
    }

 console.log(extractI18nClean());