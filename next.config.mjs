/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // We add it to the remote pattern for the static images we use from GitHub
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.scdn.co',
            port: '',
            pathname: '/image/**',
          }
        ]
    }
};

export default nextConfig;
