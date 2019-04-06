ionic
ionic start personal-mindcare-webapp
ionic build  #or ng build

ng serve
ionic serve


# cordva
ionic cordova build ios
    resource ,platform, plugin config.xml..등등생김

resource 바꾼뒤
ionic cordova resources




--------------
ionic build
ionic cordova platform
ionic cordova platform add ios
ionic cordova platform add android

ionic cordova prepare ios


plugin list
--
ionic cordova plugin add cordova-plugin-device

ionic cordova plugin add https://github.com/kelvinhokk/cordova-plugin-localization-strings.git --fetch
ionic cordova plugin add cordova-plugin-filechooser
ionic cordova plugin add cordova-plugin-file-opener2

plugin
----
localization
npm i cordova-plugin-localization-strings
ionic cordova plugin add https://github.com/kelvinhokk/cordova-plugin-localization-strings.git --fetch
plugin>cordova-plugin-localization-strings>create_ios_strings.js 파일에 utf16을 utf8로바꾼다. 
ionic cordova build ios
ionic cordova platform add ios
ionic cordova prepare ios
ios : InfoPlist 파일생김.

translate
https://ionicframework.com/docs/v3/developer-resources/ng2-translate/
http://masteringionic.com/blog/2018-07-14-creating-a-multi-language-ionic-translation-app-with-ngx-translate/
npm install @ngx-translate/core @ngx-translate/http-loader --save



https://www.youtube.com/watch?v=e-T_8jZTrv0






build.json
https://cordova.apache.org/docs/en/8.x/guide/platforms/ios/index.html#page-toc-source
https://coursetro.com/posts/code/63/Angular-4-Animation-Tutorial
https://medium.com/codingthesmartway-com-blog/angular-6-animations-from-scratch-76e110cba5fb



animation
----
https://devdactic.com/animations-ionic-app/
https://www.javascripttuts.com/the-complete-guide-to-animations-with-ionic/

storage
---
https://ionicframework.com/docs/building/storage
ionic cordova plugin add cordova-sqlite-storage
npm install --save @ionic/storage


ionic serve
---
ionic serve
ionic serve --local
ionic serve --lab
ionic serve -- --proxy-config proxy.conf.json

ionic file api
----
 https://ionicframework.com/docs/v3/native/file/


ionic icon
----
https://ionicframework.com/docs/v3/ionicons/

--------------------------------




ionic start personal-mindcare-webapp sidemenu --appname "Hello World" --id 'com.omnicns.omnifit.mindcare.personalize'  


ionic start personal-mindcare-webapp sidemenu --appname "Hello World" --package-id 'com.omnicns.omnifit.mindcare.personalize'
npm install --save @capacitor/core @capacitor/cli
npx cap init

ng build 

npx cap add android
npx cap add ios
ionic capacitor run ios


PATH = gradle/bin
---------
ionic cordova build android

ionic cordova platform
ionic cordova platform add ios
ionic cordova platform add android
 -- ionic cordova platform rm ios
 
ionic cordova resources
ionic cordova resources ios
ionic cordova resources android

ionic cordova run android
ionic cordova run ios
ionic cordova run ios --list

/path/to/my_new_project/cordova/build --codeSignIdentity="iPhone Distribtion" --provisioningProfile="926c2bd6-8de9-4c2f-8407-1016d2d12954" 
ionic cordova run ios --livereload --buildConfig build.json
cordova emulate ios
-----------



Ionic (https://ionicframework.com/)
https://www.youtube.com/watch?v=r2ga-iXS5i4
 - front-end
  	js
	angular4
 - cross-platforms
	capacitor(https://capacitor.ionicframework.com/)
		ionic capacitor add ios
		ionic capacitor copy ios
		ionic capacitor run ios
		capacitor.config.json
			server이용 빠른반영
	cordova
 - build device
	android
	iOS
	
theme
-------
https://www.youtube.com/watch?v=RVh6nngPuNw


Setting
=====
https://ionicframework.com/docs/installation/cli

 1. npm install -g ionic
 2. ionic start myApp tabs
 3. cd myApp
 4. ionic serve
 
 
Device
---
https://medium.com/@coderonfleek/debugging-an-ionic-android-app-using-chrome-dev-tools-6e139b79e8d2

 
IOS
----
 1. npm install -g ios-sim
 2. npm install -g ios-deploy
 
ionic native http
----
https://www.youtube.com/watch?v=3QPbBJgNF94

css
---
vitual font size
https://ccuram.tistory.com/28
scroll
https://codeburst.io/how-to-create-horizontal-scrolling-containers-d8069651e9c6

ionic color
---
https://medium.com/@paulstelzer/ionic-4-how-to-add-more-colors-and-use-them-as-color-in-buttons-and-more-7175ab4ae4e7

ionic css util
---
https://ionicframework.com/docs/layout/css-utilities


ionic lab
---
npm i @ionic/lab
ionic lab
ionic serve -l
 
ionic start
----
 1. https://ionicframework.com/docs/building/starting
 
cordova
----
file : https://cordova.apache.org/docs/en/1.8.1/cordova/file/fileentry/fileentry.html
angular httpClient
---
https://www.youtube.com/watch?v=3QPbBJgNF94
validation : https://www.youtube.com/watch?v=bo1Wu0aiigU
date pipe : https://stackoverflow.com/questions/35754586/format-date-as-dd-mm-yyyy-using-pipes

javascript
---
자바스크립트의 Async/Await 가 Promises를 사라지게 만들 수 있는 6가지 이유
    https://medium.com/@constell99/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-async-await-%EA%B0%80-promises%EB%A5%BC-%EC%82%AC%EB%9D%BC%EC%A7%80%EA%B2%8C-%EB%A7%8C%EB%93%A4-%EC%88%98-%EC%9E%88%EB%8A%94-6%EA%B0%80%EC%A7%80-%EC%9D%B4%EC%9C%A0-c5fe0add656c



##build
https://ionicframework.com/docs/cli/commands/build

 1. ionic build
 1. ionic build --prod
 1. ionic cordova build ios
cordova
====

https://cordova.apache.org/docs/en/latest/config_ref/images.html


build
----
- ionic cordova build ios --list

ionic api call
---
https://www.youtube.com/watch?v=3QPbBJgNF94

ionic debugg
----
https://medium.com/one-tap-software/the-best-way-to-debug-an-ionic-app-on-a-device-79833bef5d1d
https://www.youtube.com/watch?v=9J8AxhDxtTE
	
ionic multi language
----
https://www.youtube.com/watch?v=bksZ0Bw7-bM
http://pkworlz.com/ionic-3-multi-language-example/
http://masteringionic.com/blog/2018-07-14-creating-a-multi-language-ionic-translation-app-with-ngx-translate/
https://ionicframework.com/docs/v3/developer-resources/ng2-translate/
https://www.npmjs.com/package/cordova-plugin-localization-strings
 1.npm install @ngx-translate/core @ngx-translate/http-loader --save
 

crodova
=======********
https://www.youtube.com/watch?v=-JxciEQ1YnQ

cordova platform add ios
cordova prepare              # or "cordova build"

cordova run ios --device
cordova emulate ios
ordova run ios --target="iPhone-6"

https://cordova.apache.org/docs/ko/latest/guide/platforms/android/

Custom
=======

아이콘변경
---
https://www.youtube.com/watch?v=dPUmskG_-y0 
https://ionicframework.com/docs/native/splash-screen  

2. ionic cordova plugin add cordova-plugin-splashscreen  
3. /resources 폴더에 생김 icon.png(1024*1024), splash.png(2732*2732)바꿈  
 - 이미지 웹포토샵 https://pixlr.com/editor/
4. ionic cordova resources
5. 다시만들어짐

