import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../modules/main-site/home/home.component';
import { ErrorComponent } from '../modules/main-site/error/error.component';


const appRoutes: Routes = [
    { path: '', component:  HomeComponent },
    { path: 'error', component:  ErrorComponent },
    { path: 'docs', loadChildren: 'app/modules/documentation/documentation.module#DocumentationModule' },
    { path: '**', redirectTo: '/error', pathMatch: 'full' }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
