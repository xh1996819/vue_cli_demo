module.exports = {
  presets: [
    ['@babel/preset-env',      //添加 babel-preset-env 配置 
      {
        'modules': false
      }
    ]
  ],
  "ignore": ["./src/assets/mui-master/js/mui.js"],
  plugins: [        // element官方教程
    [
      'component',
      {
        'libraryName': 'mint-ui',
        style: true
      }
    ]
  ]
}
