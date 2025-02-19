/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // async headers() {
    //     return [
    //         {
    //             source: "/api/:path*",
    //             headers: [
    //                 {
    //                     key: "Access-Control-Allow-Origin",
    //                     value: "*", // Укажите конкретный источник вместо "*", если нужно
    //                 },
    //                 {
    //                     key: "Access-Control-Allow-Methods",
    //                     value: "GET, POST, OPTIONS",
    //                 },
    //                 {
    //                     key: "Access-Control-Allow-Headers",
    //                     value: "Content-Type, Authorization",
    //                 },
    //             ],
    //         },
    //     ];
    // },
};

export default nextConfig;
