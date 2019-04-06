import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MeasResultPage} from './meas-result.page';
import {GraphkModule} from 'angular-graphk/dist';
import {PipesModule} from '../core/pipe/pipes.module';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
    {
        path: '',
        component: MeasResultPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PipesModule,
        GraphkModule,
        TranslateModule.forChild(),
        RouterModule.forChild(routes)
    ],
    declarations: [MeasResultPage]
})
export class MeasResultPageModule {
}
