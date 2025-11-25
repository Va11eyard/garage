/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: '**' },
            { protocol: 'http', hostname: '**' }
        ]
    },
    typedRoutes: true,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://192.168.19.132/api/:path*', // Proxy к backend
            },
        ]
    },
}

module.exports = nextConfig