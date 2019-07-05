# ios构建注意事项
- 确认id为hwlcode
- 构建时加上--buildFlag='-UseModernBuildSystem=0' 这是xcode升级到10的兼容问题
```cordova build ios --buildFlag='-UseModernBuildSystem=0'```
- 注意版本号
- 只支持iphone,不支持pad模式
- Privacy - Camera Usage Description = '上传用户头像需要调用相机权限'
- Privacy - Photo Library Usage Description = '上传用户头像需要调用相册权限'

# android构建注意事项
- 确认id为com.gxyingken.hwlcode
- 注意版本号
- android studio 编绎的时候直接把gradle-warppper.properites 里面的
`distributionUrl=https\://services.gradle.org/distributions/gradle-4.1-all.zip`
改为4.4, 会直接跳过版本检测
`distributionUrl=https\://services.gradle.org/distributions/gradle-4.4-all.zip`

# ionic info backup

```
Ionic:

   Ionic CLI          : 5.0.2 (/usr/local/lib/node_modules/ionic)
   Ionic Framework    : ionic-angular 3.9.2
   @ionic/app-scripts : 3.2.4

Cordova:

   Cordova CLI       : 9.0.0 (cordova-lib@9.0.1)
   Cordova Platforms : ios 5.0.1
   Cordova Plugins   : cordova-plugin-ionic-keyboard 2.1.3, cordova-plugin-ionic-webview 4.1.0, (and 11 other plugins)

Utility:

   cordova-res : 0.3.0
   native-run  : 0.2.5

System:

   ios-deploy : 1.9.2
   ios-sim    : 8.0.1
   NodeJS     : v10.14.1 (/usr/local/bin/node)
   npm        : 6.9.0
   OS         : macOS Mojave
   Xcode      : Xcode 10.2.1 Build version 10E1001
    
```

