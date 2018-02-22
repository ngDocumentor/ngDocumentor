import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RendermdComponent } from '../modules/main-site/rendermd/rendermd.component';


const appRoutes: Routes = [
    { path: '**', component:  RendermdComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
