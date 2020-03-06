import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DashboardConfig, DashboardWidget } from 'src/app/models/models';
import { TemperatureComponent } from 'src/app/components/widgets/temperature/temperature.component';
import {FirebaseService} from '../../services/firebase.service';
import {WidgetsService} from '../../components/widgets/widgets.service';
import {HumidityComponent} from '../../components/widgets/humidity/humidity.component';

enum DisplayGrid {
    Always = 'always',
    OnDragAndResize = 'onDrag&Resize',
    None = 'none'
}

enum GridType {
    Fit = 'fit',
    ScrollVertical = 'scrollVertical',
    ScrollHorizontal = 'scrollHorizontal',
    Fixed = 'fixed',
    VerticalFixed = 'verticalFixed',
    HorizontalFixed = 'horizontalFixed'
}

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
    public options: DashboardConfig;
    public items: DashboardWidget[] = [
        {
            id: '1',
            name: 'Temperatura',
            component: 'temperature',
            cols: 4,
            rows: 6,
            y: 0,
            x: 0
        },
        {
            id: '2',
            name: 'Humedad',
            component: 'humidity',
            cols: 4,
            rows: 6,
            y: 0,
            x: 0
        }
    ];
    public components = {
        temperature: TemperatureComponent,
        humidity: HumidityComponent
      };
    constructor(private breakpointObserver: BreakpointObserver, private widgetServices: WidgetsService) {
        this.getOptions();
    }
    public getOptions() {
        this.options = {
            disablePushOnDrag: true,
            displayGrid: DisplayGrid.Always,
            draggable: {
                enabled: true,
                ignoreContent: true,
                dropOverItems: false,
                dragHandleClass: 'drag-handler',
                ignoreContentClass: 'no-drag',
            },
            emptyCellDragMaxCols: 50,
            emptyCellDragMaxRows: 50,
            enableEmptyCellClick: false,
            enableEmptyCellContextMenu: false,
            enableEmptyCellDrop: true,
            enableEmptyCellDrag: false,
            itemResizeCallback: this.itemResize.bind(this),
            gridType: GridType.Fit,
            minCols: 10, // 6
            minRows: 10,  // 6
            pushDirections: { north: true, east: true, south: true, west: true },
            pushItems: true,
            resizable: { enabled: true }
        };

    }
    public itemResize(item: DashboardWidget, itemComponent: any): void {
        this.widgetServices.reflowWidgets();
    }
}
