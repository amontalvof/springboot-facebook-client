/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            'upload.wikimedia.org',
            'randomuser.me',
            'avatars.dicebear.com',
            'images.pexels.com',
            'platform-lookaside.fbsbx.com',
            'static.xx.fbcdn.net',
        ],
    },
};

module.exports = nextConfig;
