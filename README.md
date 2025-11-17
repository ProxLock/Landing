# ProxLock Landing Page

This is the frontend web application for **ProxLock**, a secure API proxy management platform. ProxLock provides a secure gateway for your applications, ensuring your sensitive API credentials stay safe through an innovative XORed partial key system.

## About ProxLock

ProxLock is a secure API proxy service that:
- Splits API keys into partial keys using XOR encryption, ensuring your complete key is never stored in one place
- Routes API requests through secure proxy infrastructure
- Validates app instances using Apple's Device Check for authenticity
- Dynamically constructs bearer tokens by combining partial keys at request time

## Tech Stack

- **React 19** - Modern React with the latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Clerk** - Authentication and waitlist management
- **ESLint** - Code quality and linting
- **Cloudflare Workers** - Deployment platform

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js) or **yarn**
- A code editor (VS Code recommended)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd landing
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

If you need to configure Clerk or other services, create a `.env` file in the root directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
```

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port Vite assigns).

### 5. Build for Production

```bash
npm run build
```

This will:
- Type-check the TypeScript code
- Build the optimized production bundle
- Output files to the `dist/` directory

### 6. Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Development Workflow

### Available Scripts

- `npm run dev` - Start the development server with hot module replacement
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

### Code Quality

The project uses ESLint for code quality. Run the linter before committing:

```bash
npm run lint
```

## Project Structure

```
landing/
├── src/
│   ├── components/      # Reusable React components
│   │   └── DecryptedText.tsx
│   ├── contexts/        # React context providers
│   │   └── ThemeContext.tsx
│   ├── pages/          # Page components
│   ├── assets/         # Static assets (images, icons, etc.)
│   ├── App.tsx         # Main application component
│   ├── App.css         # Application styles
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
├── wrangler.jsonc      # Cloudflare Workers configuration
└── package.json        # Dependencies and scripts
```

## Contributing

We welcome contributions to the ProxLock landing page! Here's how you can help:

### Getting Started

1. **Fork the repository** and clone your fork
2. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
   or
   ```bash
   git checkout -b fix/your-bug-fix
   ```

### Development Guidelines

1. **Follow the existing code style** - The project uses TypeScript with React best practices
2. **Write clean, readable code** - Use meaningful variable and function names
3. **Keep components focused** - Each component should have a single responsibility
4. **Test your changes** - Make sure the application runs correctly with your changes
5. **Run the linter** - Ensure your code passes ESLint checks:
   ```bash
   npm run lint
   ```

### Submitting Changes

1. **Commit your changes** with clear, descriptive commit messages:
   ```bash
   git commit -m "Add feature: description of what you added"
   ```

2. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request** on GitHub with:
   - A clear title and description
   - Details about what changes you made and why
   - Any relevant screenshots or examples

### Code Review Process

- All pull requests will be reviewed by maintainers
- Be open to feedback and suggestions
- Address any requested changes promptly
- Keep pull requests focused and reasonably sized

## License

See the [License](./License) file for details.

## Support

For questions or issues, please open an issue on GitHub or contact the maintainers.

---

**Note**: ProxLock is currently in a limited beta for Apple platforms only. Support for other platforms is planned for the future.

