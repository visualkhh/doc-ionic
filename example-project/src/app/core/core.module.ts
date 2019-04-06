import {NgModule, ModuleWithProviders, APP_INITIALIZER, Optional, SkipSelf} from '@angular/core';
import {UserService} from './services/user.service';
import {ApiService} from './services/api.service';
import {AlertService} from './services/alert.service';
import {PipesModule} from './pipe/pipes.module';
import {ContentsService} from './services/contents.service';
import {MomentPipe} from './pipe/moment.pipe';
import {PolygonGraphComponent} from './components/polygon-graph/polygon-graph.component';


@NgModule({
    imports: [],
    exports: [],
    providers: [
        ContentsService,
        UserService,
        ApiService,
        AlertService
    ],
    declarations: []
})
export class CoreModule {
    // constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    //   throwIfAlreadyLoaded(parentModule, 'CoreModule');
    // }

}
