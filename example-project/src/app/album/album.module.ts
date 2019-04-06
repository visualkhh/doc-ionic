import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {AlbumPage} from './album.page';
import {TranslateModule} from '@ngx-translate/core';
import {MomentPipe} from '../core/pipe/moment.pipe';
import {PipesModule} from '../core/pipe/pipes.module';
import {NativeAudio} from '@ionic-native/native-audio';



const routes: Routes = [
    {
        path: '',
        component: AlbumPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PipesModule,
        TranslateModule.forChild(),
        RouterModule.forChild(routes)
    ],
    declarations: [AlbumPage],
    providers: [
    ]
})
export class AlbumPageModule {
}
