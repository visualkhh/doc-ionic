import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentPipe } from './moment.pipe';

@NgModule({
  imports: [],
  declarations: [MomentPipe],
  exports: [MomentPipe]
})
export class PipesModule { }
