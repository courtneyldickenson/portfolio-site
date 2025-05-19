import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Courtney Dickenson",
  description: "Software Engineer Portfolio",
  base: "/portfolio-site/",

  head: [
    [
      'script',
      { 
        defer: '', 
        src: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js' 
      }
    ],
    [
      'script',
      {},
      'window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }'
    ]
  ],

  themeConfig: {
    nav: [
      { text: 'Projects', link: '/projects' },
      { text: 'About', link: '/about' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/courtneyldickenson' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/courtneyspencer12/' }
    ]
  }
})
