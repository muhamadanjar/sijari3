import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KuesionerlistPage } from './kuesionerlist';

@NgModule({
  declarations: [
    KuesionerlistPage,
  ],
  imports: [
    IonicPageModule.forChild(KuesionerlistPage),
  ],
})
export class KuesionerlistPageModule {}
