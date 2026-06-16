import { useState } from "react"
import { LangProvider, useLang } from "./LangContext"
import Nav from "./components/Nav"
import EntryGate from "./components/EntryGate"
import Hero from "./components/Hero"
import LanguageSwitcher from "./components/LanguageSwitcher"
import Ticker from "./components/Ticker"
import Card from "./components/Card"
import Footer from "./components/Footer"
import SteamGames from "./components/SteamGames"
import SpotifyNowPlaying from "./components/SpotifyNowPlaying"
import DiscordRPC from "./components/DiscordRPC"
import DiscordStatus from "./components/DiscordStatus"
import Weather from "./components/Weather"
import Guestbook from "./components/Guestbook"
import Blog from "./pages/Blog"
import Gallery from "./pages/Gallery"

function AppContent() {
  const [page, setPage] = useState("home")
  const [entered, setEntered] = useState(false)
  const { t } = useLang()

  return (
    <>
      {!entered && <EntryGate onEnter={() => setEntered(true)} />}
      {page !== "home" && <Nav page={page} setPage={setPage} />}
      <div style={{ position: "fixed", top: 16, right: 24, zIndex: 200 }}><LanguageSwitcher /></div>
      <div key={page} className="page-fade">
      {page === "blog" ? <Blog />
      : page === "gallery" ? <Gallery />
      : (
      <>
        <div className="page">
          <Hero setPage={setPage} />
        <Ticker />
        <main className="grid">
          <Card span={7} size="xl">
            <div
              style={{
                height: 6,
                borderRadius: 999,
                marginBottom: 12,
                background:
                  "linear-gradient(90deg, #2f7fb0, #7eb8d6, #2f7fb0)",
              }}
            />
            <h2 className="card-title">{t("about.title")}</h2>
            <p className="card-text">{t("about.desc")}</p>
            <div className="stat-grid">
              <div className="stat">{t("about.stat1")}</div>
              <div className="stat">{t("about.stat2")}</div>
              <div className="stat">{t("about.stat3")}</div>
            </div>
          </Card>

          <Card span={5} size="md">
            <h2 className="card-title">{t("now.title")}</h2>
            <ul className="list">
              <li>{t("now.item1")}</li>
              <li>{t("now.item2")}</li>
              <li>{t("now.item3")}</li>
              <li>{t("now.item4")}</li>
            </ul>
          </Card>

          <Card span={4} size="xs" style={{ position: "relative" }}>
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 className="card-title">{t("discord.title")}</h2>
              <DiscordStatus />
              <div className="card-icon-wrap">
                <img src="https://www.svgrepo.com/show/353655/discord-icon.svg" alt={t("discord.img_alt")} className="card-icon" />
              </div>
            </div>
            <a
              href="https://discord.com/users/511031197455876128"
              target="_blank"
              rel="noreferrer"
              style={{ position: "absolute", inset: 0, zIndex: 2, cursor: "pointer" }}
              aria-label={t("discord.aria")}
            />
          </Card>

          <Card span={4} size="xs" style={{ position: "relative" }}>
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 className="card-title">{t("email.title")}</h2>
              <p className="card-text" style={{ color: "var(--accent-a)" }}>sz@to.hkjc.uk</p>
              <div className="card-icon-wrap">
                <img src="https://www.svgrepo.com/show/521128/email-1.svg" alt={t("email.img_alt")} className="card-icon" />
              </div>
            </div>
            <a
              href="mailto:sz@to.hkjc.uk"
              style={{ position: "absolute", inset: 0, zIndex: 2, cursor: "pointer" }}
              aria-label={t("email.aria")}
            />
          </Card>

          <Card span={4} size="sm" style={{ position: "relative" }}>
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 className="card-title">{t("instagram.title")}</h2>
              <p className="card-text" style={{ color: "var(--accent-a)" }}>@szto.hkjc.uk</p>
              <div className="card-icon-wrap">
                <img src="https://www.svgrepo.com/show/452229/instagram-1.svg" alt={t("instagram.img_alt")} className="card-icon" />
              </div>
            </div>
            <a
              href="https://www.instagram.com/szto.hkjc.uk/"
              target="_blank"
              rel="noreferrer"
              style={{ position: "absolute", inset: 0, zIndex: 2, cursor: "pointer" }}
              aria-label={t("instagram.aria")}
            />
          </Card>

          <Card id="spotify" span={6} size="sm" style={{ overflowAnchor: "none", minHeight: 240 }}>
            <SpotifyNowPlaying />
          </Card>
          <Card id="rpc" span={6} size="sm" style={{ transform: "rotate(1.2deg)" }}>
            <DiscordRPC />
          </Card>

          <Card id="steam" span={12} size="sm" style={{ marginTop: 24, transform: "none" }}>
            <SteamGames />
          </Card>

          <Card id="weather" span={12} size="sm" style={{ marginTop: 4, transform: "none" }}>
            <Weather />
          </Card>

          <Card span={12} size="sm" style={{ marginTop: 24, transform: "none" }}>
            <Guestbook />
          </Card>
        </main>
        <Footer />
      </div>
    </>
      )}
    </div>
    </>
  )
}

export default function App() {
  return (
    <LangProvider>
      <AppContent />
    </LangProvider>
  )
}
