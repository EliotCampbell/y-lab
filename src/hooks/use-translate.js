import {useEffect, useState} from 'react';
import useServices from "./use-services";
import shallowequal from "shallowequal";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */

const useTranslate = () => {
  const i18n = useServices().i18n;
  const [lang, setLang] = useState(() => i18n.lang());

  useEffect(() => {
    const updateTranslate = () => {
      const newLang = i18n.lang();
      setLang(prevLang => shallowequal(prevLang, newLang) ? prevLang : newLang);
    };

    i18n.addLangChangeListener(updateTranslate);

    return () => {
      i18n.removeLangChangeListener(updateTranslate);
    };
  }, [i18n]);

  return {
    t: (text, plural) => i18n.translate(lang, text, plural), //делаем финт ушами и теперь мы умеем узнавать об изменении языка
    lang: lang,
    setLang: i18n.setLang
  };
};

export default useTranslate;
