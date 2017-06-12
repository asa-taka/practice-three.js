const ghPages = require('gh-pages')

ghPages.publish('.', {
  branch: 'gh-pages',
  repo: 'https://github.com/lbcat/practice-three.js.git'
})
