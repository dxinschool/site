import { createContext, useContext, useState, useCallback } from "react"
import { en, zh } from "./i18n"

const LangContext = createContext()

export function LangProvider({ children }) {
  const [lang, setLang] = useState("en")
  const t = useCallback(
    (path, ...args) => {
      const dict = lang === "en" ? en : zh
      const keys = path.split(".")
      let val = dict
      for (const k of keys) {
        val = val?.[k]
        if (val === undefined) return path
      }
      return typeof val === "function" ? val(...args) : val
    },
    [lang],
  )
  const toggleLang = useCallback(() => setLang((l) => (l === "en" ? "zh" : "en")), [])

  return (
    <LangContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error("useLang must be used within LangProvider")
  return ctx
}
