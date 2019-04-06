import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {ClausePage} from './clause.page';
import {TranslateModule} from '@ngx-translate/core';
import {HTTP} from '@ionic-native/http/ngx';

const routes: Routes = [
    {
        path: '',
        component: ClausePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TranslateModule.forChild(),
        RouterModule.forChild(routes)
    ],
    providers: [HTTP],
    declarations: [ClausePage]
})
export class ClausePageModule {
}
