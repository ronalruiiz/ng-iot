import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MqttModule, IMqttServiceOptions } from 'ngx-mqtt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MaterialModule } from './material.module';
import { ComponentsModule } from './components/components.module';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {  AngularFireDatabaseModule } from '@angular/fire/database';
import { ReportPageComponent } from './pages/report-page/report-page.component';
import {MatPaginatorModule, MatSelectModule} from '@angular/material';
import { CdkTableExporterModule} from 'cdk-table-exporter'
import { MatTableExporterModule } from 'mat-table-exporter'
import { FormsModule } from '@angular/forms';
import { ControllerPageComponent } from './pages/controller-page/controller-page.component';
import { GridsterModule } from 'angular-gridster2';
import { TemperatureComponent } from './components/widgets/temperature/temperature.component';
import { HumidityComponent } from './components/widgets/humidity/humidity.component';
import { DynamicModule } from 'ng-dynamic-component';
import { DevicePageComponent } from './pages/device-page/device-page.component';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    hostname: '<Host>',
    port: 8083,
    username: '<Username>',
    password: '<password>',
    path: '<path>'
}

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        ReportPageComponent,
        ControllerPageComponent,
        DevicePageComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxChartsModule,
        DynamicModule.withComponents([TemperatureComponent, HumidityComponent]),
        MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
        BrowserAnimationsModule,
        MaterialModule,
        GridsterModule,
        FormsModule,
        MatTableExporterModule,
        CdkTableExporterModule,
        ComponentsModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule.enablePersistence(),
        MatPaginatorModule,
        MatSelectModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
