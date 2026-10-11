# 💙 Best Friend Birthday Website 💙

A personal, interactive, and dreamy blue scrapbook birthday website created especially for your best friend.

---

## 🌟 How to View the Website

You can view the website instantly using any of these simple methods:

### Option 1: Just Double-Click (Easiest)
Simply double-click the `index.html` file in this folder to open it directly in Google Chrome, Microsoft Edge, Safari, or Firefox!

### Option 2: Using VS Code Live Server (Recommended for Editing)
1. Open this folder in Visual Studio Code.
2. If you have the "Live Server" extension installed, right-click `index.html` and click **"Open with Live Server"**.
3. It will open at `http://127.0.0.1:5500/index.html`.

### Option 3: Using Python Local Server
Open PowerShell in this folder and run:
```powershell
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## ✏️ How to Customize Your Content in `config.js`

Everything on the website is configured in one clean, friendly file: **`config.js`**.  
You don't need to know any programming to edit it! Just open `config.js` in Notepad or VS Code and edit the text between the quotes.

### 1. Adding Your Exact Birthday Letter 💌
In `config.js`, find `letterScreen`:
```javascript
letterScreen: {
  title: "A little letter for you ♡",
  letterContent: `Paste your exact birthday letter here!
  All your paragraphs, spaces, and emojis will be preserved exactly as you write them.`,
  signature: "With all my love, always ♡"
}
```

### 2. Adding Your Poem ("My Favourite Kind of Pretty") 🩵
In `config.js`, find `poemScreen`:
```javascript
poemScreen: {
  heading: "My Favourite Kind of Pretty",
  stanzas: [
    [
      "First line of stanza 1",
      "Second line of stanza 1"
    ],
    [
      "First line of stanza 2",
      "Second line of stanza 2"
    ]
  ]
}
```

### 3. Editing Photo Captions & Order 📸
In `config.js`, find `photoAlbumScreen.photos`. Each photo has:
- `src`: The file name of your photo (e.g., `./234a0201-4546-4274-ac7c-08d7a2084954.jfif`)
- `caption`: Your personal caption
- `date` or `tag`: Little scrapbooking note
- `rotation`: Slight tilt in degrees (-3 to 3) for the scrapbook feel

### 4. Editing Friendship Memories 🫂
In `config.js`, find `memoriesScreen.memories`. All 9 memories from your friendship are listed there. You can edit their titles, descriptions, and attach any of your photos to them!

### 5. Changing the Final Featured Photograph
In `config.js`, find `finalScreen.finalPhoto`:
```javascript
finalPhoto: "./d2c475c2-8ac7-427f-a9f4-c64706fad886.jfif"
```
You can point this to any photo file in the folder that you want featured on the sentimental closing screen!

---

## 🎨 Design Features Included
- **Palette**: Powder blue, cornflower blue, ice blue, soft navy accents, cream paper texture.
- **Screen 1**: Realistic birthday cake with glowing flames, "Make a wish", "Blow candles", extinguished flames + smoke + confetti burst.
- **Screen 2**: Interactive 3D gift box with ribbon that opens to reveal 4 gift cards.
- **Screen 3**: Animated powder-blue envelope that opens with a sliding cream letter.
- **Screen 4**: Polaroid scrapbook photo album with next/previous buttons, arrow keys, and click-to-zoom Lightbox.
- **Screen 5**: Scrapbook memory cards for all 9 friendship memories with tags, pins, and photos.
- **Screen 6**: Dedicated poem screen for "My Favourite Kind of Pretty" with delicate flower accents.
- **Screen 7**: Sentimental ending with cream envelope, your exact words, featured photo, floating hearts, and closing quotes.
- **Accessibility & Motion**: Full support for mobile screens, tablet, and `prefers-reduced-motion`.
