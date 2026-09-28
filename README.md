# Snorlex

A private, ad-free desktop YouTube client built with Electron and Vue.js.

[![GitHub Release](https://img.shields.io/github/v/release/Web-Dev-With-Dev/Snorlex?style=flat&color=blue)](https://github.com/Web-Dev-With-Dev/Snorlex/releases)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-green.svg?style=flat)](https://www.gnu.org/licenses/agpl-3.0)
[![Platform](https://img.shields.io/badge/Platform-Windows%20|%20macOS%20|%20Linux-lightgrey?style=flat)](https://github.com/Web-Dev-With-Dev/Snorlex/releases)

---

## About Snorlex

Snorlex is an open-source desktop YouTube client designed for privacy and distraction-free viewing. It allows you to watch videos without advertisements and prevents tracking via cookies and JavaScript.

All your subscriptions, playlists, and history are stored locally on your machine and are never transmitted to third-party servers.

---

## Features

- **Ad-Free Playback**: Stream videos without pre-roll, mid-roll, or banner advertisements.
- **Privacy by Default**: No Google account required. No tracking cookies or telemetry.
- **SponsorBlock & DeArrow**: Automatically skip sponsored video segments and clean up clickbait thumbnails and titles.
- **Local Subscriptions & Profiles**: Organize channels into custom Profiles (e.g., Tech, Music, Education) with full import and export functionality.
- **Themes & Customization**: Built-in themes including Dracula, Catppuccin, Nord, Gruvbox, Solarized, and Everforest.
- **Picture-in-Picture & Mini Player**: Detachable mini player and multi-window support.
- **Chapters & Timestamps**: Full interactive chapter navigation.
- **Proxy & Tor Integration**: Support for routing network requests through Tor or custom HTTP/SOCKS proxies.
- **Browser Extension Integration**: Open YouTube links directly in Snorlex via [LibRedirect](https://libredirect.manerakai.com/) and [RedirectTube](https://github.com/MStankiewiczOfficial/RedirectTube).
- **Internationalization**: Multi-language support with localized interfaces.

---

## Downloads

Official builds are available on the [GitHub Releases](https://github.com/Web-Dev-With-Dev/Snorlex/releases/latest) page.

| Platform | Architecture | Formats |
| :--- | :--- | :--- |
| **Windows** | x64, ARM64 | Installer (.exe), Portable (.exe), .zip, .7z |
| **macOS** | Apple Silicon, Intel | DMG (.dmg), .zip, .7z |
| **Linux** | x64, ARM64, ARMv7 | AppImage, .deb, .rpm, .pacman, .zip, .7z |
| **Web** | Universal | Web Bundle (.zip) |

---

## Development

### Prerequisites

- Node.js (v20 or higher recommended)
- pnpm (v9 or higher)

### Setup & Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Web-Dev-With-Dev/Snorlex.git
   cd Snorlex
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the Electron development app:
   ```bash
   pnpm run dev
   ```

4. Start the Web client development server:
   ```bash
   pnpm run dev:web
   ```

### Building & Packaging

To package the application for production:

```bash
# Standard build (x64)
pnpm run build

# ARM64 build
pnpm run build:arm64

# Web Version
pnpm run pack:web
```

---

## Contributing

Contributions, issue reports, and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'feat: add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

---

## Author

- **Dev Gondaliya** - [Web-Dev-With-Dev](https://github.com/Web-Dev-With-Dev)
- Email: [gondaliyadev007@gmail.com](mailto:gondaliyadev007@gmail.com)

---

## License

This project is licensed under the [GNU Affero General Public License v3.0 or later (AGPL-3.0-or-later)](LICENSE).
