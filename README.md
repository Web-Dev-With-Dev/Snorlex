<p align="center">
 <img alt="" src="/_icons/logoColor.svg" width=500 align="center">
</p>

Snorlex is an open source desktop YouTube player built with privacy in mind.
Use YouTube without advertisements and prevent Google from tracking you with their cookies and JavaScript.
Available for Windows (10 and later), Mac (macOS 12 and later) & Linux thanks to Electron.

<p align="center"><a href="https://github.com/SnorlexApp/Snorlex/releases">Download Snorlex</a></p>
<p align="center">
  <a href="https://github.com/SnorlexApp/Snorlex/actions/workflows/build.yml">
    <img alt='Build status' src="https://github.com/SnorlexApp/Snorlex/actions/workflows/build.yml/badge.svg?branch=development" />
  </a>
  <a href="https://hosted.weblate.org/engage/free-tube/">
    <img src="https://hosted.weblate.org/widgets/free-tube/-/svg-badge.svg" alt="Translation status" />
  </a>
</p>

<hr>
<p align="center"><a href="#screenshots">Screenshots</a> &bull; <a href="#how-does-it-work">How does it work?</a> &bull; <a href="#features">Features</a> &bull; <a href="#download-links">Download Links</a> &bull; <a href="#contributing">Contributing</a> &bull; <a href="#localization">Localization</a> &bull; <a href="#contact">Contact</a> &bull; <a href="#donate">Donate</a> &bull; <a href="#license">License</a></p>
<p align="center"><a href="https://snorlexapp.io/">Website</a> &bull; <a href="https://docs.snorlexapp.io/">Documentation</a> &bull; <a href="https://docs.snorlexapp.io/faq/">FAQ</a> &bull; <a href="https://github.com/SnorlexApp/Snorlex/discussions">Discussions</a></p>
<hr>

> [!NOTE] 
> Snorlex is currently in Beta. While it should work well for most users, there are still bugs and missing features that need to be addressed.
>
> If you have an idea or if you found a bug, please submit a [GitHub issue](https://github.com/SnorlexApp/Snorlex/issues/new/choose) so that we can track it.  Please [search the existing issues](https://github.com/SnorlexApp/Snorlex/issues?q=is%3Aissue+sort%3Arelevance-desc) before submitting to prevent duplicates!

## Screenshots
| The main Snorlex window                                                                         |
|--------------------------------------------------------------------------------------------------|
| ![](https://raw.githubusercontent.com/SnorlexApp/SnorlexApp.io/master/src/images/Snorlex1.png)|

| Watching a video                                                                                 |
|--------------------------------------------------------------------------------------------------|
| ![](https://raw.githubusercontent.com/SnorlexApp/SnorlexApp.io/master/src/images/Snorlex2.png)|

| Settings                                                                                         |
|--------------------------------------------------------------------------------------------------|
| ![](https://raw.githubusercontent.com/SnorlexApp/SnorlexApp.io/master/src/images/Snorlex3.png)|

## How does it work?
Snorlex uses a built in extractor to grab and serve data / videos. The [Invidious API](https://github.com/iv-org/invidious) can also optionally be used. Snorlex does not use any official APIs to obtain data. While YouTube can still see your video requests, it can no
longer track you using cookies or JavaScript. Your subscriptions, playlists and history are stored locally on your computer and never sent out.

> [!IMPORTANT]  
> Using a VPN or Tor is highly recommended to hide your IP while using Snorlex.

## Features
* Watch videos without ads
* Use YouTube without Google tracking you using cookies and JavaScript
* Two extractor APIs to choose from (Built in or Invidious)
* Subscribe to channels without an account
* Connect to an externally setup proxy such as Tor
* View and search your local subscriptions, playlists and history
* Organize your subscriptions into "Profiles" to create a more focused feed
* Export & import subscriptions
* YouTube Trending
* YouTube Chapters
* Most popular videos page based on the set Invidious instance
* SponsorBlock
* DeArrow
* Open videos from your browser directly into Snorlex (with extension)
* Watch videos using an external player
* Full Theme support
* Make a screenshot of a video
* Multiple windows
* Mini Player (Picture-in-Picture)
* Keyboard shortcuts
* Option to show only family friendly content
* Show/hide functionality or elements within the app using the distraction free settings
* View channel posts

### Browser Extensions
The following extensions open YouTube links directly in Snorlex:

- [LibRedirect](https://libredirect.manerakai.com/)
- [RedirectTube](https://github.com/MStankiewiczOfficial/RedirectTube)

LibRedirect automatically redirect YouTube links to Snorlex.
> [!IMPORTANT]
> To ensure proper functionality, select Snorlex as Frontend in the Services settings of the extension.

RedirectTube, doesn’t automatically open YouTube links in Snorlex (although this feature can be enabled in the settings). Instead, it adds buttons to the toolbar and context menu, which you can click to open videos in Snorlex manually.

- Download LibRedirect from [Mozilla Add-ons](https://addons.mozilla.org/firefox/addon/libredirect/) (for Firefox based-browsers) or [developer's website](https://libredirect.manerakai.com/download_chromium.html) (for Chrome and Chromium-based browsers).

- Download RedirectTube from [Mozilla Add-ons](https://addons.mozilla.org/firefox/addon/redirecttube/) (for Firefox based-browsers) or [Chrome Web Store](https://chromewebstore.google.com/detail/redirecttube/jpbaggklodpddjcadlebabhiopjkjfjh) (for Chrome and Chromium-based browsers).

> [!NOTE]
> These extensions do not work on Linux portable builds!
>
> If you have issues with the extension working with Snorlex, please create an issue in this repository instead of the extension repository.

## Download Links
### Official Downloads

> [!CAUTION]
> Snorlex is only supported on Windows 10 and later, macOS 12 and above, and various Linux distributions. Installing it on unsupported systems may result in unexpected issues.

* [GitHub Releases](https://github.com/SnorlexApp/Snorlex/releases)

* [Snorlex Website](https://snorlexapp.io/#download)

* Flatpak on Flathub: [Download](https://flathub.org/apps/details/io.snorlexapp.Snorlex) and [Source Code](https://github.com/flathub/io.snorlexapp.Snorlex)

#### Automated Builds (Nightly / Weekly)
> [!WARNING]
> Use these builds at your own risk. These are pre-release versions and are only intended for people that want to test changes early and are willing to accept that things could break from one build to another. 

Builds are automatically created from changes to our development branch via [GitHub Actions](https://github.com/SnorlexApp/Snorlex/actions?query=workflow%3ABuild).

The first build with a green check mark is the latest build.  

> [!IMPORTANT]
> You will need to have a GitHub account to download these builds.

### Projects maintained by individual Snorlex team members
* Homebrew Snorlex (Apple Silicon only): [Install](https://github.com/PikachuEXE/homebrew-Snorlex)

* SnorlexAndroid (Snorlex port for Android and PWA): [Download](https://github.com/MarmadileManteater/SnorlexAndroid/releases) and [Source Code](https://github.com/MarmadileManteater/SnorlexAndroid)

> [!IMPORTANT]
> These projects are related to Snorlex and are maintained by individual members of the Snorlex team. While they are not part of the main Snorlex project, they may be useful to Snorlex users. There may be issues when using these projects compared to the official builds. Any issues specific to these builds should be reported to their respective maintainers. Make sure you always try an [official download](https://github.com/snorlexapp/snorlex/#official-downloads) before reporting your issue to us!

## Contributing
Thank you very much to the [People and Projects](https://docs.snorlexapp.io/credits/) that make Snorlex possible!

If you like to get your hands dirty and want to contribute, we would love to
have your help.  Send a pull request and someone will review your code. 

> [!IMPORTANT]
> Please follow the [Contribution Guidelines](https://github.com/SnorlexApp/Snorlex/blob/development/CONTRIBUTING.md) before sending your pull request.

## Localization
<a href="https://hosted.weblate.org/engage/free-tube/">
<img src="https://hosted.weblate.org/widgets/free-tube/-/287x66-grey.png" alt="Translation status" />
</a>

We are actively looking for translations!  We use [Weblate](https://hosted.weblate.org/engage/free-tube/) to make it easy for translators to get involved.  Click on the badge above to learn how to get involved.

For the Linux Flatpak, the desktop entry comment string can be translated at our [Flatpak repository](https://github.com/flathub/io.snorlexapp.Snorlex/blob/master/io.snorlexapp.Snorlex.desktop).

## Contact
If you ever have any questions, feel free to ask it on our [Discussions](https://github.com/SnorlexApp/Snorlex/discussions) page.  Alternatively, you can join our [Matrix Room](https://matrix.to/#/#snorlex:matrix.org).  

> [!IMPORTANT]
> Don't forget to check out the [rules](https://docs.snorlexapp.io/community/matrix/) before joining.

## Donate
If you enjoy using Snorlex, you're welcome to leave a donation using the following method.  

* Bitcoin Address: `bc1qhtnxvn9lswh87f8sw4d4kzurcn9r773p7rrkey`

While your donations are much appreciated, only donate if you really want to.  Donations are used for keeping the website up and running and eventual code signing costs. 

> [!TIP]
> If you are using the Invidious API then we recommend that you donate to the instance that you use. You can also donate to the [Invidious team](https://invidious.io/donate/) or the [Local API developer](https://github.com/sponsors/LuanRT).

## Author & Credits
* **Developer & Creator**: [Web-Dev-With-Dev](https://github.com/Web-Dev-With-Dev)
* Snorlex is built upon and inspired by open-source privacy projects and contributors.

## License
[![GNU AGPLv3 Image](https://www.gnu.org/graphics/agplv3-155x51.png)](https://www.gnu.org/licenses/agpl-3.0.html)  

Snorlex is Free Software: You can use, study share and improve it at your
will. Specifically you can redistribute and/or modify it under the terms of the
[GNU Affero General Public License](https://www.gnu.org/licenses/agpl-3.0.html) as
published by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.  
