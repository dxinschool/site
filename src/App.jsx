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
  const [entered, setEntered] = useState(false)

  return (
    <>
      {!entered && <EntryGate onEnter={() => setEntered(true)} />}
      {page !== "home" && <Nav page={page} setPage={setPage} />}
      <div key={page} className="page-fade">
      {page === "blog" ? <Blog setPage={setPage} />
      : page === "gallery" ? <Gallery setPage={setPage} />
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

          <Card span={4} size="xs" style={{ position: "relative" }}>
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 className="card-title">discord</h2>
              <DiscordStatus />
              <div className="card-icon-wrap">
                <img src="https://www.svgrepo.com/show/353655/discord-icon.svg" alt="Discord Logo" className="card-icon" />
              </div>
            </div>
            <a
              href="https://discord.com/users/511031197455876128"
              target="_blank"
              rel="noreferrer"
              style={{ position: "absolute", inset: 0, zIndex: 2, cursor: "pointer" }}
              aria-label="Discord profile"
            />
          </Card>

          <Card span={4} size="xs" style={{ position: "relative" }}>
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 className="card-title">email</h2>
              <p className="card-text" style={{ color: "var(--accent-a)" }}>sz@to.hkjc.uk</p>
              <div className="card-icon-wrap">
                <img src="https://www.svgrepo.com/show/521128/email-1.svg" alt="Email Icon" className="card-icon" />
              </div>
            </div>
            <a
              href="mailto:sz@to.hkjc.uk"
              style={{ position: "absolute", inset: 0, zIndex: 2, cursor: "pointer" }}
              aria-label="Send email"
            />
          </Card>

          <Card span={4} size="sm" style={{ position: "relative" }}>
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 className="card-title">instagram</h2>
              <p className="card-text" style={{ color: "var(--accent-a)" }}>@szto.hkjc.uk</p>
              <div className="card-icon-wrap">
                <img src="https://www.svgrepo.com/show/452229/instagram-1.svg" alt="Instagram Icon" className="card-icon" />
              </div>
            </div>
            <a
              href="https://www.instagram.com/szto.hkjc.uk/"
              target="_blank"
              rel="noreferrer"
              style={{ position: "absolute", inset: 0, zIndex: 2, cursor: "pointer" }}
              aria-label="Instagram profile"
            />
          </Card>

          <Card id="spotify" span={6} size="sm" style={{ overflowAnchor: "none" }}>
            <SpotifyNowPlaying />
          </Card>
          <Card span={6} size="sm" style={{ transform: "rotate(1.2deg)" }} />

          <Card id="steam" span={12} size="sm" style={{ marginTop: 24, transform: "none" }}>
            <SteamGames />
          </Card>

          <Card id="weather" span={12} size="sm" style={{ marginTop: 4, transform: "none" }}>
            <Weather />
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
