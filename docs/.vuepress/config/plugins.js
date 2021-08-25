module.exports = [
  '@vuepress/back-to-top',

  [
    'vuepress-plugin-comment', 
    {
      choosen: 'gitalk',
      options: {
        clientID: 'be1518da53cac2aca958',
        clientSecret: '5dd447b5555fe91104fcede32f840577e942eee9',
        repo: 'yangzheli.github.io',
        owner: 'yangzheli',
        admin: ['yangzheli'],
        distractionFreeMode: false // Facebook-like distraction free mode
      },
    },
  ]
]

