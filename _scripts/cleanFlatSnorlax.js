const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

function crc32(buf) {
  let table = new Uint32Array(256)
  for (let i = 0; i < 256; i++) {
    let c = i
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1)
    }
    table[i] = c
  }
  let crc = 0xFFFFFFFF
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8)
  }
  return (crc ^ 0xFFFFFFFF) >>> 0
}

function makeChunk(type, data) {
  const lenBuf = Buffer.alloc(4)
  lenBuf.writeUInt32BE(data.length, 0)
  const typeBuf = Buffer.from(type, 'ascii')
  const body = Buffer.concat([typeBuf, data])
  const crcBuf = Buffer.alloc(4)
  crcBuf.writeUInt32BE(crc32(body), 0)
  return Buffer.concat([lenBuf, body, crcBuf])
}

function parsePNG(buf) {
  let offset = 8 // Skip PNG header
  let width, height, bitDepth, colorType
  let idatParts = []

  while (offset < buf.length) {
    const length = buf.readUInt32BE(offset)
    const type = buf.toString('ascii', offset + 4, offset + 8)
    const data = buf.slice(offset + 8, offset + 8 + length)
    offset += 12 + length

    if (type === 'IHDR') {
      width = data.readUInt32BE(0)
      height = data.readUInt32BE(4)
      bitDepth = data[8]
      colorType = data[9]
    } else if (type === 'IDAT') {
      idatParts.push(data)
    } else if (type === 'IEND') {
      break
    }
  }

  const rawData = zlib.inflateSync(Buffer.concat(idatParts))
  return { width, height, bitDepth, colorType, rawData }
}

function decodePixels(parsed) {
  const { width, height, rawData } = parsed
  const bytesPerPixel = 4 // RGBA
  const stride = 1 + width * bytesPerPixel
  const pixels = Buffer.alloc(width * height * 4)

  for (let y = 0; y < height; y++) {
    const rowFilter = rawData[y * stride]
    const rowOffset = y * stride + 1
    const prevRowOffset = (y - 1) * stride + 1

    for (let x = 0; x < width; x++) {
      const pIdx = (y * width + x) * 4
      const rIdx = rowOffset + x * 4

      for (let c = 0; c < 4; c++) {
        let val = rawData[rIdx + c]
        const left = x > 0 ? pixels[(y * width + (x - 1)) * 4 + c] : 0
        const up = y > 0 ? pixels[((y - 1) * width + x) * 4 + c] : 0
        const upLeft = (x > 0 && y > 0) ? pixels[((y - 1) * width + (x - 1)) * 4 + c] : 0

        if (rowFilter === 1) { // Sub
          val = (val + left) & 0xFF
        } else if (rowFilter === 2) { // Up
          val = (val + up) & 0xFF
        } else if (rowFilter === 3) { // Average
          val = (val + Math.floor((left + up) / 2)) & 0xFF
        } else if (rowFilter === 4) { // Paeth
          const p = left + up - upLeft
          const pa = Math.abs(p - left)
          const pb = Math.abs(p - up)
          const pc = Math.abs(p - upLeft)
          let pr = left
          if (pb < pa && pb <= pc) pr = up
          else if (pc < pa && pc <= pb) pr = upLeft
          val = (val + pr) & 0xFF
        }
        pixels[pIdx + c] = val
      }
    }
  }
  return { width, height, pixels }
}

function encodePNG(width, height, pixels) {
  const bytesPerPixel = 4
  const stride = 1 + width * bytesPerPixel
  const rawData = Buffer.alloc(height * stride)

  for (let y = 0; y < height; y++) {
    rawData[y * stride] = 0 // Filter 0 (None)
    for (let x = 0; x < width; x++) {
      const pIdx = (y * width + x) * 4
      const rIdx = y * stride + 1 + x * 4
      rawData[rIdx] = pixels[pIdx]
      rawData[rIdx + 1] = pixels[pIdx + 1]
      rawData[rIdx + 2] = pixels[pIdx + 2]
      rawData[rIdx + 3] = pixels[pIdx + 3]
    }
  }

  const ihdrData = Buffer.alloc(13)
  ihdrData.writeUInt32BE(width, 0)
  ihdrData.writeUInt32BE(height, 4)
  ihdrData[8] = 8 // 8-bit
  ihdrData[9] = 6 // RGBA
  ihdrData[10] = 0 // Deflate
  ihdrData[11] = 0 // Filter
  ihdrData[12] = 0 // Interlace none

  const pngHeader = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])
  const ihdrChunk = makeChunk('IHDR', ihdrData)
  const idatChunk = makeChunk('IDAT', zlib.deflateSync(rawData, { level: 9 }))
  const iendChunk = makeChunk('IEND', Buffer.alloc(0))

  return Buffer.concat([pngHeader, ihdrChunk, idatChunk, iendChunk])
}

// Locate input image
const inputPath = 'C:/Users/devgo/.gemini/antigravity-ide/brain/c3d58fd4-13ce-4084-a4e1-b80ecfcee54a/.user_uploaded/media_1789562254957.png'
console.log('Using input file:', inputPath)

const inputBuf = fs.readFileSync(inputPath)
const parsed = parsePNG(inputBuf)
const { width, height, pixels } = decodePixels(parsed)

console.log(`Dimensions: ${width}x${height}`)

// Flood fill / background removal:
// Snorlax is dark blue/teal (#365d5c) with cream face/belly and black outlines.
// The checkerboard consists of pure white (#ffffff) and light gray squares (~#cccccc to #f0f0f0).
// Flood fill from all 4 borders to remove outer background without touching internal white claws/teeth.

const visited = new Uint8Array(width * height)
const queue = []

function isCheckerboardOrOuter(x, y) {
  const idx = (y * width + x) * 4
  const r = pixels[idx]
  const g = pixels[idx + 1]
  const b = pixels[idx + 2]
  const a = pixels[idx + 3]

  if (a < 10) return true
  // White or checkerboard gray (high brightness and low saturation)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const isNeutral = (max - min) < 20
  const isBright = r > 180 && g > 180 && b > 180
  return isNeutral && isBright
}

// Push all border pixels that match background
for (let x = 0; x < width; x++) {
  if (isCheckerboardOrOuter(x, 0)) queue.push(x, 0)
  if (isCheckerboardOrOuter(x, height - 1)) queue.push(x, height - 1)
}
for (let y = 0; y < height; y++) {
  if (isCheckerboardOrOuter(0, y)) queue.push(0, y)
  if (isCheckerboardOrOuter(width - 1, y)) queue.push(width - 1, y)
}

// Flood fill queue
let head = 0
while (head < queue.length) {
  const x = queue[head++]
  const y = queue[head++]
  const pos = y * width + x
  if (visited[pos]) continue
  visited[pos] = 1

  // Clear pixel alpha to transparent
  const idx = pos * 4
  pixels[idx] = 0
  pixels[idx + 1] = 0
  pixels[idx + 2] = 0
  pixels[idx + 3] = 0

  const neighbors = [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1]
  ]

  for (const [nx, ny] of neighbors) {
    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
      const nPos = ny * width + nx
      if (!visited[nPos] && isCheckerboardOrOuter(nx, ny)) {
        queue.push(nx, ny)
      }
    }
  }
}

// Crop bounding box of Snorlax
let minX = width, maxX = 0, minY = height, maxY = 0
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * 4
    if (pixels[idx + 3] > 10) {
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }
}

console.log(`Bounding box: x=${minX}..${maxX}, y=${minY}..${maxY}`)

const cropW = maxX - minX + 1
const cropH = maxY - minY + 1
const croppedPixels = Buffer.alloc(cropW * cropH * 4)

for (let y = 0; y < cropH; y++) {
  for (let x = 0; x < cropW; x++) {
    const srcIdx = ((minY + y) * width + (minX + x)) * 4
    const dstIdx = (y * cropW + x) * 4
    croppedPixels[dstIdx] = pixels[srcIdx]
    croppedPixels[dstIdx + 1] = pixels[srcIdx + 1]
    croppedPixels[dstIdx + 2] = pixels[srcIdx + 2]
    croppedPixels[dstIdx + 3] = pixels[srcIdx + 3]
  }
}

const outPng = encodePNG(cropW, cropH, croppedPixels)
const targetPath = path.resolve(__dirname, '../src/renderer/assets/img/snorlexSleepTransparent.png')
fs.writeFileSync(targetPath, outPng)
console.log('Saved transparent Snorlax to:', targetPath, `(${cropW}x${cropH})`)
