import { useState } from "react"
import Nav from "./components/Nav"
import EntryGate from "./components/EntryGate"
import Hero from "./components/Hero"
import Ticker from "./components/Ticker"
import Card from "./components/Card"
import Footer from "./components/Footer"
import SteamGames from "./components/SteamGames"
import SpotifyNowPlaying from "./components/SpotifyNowPlaying"
import DiscordStatus from "./components/DiscordStatus"
import Weather from "./components/Weather"
import Blog from "./pages/Blog"
import Gallery from "./pages/Gallery"

export default function App() {
  const [page, setPage] = useState("home")

  return (
    <>
      {page !== "home" && <Nav page={page} setPage={setPage} />}
      {page === "blog" ? <Blog setPage={setPage} />
      : page === "gallery" ? <Gallery setPage={setPage} />
      : (
      <>
        <EntryGate />
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
            <h2 className="card-title">about me</h2>
            <p className="card-text">
              Hi I love playing games, watching movies and stuff.
            </p>
            <div className="stat-grid">
              <div className="stat">BanGDreamer</div>
              <div className="stat">HKCERT CTF 2025 Gold Award</div>
              <div className="stat">Doomscroller</div>
            </div>
          </Card>

          <Card span={5} size="md">
            <h2 className="card-title">now</h2>
            <ul className="list">
              <li>CTF Learner</li>
              <li>Sleep Lover</li>
              <li>Gamer</li>
              <li>Student</li>
            </ul>
          </Card>

          <Card span={4} size="xs">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
              <div>
                <h2 className="card-title">discord</h2>
                <DiscordStatus />
                <a 
                  href="https://discord.com/users/511031197455876128" 
                  target="_blank" 
                  rel="noreferrer"
                  className="card-button"
                >
                  add me
                </a>
              </div>
              <div style={{ position: "absolute", right: -5, top: 10, zIndex: -1, opacity: 0.85 }}>
                <img 
                  src="https://www.svgrepo.com/show/353655/discord-icon.svg" 
                  alt="Discord Logo" 
                  style={{ width: 100, height: "auto" }}
                />
              </div>
            </div>
          </Card>

          <Card span={4} size="xs">
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 className="card-title">email</h2>
              <a href="mailto:sz@to.hkjc.uk" className="card-text" style={{ color: "var(--accent-a)", textDecoration: "none" }}>
                sz@to.hkjc.uk
              </a>
              <div style={{ position: "absolute", right: -5, top: -5, zIndex: -1, opacity: 0.5 }}>
                <img src="https://www.svgrepo.com/show/521128/email-1.svg" alt="Email Icon" style={{ width: 80, height: "auto" }} />
              </div>
            </div>
          </Card>

          <Card span={4} size="sm">
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 className="card-title">instagram</h2>
              <a href="https://www.instagram.com/szto.hkjc.uk/" target="_blank" rel="noreferrer" className="card-text" style={{ color: "var(--accent-a)", textDecoration: "none" }}>
                @szto.hkjc.uk
              </a>
              <div style={{ position: "absolute", right: -5, top: -5, zIndex: -1, opacity: 0.55 }}>
                <img src="https://www.svgrepo.com/show/452229/instagram-1.svg" alt="Instagram Icon" style={{ width: 80, height: "auto" }} />
              </div>
            </div>
          </Card>

          <Card span={6} size="sm">
            <SpotifyNowPlaying />
          </Card>
          <Card span={6} size="sm" style={{ transform: "rotate(1.2deg)" }} />

          <Card span={12} size="sm" style={{ marginTop: 24, transform: "none" }}>
            <SteamGames />
          </Card>

          <Card span={12} size="sm" style={{ marginTop: 4, transform: "none" }}>
            <Weather />
          </Card>
        </main>
        <Footer />
      </div>
    </>
      )}
    </>
  )
}
