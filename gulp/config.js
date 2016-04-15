var dest = './build';
var src = './src';

// Assign each task object to module.exports
module.exports = {
  html: {
    src: src + '/*.html',
    dest: dest
  },
  blog: {
    src: src + '/blog/**/*.html',
    dest: dest + '/blog'
  },
  interview: {
    src: src + '/interview-questions/**/*.html',
    dest: dest + '/interview-questions'
  },
  projects: {
    src: src + '/projects/**/*.html',
    dest: dest + '/projects'
  },
  sass: {
    src: src + '/**/*.{sass,scss}',
    dest: dest,
    settings: {
      // Enable .sass syntax
      indentedSyntax: true
    }
  },
  images: {
    src: src + '/**/*.{png,jpg}',
    dest: dest + '/images'
  },
  fonts: {
    src: src + '/fonts/**/*',
    dest: dest + '/fonts/',
    extensions: ['woff2', 'woff', 'eot', 'ttf']
  },
  icons: {
    src: src + '/components/**/*.svg',
    dest: dest + '/icons'
  },
  scripts: {
    src: src + '/blog/percent-renewable/**/*.js',
    dest: dest + '/js/'
  },
  webpack: {
    src: src + '/**/*.js',
    dest: dest + '/js/',
    entryPoint: src + '/app.js',
  },
  server: {
    serverFile: './server.js'
  }
};
