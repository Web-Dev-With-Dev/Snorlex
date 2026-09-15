const fs = require('fs')
const path = require('path')

const sourcePngPath = path.resolve(__dirname, '../src/renderer/assets/img/snorlex_icon.png')
const iconColorPngPath = path.resolve(__dirname, '../_icons/iconColor.png')
const iconIcoPath = path.resolve(__dirname, '../_icons/icon.ico')
const iconSvgPath = path.resolve(__dirname, '../_icons/icon.svg')
const logoColorSvgPath = path.resolve(__dirname, '../_icons/logoColor.svg')

const pngBuffer = fs.readFileSync(sourcePngPath)

// 1. Overwrite _icons/iconColor.png directly with snorlex_icon.png
fs.writeFileSync(iconColorPngPath, pngBuffer)
console.log('Updated _icons/iconColor.png')

// 2. Build multi-entry Windows ICO file from PNG buffer
// ICONDIR header
const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0) // Reserved
header.writeUInt16LE(1, 2) // Type 1 = ICO
header.writeUInt16LE(1, 4) // Count 1 image

const offset = 6 + 16 // Header (6) + 1 DirEntry (16)

const dirEntry = Buffer.alloc(16)
dirEntry.writeUInt8(0, 0) // Width 256 (0 means 256)
dirEntry.writeUInt8(0, 1) // Height 256 (0 means 256)
dirEntry.writeUInt8(0, 2) // Colors
dirEntry.writeUInt8(0, 3) // Reserved
dirEntry.writeUInt16LE(1, 4) // Planes
dirEntry.writeUInt16LE(32, 6) // Bits per pixel
dirEntry.writeUInt32LE(pngBuffer.length, 8) // Image size
dirEntry.writeUInt32LE(offset, 12) // Image offset

const icoBuffer = Buffer.concat([header, dirEntry, pngBuffer])
fs.writeFileSync(iconIcoPath, icoBuffer)
console.log('Updated _icons/icon.ico')

// 3. Update SVG icons with Snorlax face base64
const base64Png = pngBuffer.toString('base64')
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 285 261" width="285" height="261">
  <image href="data:image/png;base64,${base64Png}" width="285" height="261" />
</svg>`

const allSvgIcons = [
  'icon.svg',
  'iconColorSmall.svg',
  'iconWhiteSmall.svg',
  'iconBlackSmall.svg',
  'iconFlathub.svg',
  'iconCatppuccinFrappeDarkSmall.svg',
  'iconCatppuccinFrappeLightSmall.svg',
  'iconCatppuccinLatteDarkSmall.svg',
  'iconCatppuccinLatteLightSmall.svg',
  'iconCatppuccinMochaDarkSmall.svg',
  'iconCatppuccinMochaLightSmall.svg',
  'iconDraculaDarkSmall.svg',
  'iconDraculaLightSmall.svg',
  'iconEverforestDarkHardSmall.svg',
  'iconEverforestDarkLowSmall.svg',
  'iconEverforestDarkMediumSmall.svg',
  'iconEverforestLightHardSmall.svg',
  'iconEverforestLightLowSmall.svg',
  'iconEverforestLightMediumSmall.svg',
  'iconGruvboxDarkSmall.svg',
  'iconGruvboxLightSmall.svg',
  'iconNordicLightSmall.svg',
  'iconSolarizedDarkSmall.svg',
  'iconSolarizedLightSmall.svg',
  'logoColor.svg'
]

const iconsDir = path.resolve(__dirname, '../_icons')
for (const iconFile of allSvgIcons) {
  fs.writeFileSync(path.join(iconsDir, iconFile), svgContent)
}
console.log('Updated all SVG icons in _icons/')
