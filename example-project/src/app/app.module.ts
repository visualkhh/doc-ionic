import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {IonicStorageModule} from '@ionic/storage';
import {CoreModule} from './core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppVersion} from '@ionic-native/app-version/ngx';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MomentPipe} from './core/pipe/moment.pipe';
import {NativeAudio} from '@ionic-native/native-audio/ngx';
import {IonicNativePlugin} from '@ionic-native/core';
import {Downloader} from '@ionic-native/downloader/ngx';
import {DocumentViewer} from '@ionic-native/document-viewer/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {Base64} from '@ionic-native/base64/ngx';
import {File} from '@ionic-native/file/ngx';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {HTTP} from '@ionic-native/http/ngx';
import {HTTPResponse} from '@ionic-native/http/ngx';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {BackgroundMode} from '@ionic-native/background-mode/ngx';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        BrowserAnimationsModule,
        CoreModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        MomentPipe,
        Downloader,
        NativeAudio,
        FileTransfer,
        FileTransferObject,
        File, DocumentViewer, FilePath, FileChooser, FileOpener, Base64, InAppBrowser, HTTP, LocalNotifications, BackgroundMode,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, AppVersion
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
