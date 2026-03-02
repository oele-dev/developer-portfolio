const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['res.cloudinary.com', 'media.dev.to']
  },
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: '/mkdn',
        destination: 'https://github.com/oele-dev/mkdn',
        permanent: false,
      },
    ];
  },
}
