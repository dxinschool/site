import { useLang } from "../LangContext"

export default function LanguageSwitcher() {
  const { lang, toggleLang, t } = useLang()

  return (
    <button className="lang-switcher" onClick={toggleLang}>
      <span data-active={lang === "en"}>{t("lang.en")}</span>
      <span className="lang-divider" />
      <span data-active={lang === "zh"}>{t("lang.zh")}</span>
    </button>
  )
}
