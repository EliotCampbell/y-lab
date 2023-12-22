import * as translations from "./translations";

//Ответ по таске 2 в README
/**
 * @param services {Services}
 */
export default class I18n {
  constructor(services) {
    this.listeners = [];
    this.services = services;
    this.defaultLocale = 'ru';
    this.currentLocale = this.setLang(this.defaultLocale);
  }
  /**
   * Добавляет слушателя изменения языка
   * @param {Function} listener - Функция-слушатель
   */
    addLangChangeListener = (listener) => {
      this.listeners.push(listener);
    }
  /**
   * Удаляет слушателя изменения языка
   * @param {Function} listener - Функция-слушатель
   */
    removeLangChangeListener = (listener) => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    }
  /**
   * Уведомляет слушателей об изменении языка
   */
    notifyLangChange = () => {
      this.listeners.forEach((listener) => listener());
    }
  /**
   * Устанавливает текущий язык
   * @param {string} locale - Код языка
   * @returns {string} - Установленный язык
   */
    setLang = (locale) => {
      this.currentLocale = locale;
      this.services.api.setHeader('X-Lang', locale)
      this.notifyLangChange(); // Уведомляем слушателей об изменении языка
      return locale;
    }
  /**
   * Перевод фразу по словарю
   * @param lang {String} Код языка
   * @param text {String} Текст для перевода
   * @param [plural] {Number} Число для плюрализации
   * @returns {String} Переведенный текст
   */
  translate = (lang = this.currentLocale, text, plural) => {
    let result = translations[lang] && (text in translations[lang])
      ? translations[lang][text]
      : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(lang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }
    return result;
  }
  /**
   * Возвращает текущий язык
   * @returns {string} - Текущий язык
   */
  lang = () => {
    return this.currentLocale;
  }

}
