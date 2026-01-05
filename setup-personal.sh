#!/bin/bash

echo "╔════════════════════════════════════════════════════════════════════╗"
echo "║       Personal Task Manager - Quick Setup Script                  ║"
echo "╚════════════════════════════════════════════════════════════════════╝"
echo ""

# Check if .env.local already exists
if [ -f .env.local ]; then
    echo "⚠️  .env.local already exists!"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Skipping .env.local creation."
        exit 0
    fi
fi

# Copy .env.example to .env.local
echo "📝 Creating .env.local from template..."
cp .env.example .env.local

# Generate AUTH_SECRET
echo "🔐 Generating AUTH_SECRET..."
AUTH_SECRET=$(openssl rand -base64 32)
sed -i "s|your-secret-key-here|$AUTH_SECRET|g" .env.local

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Get Google OAuth credentials from:"
echo "   https://console.cloud.google.com/apis/credentials"
echo ""
echo "2. Edit .env.local and add:"
echo "   - GOOGLE_CLIENT_ID"
echo "   - GOOGLE_CLIENT_SECRET"
echo ""
echo "3. Add this redirect URI in Google Console:"
echo "   http://localhost:3000/api/auth/callback/google"
echo ""
echo "4. Start the dev server:"
echo "   pnpm dev"
echo ""
echo "5. Visit: http://localhost:3000/personal"
echo ""
