# @suyanksaraswat/design-system

A modern, accessible, and customizable React component library built with Tailwind CSS and Radix UI primitives.

## ✨ Features

- 🎨 **Beautiful Components** - Pre-built, accessible components
- 🎯 **TypeScript** - Full TypeScript support
- 🎨 **Customizable** - Easy theming with CSS variables
- 📱 **Responsive** - Mobile-first design approach
- ♿ **Accessible** - Built with accessibility in mind
- 🚀 **Tree-shakable** - Import only what you need
- 🎨 **Tailwind CSS** - Powered by Tailwind CSS utilities

## 📦 Installation

```bash
# Using npm
npm install @suyanksaraswat/design-system lucide-react

# Using pnpm
pnpm add @suyanksaraswat/design-system lucide-react

# Using yarn
yarn add @suyanksaraswat/design-system lucide-react
```

## 🚀 Quick Start

### 1. Install Tailwind CSS

If you don't have Tailwind CSS installed in your project:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Configure Tailwind CSS

Update your `tailwind.config.js`:

```js
import sharedConfig from "@suyanksaraswat/design-system/tailwind.config.ts";

export default {
  ...sharedConfig,
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@suyanksaraswat/design-system/dist/**/*.js", // Important!
  ],
};
```

**⚠️ Important**: Make sure to include the design system package in your `content` array so Tailwind can generate the utility classes.

### 3. Import CSS

Add the theme CSS to your main CSS file:

```css
@import "@suyanksaraswat/design-system/theme.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. Use Components

```jsx
import { Button } from "@suyanksaraswat/design-system/button";
import { HomeIcon, SearchIcon } from "@suyanksaraswat/design-system/icons";

export function App() {
  return (
    <div>
      <Button variant="default">Click me</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Delete</Button>

      {/* Using custom icons */}
      <HomeIcon size={24} className="text-primary" />
      <SearchIcon size={24} className="text-primary" />
    </div>
  );
}
```

## 🎯 Icons

The design system includes custom SVG icons with two flexible import patterns for optimal tree-shaking and bundle optimization.

### Import Patterns

#### 1. All Icons Import (Recommended for multiple icons)

```jsx
import { HomeIcon, SearchIcon } from "@suyanksaraswat/design-system/icons";

export function Navigation() {
  return (
    <div>
      <HomeIcon size={24} className="text-primary" />
      <SearchIcon size={24} className="text-primary" />
    </div>
  );
}
```

#### 2. Individual Icon Imports (Best for single icons)

```jsx
import { HomeIcon } from "@suyanksaraswat/design-system/icons/home";
import { SearchIcon } from "@suyanksaraswat/design-system/icons/search";

export function Header() {
  return (
    <div>
      <HomeIcon size={24} className="text-primary" />
      <SearchIcon size={24} className="text-primary" />
    </div>
  );
}
```

### Why Two Import Patterns?

- **All Icons Import**: Convenient when using multiple icons, still tree-shakeable
- **Individual Imports**: Maximum tree-shaking, smallest bundle size for single icons
- **Flexibility**: Choose the pattern that fits your use case

### Icon Props

All custom icons accept standard SVG props:

```jsx
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

// Usage examples
<HomeIcon size={24} className="text-primary" />
<SearchIcon size={32} strokeWidth={1.5} />
<HomeIcon width={20} height={20} fill="currentColor" />
```

### Available Icons

- `HomeIcon` - Home navigation icon
- `SearchIcon` - Search functionality icon
- _More icons coming soon..._

### Adding New Icons

When new icons are added to the design system, they automatically support both import patterns:

```jsx
// New icon will be available in both patterns
import { NewIcon } from "@suyanksaraswat/design-system/icons";
// or
import { NewIcon } from "@suyanksaraswat/design-system/icons/new";
```

## 🎨 Available Components

- **Button** - Various button styles and sizes
- **Alert** - Alert messages and notifications
- **Icons** - Custom SVG icons and Lucide React icons
- **More coming soon...**

## 🎨 Theming

### Using CSS Variables

The design system uses CSS custom properties for theming. You can override any variable:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --background: 0 0% 100%;
  --foreground: 222.2 47.4% 11.2%;
  /* ... more variables */
}
```

### Dark Mode

Dark mode is supported out of the box:

```css
.dark {
  --background: 224 71% 4%;
  --foreground: 213 31% 91%;
  /* ... dark mode variables */
}
```

## 🔧 Troubleshooting

### Styles Not Appearing

If you see the HTML classes but no styling:

1. **Check Tailwind Config**: Ensure the design system is included in your `content` array:

   ```js
   content: [
     "./src/**/*.{js,ts,jsx,tsx}",
     "./node_modules/@suyanksaraswat/design-system/dist/**/*.js",
   ];
   ```

2. **Import CSS**: Make sure you're importing the theme CSS:

   ```css
   @import "@suyanksaraswat/design-system/theme.css";
   ```

3. **Restart Dev Server**: After changing Tailwind config, restart your development server

4. **Clear Cache**: Try a hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

### TypeScript Issues

If you're getting TypeScript errors:

1. **Install Types**: Make sure you have `@types/react` installed
2. **Check Imports**: Use the correct import paths:
   ```tsx
   import { Button } from "@suyanksaraswat/design-system/button";
   import { HomeIcon, SearchIcon } from "@suyanksaraswat/design-system/icons";
   ```
3. **Icon Imports**: Icons should be imported from the `/icons` path, not the main package:

   ```tsx
   // ✅ Correct
   import { HomeIcon } from "@suyanksaraswat/design-system/icons";

   // ❌ Incorrect (will cause bundle size issues)
   import { HomeIcon } from "@suyanksaraswat/design-system";
   ```

### Build Issues

If you're having build issues:

1. **Check Dependencies**: Ensure all peer dependencies are installed
2. **Node Version**: Use Node.js 16+ for best compatibility
3. **Package Manager**: We recommend using pnpm for the best experience

## 🛠️ Development

### Prerequisites

- Node.js 16+
- pnpm (recommended) or npm

### Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/suyanksaraswat/ui.git
   cd ui
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Start development**:

   ```bash
   pnpm dev
   ```

4. **Build packages**:
   ```bash
   pnpm build
   ```

### Project Structure

```
packages/
├── design-system/          # Main design system package
│   ├── src/
│   │   ├── components/     # React components
│   │   └── utils/         # Utility functions
│   └── dist/              # Built files
└── eslint-config/         # Shared ESLint config

apps/
└── docs/                  # Storybook documentation
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Reporting Issues

1. **Check existing issues** before creating a new one
2. **Use the issue template** and provide:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node version, etc.)

### Suggesting Features

1. **Open a discussion** to discuss the feature
2. **Provide use cases** and examples
3. **Consider the impact** on existing users

### Submitting Pull Requests

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**:
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation
4. **Test your changes**:
   ```bash
   pnpm build
   pnpm test
   ```
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to your branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **ESLint**: Follow the project's ESLint configuration
- **Prettier**: Code is automatically formatted with Prettier
- **Conventional Commits**: Use conventional commit messages

### Component Guidelines

When adding new components:

1. **Accessibility**: Ensure components are accessible
2. **Documentation**: Add Storybook stories
3. **Types**: Provide proper TypeScript types
4. **Variants**: Use `class-variance-authority` for variants
5. **Forward Refs**: Use `React.forwardRef` for DOM components

## 📚 Documentation

- **Storybook**: [View Components](https://your-storybook-url.com)
- **API Reference**: Check individual component files
- **Examples**: See the `apps/docs` directory

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) for inspiration
- [Lucide React](https://lucide.dev/) for beautiful icons

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/suyanksaraswat/ui/issues)
- **Discussions**: [Ask questions or share ideas](https://github.com/suyanksaraswat/ui/discussions)

---

Made with ❤️ by [@suyanksaraswat](https://github.com/suyanksaraswat)
