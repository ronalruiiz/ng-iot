import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HumidityComponent } from './widgets/humidity/humidity.component';
import { TemperatureComponent } from './widgets/temperature/temperature.component';
import { MaterialModule } from '../material.module';
import { HearRateComponent } from './widgets/hear-rate/hear-rate.component';
import {ReceptorDirective} from '../directives/receptor.directive';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { CommandBarComponent } from './shared/command-bar/command-bar.component';
import { NavigationBarComponent } from './shared/navigation-bar/navigation-bar.component';
import { ActivityBarComponent } from './shared/activity-bar/activity-bar.component';
import {HighchartsChartModule} from 'highcharts-angular';

const components = [
    HumidityComponent,
    TemperatureComponent,
    HearRateComponent,
    CommandBarComponent
];

@NgModule({
    declarations: [...components, ReceptorDirective, NavigationBarComponent, ActivityBarComponent],
    imports: [CommonModule, MaterialModule, NgxChartsModule, HighchartsChartModule],
    exports: [...components, ReceptorDirective, NavigationBarComponent, ActivityBarComponent],
    providers: [],
})
export class ComponentsModule {}
