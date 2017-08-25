import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BangunanMapPage } from './bangunanMap';

@NgModule({
  declarations: [
    BangunanMapPage,
  ],
  imports: [
    IonicPageModule.forChild(BangunanMapPage),
  ],
})
export class BangunanPageModule {}
