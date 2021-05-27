//nextjs config file

const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");

const nextConfig = {
  env: {
    baseUrl: process.env.BASE_URL,
    site: process.env.SITE,
  },

  images: {
    domains: [`${process.env.BASE_URL}`],
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
    $grey: #D3D3D3;
    $light-bg1: #f6fbfd;
    $light-bg2: #fdf8f6;
    $danger: #dc3545;
    $success: #28a745;`,
  },

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = withPlugins([[withImages]], nextConfig);
