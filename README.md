# 14 Days of Love - Valentine's Day Website

A beautiful, minimal, and sophisticated Valentine's Day website that unlocks one day at a time from February 1st to February 14th.

## Features

✨ **14-Day Calendar View** - Days unlock sequentially from Feb 1-14
🎵 **Background Music** - Each day plays a unique song
📸 **Photo Memories** - Display a special photo for each day
💕 **Romantic Shayari** - Beautiful Hindi poetry expressing intense love
🌸 **Pixel Art Bouquet** - A flower bouquet created from all 14 photo colors
💌 **Love Letter** - A heartfelt letter on the final page

## Color Palette

- Primary Blue: `#3D74B6`
- Cream: `#FBF5DE`
- Peach: `#EAC8A6`
- Red: `#DC3C22`

## Font

NCL Gasdrifo (sophisticated and romantic)

## Setup Instructions

### 1. Prerequisites

- **Visual Studio Code** (VS Code)
- **Live Server Extension** for VS Code
  - Install from: Extensions → Search "Live Server" → Install

### 2. Add Your Content

#### A. Add Font
1. Download the **NCL Gasdrifo** font (NCLGasdrifo.ttf)
2. Place it in the `fonts/` folder
3. If you don't have this font, the website will fall back to Georgia

#### B. Add Photos
1. Prepare 14 photos (one for each day)
2. Name them: `day1.jpg`, `day2.jpg`, ..., `day14.jpg`
3. Place them in the `images/` folder
4. Recommended size: 800x500 pixels or similar aspect ratio
5. Supported formats: .jpg, .jpeg, .png

#### C. Add Songs
1. Prepare 14 songs/audio files (one for each day)
2. Name them: `day1.mp3`, `day2.mp3`, ..., `day14.mp3`
3. Place them in the `songs/` folder
4. Supported formats: .mp3, .wav, .ogg

#### D. Customize the Love Letter (Optional)
1. Open `days/letter.html` in a text editor
2. Replace `[Your Name]` with your actual name
3. Edit the letter content to personalize it

### 3. Running the Website Locally

#### Method 1: Using VS Code Live Server (Recommended)

1. Open VS Code
2. Open the `valentine-website` folder: File → Open Folder
3. Right-click on `index.html` in the file explorer
4. Select **"Open with Live Server"**
5. Your default browser will open with the website
6. The website will auto-refresh when you make changes

#### Method 2: Direct File Opening

1. Navigate to the `valentine-website` folder
2. Double-click `index.html`
3. It will open in your default browser

**Note:** Some features (like background music autoplay) work better with Live Server due to browser security policies.

### 4. Testing the Date Unlocking

The website unlocks days based on the current date. To test:

- **Real Testing:** Wait for the actual dates (Feb 1-14, 2025)
- **Development Testing:** Modify the date check in `js/calendar.js`:
  
  Change line 16-22:
  ```javascript
  function isDayUnlocked(dayData) {
      const now = new Date();
      const targetDate = new Date(dayData.year, dayData.month - 1, dayData.day);
      
      now.setHours(0, 0, 0, 0);
      targetDate.setHours(0, 0, 0, 0);
      
      return now >= targetDate;
  }
  ```
  
  To (for testing - unlocks all days):
  ```javascript
  function isDayUnlocked(dayData) {
      return true; // Unlock all days for testing
  }
  ```

  **Important:** Change this back before deploying for your girlfriend!

## File Structure

```
valentine-website/
├── index.html                 # Main calendar page
├── css/
│   └── style.css             # All styling
├── js/
│   └── calendar.js           # Calendar logic and date unlocking
├── days/
│   ├── day1.html - day13.html   # Individual day pages
│   ├── day14.html            # Valentine's Day (special)
│   ├── bouquet.html          # Pixel art flower bouquet
│   └── letter.html           # Final love letter
├── images/
│   ├── day1.jpg - day14.jpg  # Your photos (add these)
│   └── README.txt
├── songs/
│   ├── day1.mp3 - day14.mp3  # Your songs (add these)
│   └── README.txt
├── fonts/
│   ├── NCLGasdrifo.ttf       # Font file (add this)
│   └── README.txt
└── README.md                  # This file
```

## How It Works

### Calendar Page (index.html)
- Displays 14 days in a grid layout
- Days are locked (🔒) until their actual date
- Day 14 (Valentine's Day) has special red styling
- Click unlocked days to view their content

### Day Pages (day1.html - day14.html)
- Each day shows:
  - A unique photo
  - Background music (plays automatically)
  - Romantic Shayari in Hindi
  - Back button to calendar

### Valentine's Day Special (day14.html)
- Special Valentine's Day message
- Button to view the pixel bouquet

### Pixel Bouquet (bouquet.html)
- Generates a flower bouquet using canvas
- Uses colors extracted from your 14 photos
- Button to view the love letter

### Love Letter (letter.html)
- Final heartfelt message
- Customizable content
- Back navigation

## Customization Tips

### Change Shayari
Edit the Shayari in individual day files (`days/day1.html` - `days/day14.html`):
```html
<div class="shayari">
    Your custom Shayari here<br>
    Line 2<br>
    Line 3<br>
    Line 4
</div>
```

### Adjust Music Volume
In each day file, find this line and change the volume (0.0 to 1.0):
```javascript
audio.volume = 0.3; // Change 0.3 to desired volume
```

### Change Colors
Edit `css/style.css` and modify the CSS variables at the top:
```css
:root {
    --primary-blue: #3D74B6;
    --cream: #FBF5DE;
    --peach: #EAC8A6;
    --red: #DC3C22;
}
```

## Troubleshooting

### Images not showing
- Check file names match exactly: `day1.jpg`, `day2.jpg`, etc.
- Ensure files are in the `images/` folder
- Check file extensions (.jpg, .jpeg, .png)

### Music not playing
- Ensure files are named: `day1.mp3`, `day2.mp3`, etc.
- Check they're in the `songs/` folder
- Some browsers block autoplay - click anywhere on the page to start
- Use Live Server for better autoplay support

### Font not displaying
- Ensure `NCLGasdrifo.ttf` is in the `fonts/` folder
- Check the file name matches exactly
- Refresh the page (Ctrl+F5 or Cmd+Shift+R)

### Days not unlocking on correct dates
- Check your computer's date and time settings
- Ensure the dates in `js/calendar.js` are set to 2025
- For testing, temporarily modify the `isDayUnlocked` function

### Live Server not working
1. Install Live Server extension in VS Code
2. Make sure you opened the folder (not just the file)
3. Right-click `index.html` → "Open with Live Server"

## Browser Compatibility

✅ Chrome/Edge (Recommended)
✅ Firefox
✅ Safari
⚠️ Internet Explorer (Not supported)

## Tips for Best Experience

1. **Use headphones** for the best music experience
2. **Full screen mode** (F11) for immersive viewing
3. **Visit at midnight** on each day for the authentic unlock experience
4. **Mobile-friendly** - works great on phones and tablets too

## Credits

Created with ❤️ for Valentine's Day 2025

## License

Personal use only. Made with love for that special someone.

---

**Enjoy creating beautiful memories!** 💕
