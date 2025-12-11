/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure static files are properly handled
  // Vercel automatically serves files from public/, but this ensures proper handling
  images: {
    // Disable image optimization for large static images if needed
    unoptimized: false,
  },
};

export default nextConfig;

