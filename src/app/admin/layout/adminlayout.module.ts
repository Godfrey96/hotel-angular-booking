import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContentComponent } from './main-content/main-content.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';

import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MainContentComponent,
    SidebarComponent,
    TopbarComponent,
    AdminFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MainContentComponent,
    SidebarComponent,
    TopbarComponent,
    AdminFooterComponent
  ]
})
export class AdminLayoutModule { }
