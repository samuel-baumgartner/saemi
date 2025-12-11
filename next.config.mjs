/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure static files are properly served
  // This helps with case-sensitive file systems in production
  output: 'standalone', // Optional: for better deployment compatibility
};

export default nextConfig;

