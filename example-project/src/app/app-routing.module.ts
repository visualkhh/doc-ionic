import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'clause', loadChildren: './clause/clause.module#ClausePageModule' },
  { path: 'personal', loadChildren: './personal/personal.module#PersonalPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'album/:title', loadChildren: './album/album.module#AlbumPageModule' },
  { path: 'meas-history', loadChildren: './meas-history/meas-history.module#MeasHistoryPageModule' },
  { path: 'meas-pulse/:dt', loadChildren: './meas-pulse/meas-pulse.module#MeasPulsePageModule' },
  { path: 'meas-neuro/:dt', loadChildren: './meas-neuro/meas-neuro.module#MeasNeuroPageModule' },
  { path: 'meas-result/:code', loadChildren: './meas-result/meas-result.module#MeasResultPageModule' },
  { path: 'servey-history', loadChildren: './servey-history/servey-history.module#ServeyHistoryPageModule' },
  { path: 'servey-detail/:code', loadChildren: './servey-detail/servey-detail.module#ServeyDetailPageModule' },
  { path: 'servey-result/:code', loadChildren: './servey-result/servey-result.module#ServeyResultPageModule' },
  { path: 'hawayou', loadChildren: './hawayou/hawayou.module#HawayouPageModule' },
  { path: 'recommend/:pdt_ndt', loadChildren: './recommend/recommend.module#RecommendPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
