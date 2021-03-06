/**
 * moduleName，在这里更改开发/打包的module
 * 若配置为 * 则打出来全部module
 * @type {{$AppProjectName: string}}
 */
let config = {
  // $ModuleName: 'vote_activity'
  // $ModuleName: 'vote_history'
  $ModuleName: '*'
};

if (process.env.NODE_ENV === 'production') {
  // 生产环境
  Object.assign(config, {
    WebServerUrl: 'http://192.168.33.139:10086',
  })
} else {
  // 开发环境
  Object.assign(config, {
    // WebServerUrl: 'http://localhost:10086',
    WebServerUrl: 'http://192.168.33.139:10086',
  })
}

module.exports = config
