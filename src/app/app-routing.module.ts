import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ReportPageComponent } from './pages/report-page/report-page.component';
import { ControllerPageComponent } from './pages/controller-page/controller-page.component';
import {DevicePageComponent} from './pages/device-page/device-page.component';


const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'report', component: ReportPageComponent },
    { path: 'controller', component: ControllerPageComponent },
    { path: 'device', component: DevicePageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
