import { NgModule } from '@angular/core';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        ],
    declarations: [
        NopagefoundComponent,
        SidebarComponent,
        HeaderComponent,
        BreadcrumbsComponent,
    ],
    exports: [
        NopagefoundComponent,
        SidebarComponent,
        HeaderComponent,
        BreadcrumbsComponent,
    ]
})

export class SharedModule {}
