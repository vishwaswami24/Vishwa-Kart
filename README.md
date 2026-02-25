# Vishwa-Kart 🛍️

Vishwa-Kart is a **modern, fully responsive e-commerce website** specializing in premium tech accessories. Built with cutting-edge web technologies, it offers a seamless shopping experience with intuitive navigation, dynamic dark/light mode switching, and comprehensive product management features. The platform showcases a curated collection of high-quality gadgets, including wireless headphones, smart watches, phone cases, and more, all presented in a sleek, professional interface that adapts perfectly to any device.

![Recording2026-02-25174726-ezgif com-optimize](https://github.com/user-attachments/assets/4ccb5198-89b9-454a-9927-f6c7d8834996)

## ✨ What's New - UI Improvements

### 🎨 Enhanced Visual Design
- **Glassmorphism Effects**: Modern frosted glass UI elements with backdrop blur
- **Gradient Animations**: Smooth animated gradients on buttons and text
- **Advanced Shadows**: Multi-layered shadows with color-matched glows
- **Improved Spacing**: Better visual hierarchy and breathing room
- **Rounded Corners**: Softer, more modern border radius (2xl)

### 🌟 Interactive Elements
- **Hover Transformations**: Cards lift and scale on hover
- **Animated Icons**: Smooth transitions and micro-interactions
- **Gradient Buttons**: Animated background gradients
- **Enhanced Product Cards**: Larger images, better layout, improved badges
- **Custom Scrollbar**: Styled scrollbar with gradient colors

### 🎭 Better Dark Mode
- **Gradient Backgrounds**: Multi-color gradient backgrounds
- **Improved Contrast**: Better text readability
- **Subtle Animations**: Pulsing background effects
- **Enhanced Borders**: Better border colors and hover states

### 📱 Responsive Improvements
- **Better Mobile Layout**: Optimized for all screen sizes
- **Touch-Friendly**: Larger tap targets and better spacing
- **Smooth Animations**: Performance-optimized transitions

(ScreenRecording2025-10-24000424-ezgif.com-video-to-gif-converter.gif)

## 🌟 Features

- **🌓 Dark/Light Mode Toggle**: Seamlessly switch between dark and light themes
- **🛒 Shopping Cart**: Add/remove products with persistent cart state
- **❤️ Wishlist**: Save favorite products for later
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds
- **🎨 Modern UI**: Clean, professional design with smooth animations
- **🔍 Product Catalog**: Browse through curated tech accessories
- **📄 Multiple Pages**: Home, Products, Cart, About, and Contact pages

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React & FontAwesome
- **Deployment**: GitHub Pages

## 🚀 Live Demo

Visit the live website: [https://vishwaswami24.github.io/Vishwa-Kart/](https://vishwaswami24.github.io/Vishwa-Kart/)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vishwaswami24/Vishwa-Kart.git
   cd Vishwa-Kart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

## 🚀 Deploy to GitHub Pages

```bash
npm run deploy
```

This will build the project and deploy it to the `gh-pages` branch.

## 📁 Project Structure

```
Vishwa-Kart/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── img/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   ├── index.css        # Global styles
│   └── style.css        # Additional styles
├── dist/                # Built files (generated)
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── README.md
```

## 🎯 Key Components

- **Header**: Navigation with dark/light mode toggle
- **HomePage**: Hero section and featured products
- **ProductsPage**: Full product catalog
- **CartPage**: Shopping cart management
- **AboutPage**: Company information
- **ContactPage**: Contact form and details
- **Footer**: Links and social media

## 🎨 Customization

### Adding New Products

Edit the `products` array in `src/App.tsx`:

```typescript
const products: Product[] = [
  {
    id: 9,
    name: 'New Product',
    price: 2999,
    image: '🆕',
    rating: 4.5,
    reviews: 50,
    category: 'New Category'
  },
  // ... more products
];
```

### Theme Customization

Modify Tailwind classes in components to customize colors, spacing, and animations.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Vishwa Swami**
- GitHub: [@vishwaswami24](https://github.com/vishwaswami24)
- LinkedIn: [Your LinkedIn Profile]

## 🙏 Acknowledgments

- Icons from [Lucide React](https://lucide.dev/) and [FontAwesome](https://fontawesome.com/)
- UI inspiration from modern e-commerce platforms
- Built with ❤️ using React and TypeScript

---

⭐ **Star this repo** if you found it helpful!
