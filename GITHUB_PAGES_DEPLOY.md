# How to Publish a Vite React App to GitHub Pages

This guide provides step-by-step commands to deploy a Vite React application to GitHub Pages.

## Prerequisites
- Node.js installed
- A GitHub account
- A Git repository initialized

## Steps to Deploy

### 1. Install the `gh-pages` package
```
bash
npm install -D gh-pages
```

### 2. Update package.json
Add the following scripts and homepage field to your `package.json`:

```
json
{
  "homepage": "https://yourusername.github.io/repository-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### 3. Configure vite.config.ts
Update your vite config to set the base path:

```
typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/repository-name/',
  plugins: [react()],
})
```

### 4. Build and Deploy
Run the following command to deploy:

```bash
npm run deploy
```

### 5. Enable GitHub Pages
1. Go to your repository on GitHub
2. Navigate to Settings > Pages
3. Under "Build and deployment", select:
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)
4. Click Save

### 6. Wait for Deployment
GitHub Pages will deploy your app. This may take a few minutes. Once complete, your app will be live at:
```
https://yourusername.github.io/repository-name
```

## Alternative: Using GitHub Actions (Automatic Deployments)

### Option A: Using Vite's Built-in Action
Create `.github/workflows/deploy.yml`:

```
yaml
name: Deploy

on:
  push:
    branches: [master]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Option B: Using gh-pages Package
Create `.github/workflows/deploy.yml`:

```
yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Important Notes

### Asset Path Issues
If your app works locally but fails on GitHub Pages, check your asset paths:

1. **In index.html**: Use absolute paths
   
```
html
   <link rel="icon" href="/repository-name/logo.png" />
   
```

2. **In React components**: Use import or require
   
```
jsx
   import logo from './logo.png';
   <img src={logo} alt="Logo" />
   
```

3. **In vite.config.ts**: Set the base option
   
```
typescript
   export default defineConfig({
     base: '/repository-name/',
   })
   
```

### Troubleshooting

**404 Error after deployment:**
- Ensure `base` in vite.config.ts matches your repository name
- Check that GitHub Pages is enabled in repository settings

**Assets not loading:**
- Verify all asset paths are relative or use the base path
- Clear your browser cache

**Build fails:**
- Check Node.js version compatibility
- Ensure all dependencies are in package.json

## How to Update Your Deployed App

### Method 1: GitHub Actions (Automatic - Recommended)

If you have GitHub Actions set up, simply push your changes to the master branch:

```
bash
# 1. Make your code changes
# 2. Stage the changes
git add .

# 3. Commit with a descriptive message
git commit -m "Description of your changes"

# 4. Push to GitHub
git push origin master

# GitHub Actions will automatically build and deploy!
```

### Method 2: Manual Deploy (Using gh-pages)

```
bash
# 1. Make your code changes

# 2. Build the project
npm run build

# 3. Deploy to GitHub Pages
npm run deploy

# Or use npx directly
npx gh-pages -d dist
```

### Method 3: Force Clean Deploy

If you need a completely fresh deployment:

```
bash
# Remove the gh-pages branch locally
git branch -D gh-pages

# Remove remote gh-pages branch
git push origin :gh-pages

# Deploy fresh
npm run deploy
```

### Common Update Scenarios

#### Adding new features:
```
bash
git add .
git commit -m "Add new feature"
git push origin master
```

#### Fixing bugs:
```
bash
git add .
git commit -m "Fix bug in cart"
git push origin master
```

#### Updating dependencies:
```
bash
npm update
git add package.json package-lock.json
git commit -m "Update dependencies"
git push origin master
```

### Updating Tips

1. **Check build output**: Always run `npm run build` locally first to catch any errors
2. **Clear browser cache**: After updates, users may need to clear cache or use incognito mode
3. **Wait for deployment**: GitHub Actions typically takes 1-3 minutes to complete
4. **Check Actions tab**: Visit your repository's Actions tab to see deployment status

## Quick Commands Summary

```
bash
# Install gh-pages
npm install -D gh-pages

# Deploy manually
npm run deploy

# Or with npm
npm run build
npx gh-pages -d dist
```

## For This Project (Vishwa-Kart)

The repository is already configured with:
- GitHub Actions workflow in `.github/workflows/`
- Base path set to `/Vishwa-Kart/`
- Logo paths updated for GitHub Pages

To deploy, simply push to master branch:
```
bash
git add .
git commit -m "Your commit message"
git push origin master
```

The GitHub Action will automatically build and deploy your app.
