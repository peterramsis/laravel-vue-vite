import { createI18n } from "vue-i18n";
import ar from "../locales/ar.json";
import en from "../locales/en.json";

const i18n = createI18n({
    legacy: false,
    locale: import.meta.env.VITE_I18N_LOCALE || "ar",
    fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || "en",
    messages: {
        en,
        ar,
    },
});

export default i18n;
