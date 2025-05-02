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
        'data-domain': 'courtneyldickenson.github.io/portfolio-site',
        src: 'https://plausible.io/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js'
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
  },

  
  }
)
