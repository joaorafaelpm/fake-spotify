import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images : {
    domains : ["i.scdn.co" , "mosaic.scdn.co" , "image-cdn-ak.spotifycdn.com" , "image-cdn-fa.spotifycdn.com"],
  },
  webpack(config) {
    config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack']
    });
    return config;
  }
};  


export default nextConfig;
