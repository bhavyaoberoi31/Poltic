/** @type {import('next').NextConfig} */
const nextConfig = {
  // Increase body size limits
  experimental: {
    // Increase the maximum request body size (default is 1MB)
    isrMemoryCacheSize: 0, // Disable ISR memory caching if needed
  },
  
  // Configure server runtime limits
  serverRuntimeConfig: {
    // Server-side configuration
    maxRequestSize: '100mb',
  },
  
  // Public runtime configuration
  publicRuntimeConfig: {
    // Client-side configuration
    maxUploadSize: '50mb',
  },

  // Add headers for CORS and content length if needed
  async headers() {
    return [
      {
        source: '/api/upload/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'POST, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, x-user-id',
          },
        ],
      },
    ];
  },

  // Webpack configuration for handling large files
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Server-side optimizations
      config.externals = [...config.externals, 'formidable'];
    }
    
    return config;
  },
};

export default nextConfig;
