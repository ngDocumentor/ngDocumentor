import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { RendermdComponent } from '../components/rendermd/rendermd.component';


const docRoutes: Routes = [
    { path: '', component:  RendermdComponent },
    { path: '**', component:  RendermdComponent }
];

export const docRoutingProviders: any[] = [

];

export const docrouting: ModuleWithProviders = RouterModule.forChild(docRoutes);
