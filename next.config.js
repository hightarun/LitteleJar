//nextjs config file
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withOptimizedImages = require("next-optimized-images");

const nextConfig = {
  env: {
    baseUrl: process.env.BASE_URL,
    site: process.env.SITE,
  },

  //for next/image <Image/>
  images: {
    domains: ["localhost", `${process.env.BASE_URL}`],
  },

  sassOptions: {
    prependData: ` 
    $light: #FFFFFF;
    $dark: #242526;
    $dark1: #18191a;
    $accent1: #ff9933;
    $accent2: #ff8585;
    $txt-light: #DEE3EA;
    $txt-dark: #222222;
    $grey: #E8E8E8;
    $light-bg1: #F1F0EB;
    $light-bg2: #F2DDD5;
    $danger: #dc3545;
    $success: #28a745;`,
  },

  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true,
  // },
};

module.exports = withPlugins(
  [
    [withImages],
    [
      withOptimizedImages,
      {
        optimizeImagesInDev: true,
        gifsicle: {
          interlaced: true,
          optimizationLevel: 8,
        },
        pngquant: { quality: [0.6, 0.8] },
      },
    ],
  ],
  nextConfig
);
