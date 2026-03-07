# Pavlin Moinov - Portfolio

A cyberpunk/sci-fi themed portfolio website with game-like interface elements.

## 🚀 Features

### Landing Page
- Large "HI" logo with glowing effects
- Welcome message with game/sci-fi theme
- "Enter the System" button to access main dashboard
- Loading screen with spinner animation

### Main Dashboard
- **Level & XP System**: Shows level 48 with 1,425 chars awarded
- **Search & Local Time**: Real-time clock displays
- **Profile Section**: Character card with occupation and organization info
- **Three Home States**:
  1. **Default View**: Hero section with tabs (Beginning, Logs, Achievements, Creations, Games)
  2. **Open for Hire**: Contact form for project inquiries
  3. **Connect with Me**: Contact form for general connections + credits section

### Interactive Elements
- **Achievements System**: Track progress with legendary, epic, rare, and uncommon achievements
- **3D Carousel**: Showcase projects with circular rotating carousel
- **Quest Panel**: Active quest display with goals and rewards
- **Settings**: Toggle sound effects, music, and visual settings
- **Scanline Effect**: CRT monitor aesthetic overlay
- **Keyboard Navigation**: Arrow keys, ESC, Ctrl+Enter shortcuts

## ✨ Best Practices Implemented

### SEO Optimization
- ✅ Meta tags for search engines
- ✅ Open Graph tags for social media
- ✅ Twitter Card tags
- ✅ Semantic HTML structure
- ✅ robots.txt and sitemap.xml
- ✅ Descriptive alt texts for images

### Performance
- ✅ Lazy loading for images
- ✅ GZIP compression (.htaccess)
- ✅ Browser caching
- ✅ Preloading critical assets
- ✅ Performance monitoring

### Accessibility
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Semantic HTML5 elements
- ✅ Focus states for all interactive elements
- ✅ Screen reader friendly

### Security
- ✅ Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection)
- ✅ HTTPS ready (uncomment in .htaccess)

### Progressive Web App (PWA)
- ✅ manifest.json for app-like experience
- ✅ Theme color meta tag
- ✅ Mobile-optimized viewport

### Analytics Ready
- ✅ Google Analytics integration ready
- ✅ Event tracking for user interactions
- ✅ Page view tracking

## 📁 File Structure

```
portfolio/
├── index.html          # Main HTML structure
├── styles.css          # All styles and animations
├── script.js           # Interactive functionality
├── manifest.json       # PWA configuration
├── robots.txt          # SEO crawler instructions
├── sitemap.xml         # Site structure for search engines
├── .htaccess           # Apache server configuration
├── simracing-academy.png  # Project screenshot
└── README.md           # Documentation
```

## Customization Guide

### 1. Update Profile Information
In `index.html`, find the `.profile-info` section and update:
- `LUZ WINTFRIEDER` → Your name
- `WEB DEVELOPER` → Your occupation
- `LEGACY AI` → Your organization/company
- Add your profile image by replacing `profile.jpg`

### 2. Update Achievements
Find the `.achievement-list` section and modify achievements with:
- Custom icons (emojis or icon fonts)
- Your actual achievements and dates
- Rarity levels: `legendary`, `epic`, `rare`, `uncommon`

### 3. Add Your Projects
In `script.js`, update the `projects` array:
```javascript
const projects = [
    {
        title: 'YOUR PROJECT NAME',
        type: 'PROJECT TYPE',
        description: 'Project description...',
        image: 'path/to/image.jpg',
        link: 'https://project-url.com'
    },
    // Add more projects...
];
```

### 4. Customize Colors
In `styles.css`, modify the CSS variables:
```css
:root {
    --primary-red: #ff5757;    /* Main accent color */
    --dark-bg: #0a0a0a;        /* Background color */
    /* Add more custom colors */
}
```

### 5. Add Hero Image
Replace the whale image reference with your own:
- Find all instances of `whale.jpg` in `index.html`
- Replace with your image path

### 6. Update Tab Content
Add your content to each tab section:
- **Beginning**: Your origin story
- **Logs**: Development logs/blog posts
- **Achievements**: Your milestones
- **Creations**: Your projects
- **Games**: Gaming projects or interests

### 7. Configure Contact Forms
Forms currently show alerts. To integrate with a backend:
1. Update form submission handlers in `script.js`
2. Connect to your preferred email service (EmailJS, Formspree, etc.)
3. Or connect to your own backend API

## Features to Add

### Optional Enhancements:
1. **Audio**: Add sound effects and background music
   - Create a `sounds/` folder
   - Add click.mp3, hover.mp3, etc.
   - Uncomment audio code in `script.js`

2. **Images**: Add actual project images
   - Create an `images/` folder
   - Add project screenshots
   - Update image paths in the projects array

3. **Animations**: Enhance with more effects
   - Particle systems
   - Mouse-following effects
   - Page transition animations

4. **Responsive Images**: Add real profile photo and background images

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- Vanilla JavaScript
- Google Fonts (Orbitron, Rajdhani)

## Color Scheme

- **Primary**: Red (#ff5757) - Main accent, borders, highlights
- **Background**: Black (#0a0a0a) - Main background
- **Text**: White/Gray - Primary and secondary text
- **Achievement Tiers**:
  - Legendary: Gold (#ffd700)
  - Epic: Red (#ff5757)
  - Rare: Blue (#4a90ff)
  - Uncommon: Green (#4ade80)

## Keyboard Shortcuts

- `ESC` - Return to default home view
- `Ctrl + Enter` - Submit active form

## Credits

Design inspired by cyberpunk/sci-fi game interfaces with elements from:
- Cyberpunk 2077
- Deus Ex
- Hacking/terminal aesthetics

## License

Free to use and modify for your personal portfolio.

---

**Note**: Replace all placeholder text and images with your actual content to make this portfolio truly yours!
