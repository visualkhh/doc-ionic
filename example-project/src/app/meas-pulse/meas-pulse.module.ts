import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MeasPulsePage} from './meas-pulse.page';
import {TranslateModule} from '@ngx-translate/core';
import {PipesModule} from '../core/pipe/pipes.module';
import {PolygonGraphModule} from '../core/components/polygon-graph/polygon-graph.module';
import {GraphkModule} from 'angular-graphk/dist';

const routes: Routes = [
    {
        path: '',
        component: MeasPulsePage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PipesModule,
        GraphkModule,
        PolygonGraphModule,
        TranslateModule.forChild(),
        RouterModule.forChild(routes)
    ],
    declarations: [MeasPulsePage]
})
export class MeasPulsePageModule {
}
