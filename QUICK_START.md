# QUICK START GUIDE
# Valentine's Day Website - Getting Started in 5 Minutes

## Step 1: Extract the ZIP
- Extract "valentine-website.zip" to a location on your computer
- You'll see a folder called "valentine-website"

## Step 2: Add Your Content (IMPORTANT!)

### A. Add Photos
1. Go to: valentine-website/images/
2. Add 14 photos named: day1.jpg, day2.jpg, day3.jpg... day14.jpg
3. (You can use .jpg, .jpeg, or .png format)

### B. Add Songs
1. Go to: valentine-website/songs/
2. Add 14 songs named: day1.mp3, day2.mp3, day3.mp3... day14.mp3
3. (You can use .mp3, .wav, or .ogg format)

### C. Add Font (Optional)
1. Download NCL Gasdrifo font (search online for "NCL Gasdrifo font")
2. Place NCLGasdrifo.ttf in: valentine-website/fonts/
3. (If you skip this, it will use a fallback font)

### D. Personalize the Letter
1. Open: valentine-website/days/letter.html in a text editor
2. Find "[Your Name]" and replace it with your actual name
3. Edit the letter content if you want to customize the message

## Step 3: Install VS Code (If you don't have it)
1. Download Visual Studio Code from: https://code.visualstudio.com/
2. Install it on your computer

## Step 4: Install Live Server Extension
1. Open VS Code
2. Click the Extensions icon (or press Ctrl+Shift+X)
3. Search for "Live Server"
4. Click "Install" on the one by Ritwick Dey

## Step 5: Run the Website
1. In VS Code: File → Open Folder
2. Select the "valentine-website" folder
3. In the file explorer (left sidebar), find "index.html"
4. Right-click on "index.html"
5. Select "Open with Live Server"
6. Your browser will open automatically with the website!

## Step 6: Test It
- The calendar should appear with 14 days
- Days will be locked (🔒) if it's not their date yet
- Click on an unlocked day to test
- Music should play automatically (click the page if it doesn't)

## FOR TESTING: Unlock All Days Temporarily
If you want to test everything before the actual dates:

1. Open: valentine-website/js/calendar.js
2. Find the function `isDayUnlocked` (around line 16)
3. Replace it with:
   ```javascript
   function isDayUnlocked(dayData) {
       return true; // Unlock all days for testing
   }
   ```
4. Save the file
5. Refresh your browser (Ctrl+R or Cmd+R)

**IMPORTANT:** Change this back to the original before giving it to your girlfriend!

## Troubleshooting

### Problem: Images not showing
- Check file names exactly match: day1.jpg, day2.jpg, etc.
- Make sure they're in the images/ folder

### Problem: Music not playing
- Click anywhere on the page to trigger autoplay
- Make sure files are named: day1.mp3, day2.mp3, etc.
- Check they're in the songs/ folder

### Problem: Can't open with Live Server
- Make sure you opened the FOLDER, not just the file
- Ensure Live Server extension is installed
- Try restarting VS Code

### Problem: Font not showing
- Add the NCLGasdrifo.ttf file to fonts/ folder
- Refresh the page with Ctrl+F5 (hard refresh)

## When to Give to Your Girlfriend

Option 1: Give her the folder on January 31st so she can start on February 1st
Option 2: Set it up on her computer yourself as a surprise
Option 3: Share the folder on February 1st

## Need More Help?

Read the full README.md file in the valentine-website folder for detailed instructions.

---

Made with ❤️ for Valentine's Day 2025
