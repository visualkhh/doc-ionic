import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MeasNeuroPage} from './meas-neuro.page';
import {TranslateModule} from '@ngx-translate/core';
import {PipesModule} from '../core/pipe/pipes.module';
import {GraphkModule} from 'angular-graphk/dist';

const routes: Routes = [
    {
        path: '',
        component: MeasNeuroPage
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
    declarations: [MeasNeuroPage]
})
export class MeasNeuroPageModule {
}
