import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {RecommendPage} from './recommend.page';
import {TranslateModule} from '@ngx-translate/core';
import {PipesModule} from '../core/pipe/pipes.module';

const routes: Routes = [
    {
        path: '',
        component: RecommendPage
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
    declarations: [RecommendPage]
})
export class RecommendPageModule {
}
