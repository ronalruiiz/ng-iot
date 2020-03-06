import {Injectable} from '@angular/core';
import {normalizeCommonJSImport} from '../normalizeCommonJSImport';

// import * as Highcharts from 'highcharts';
// WebStorm -> tsconfig.lib.json
const loadHighcharts = normalizeCommonJSImport(
    import('highcharts'),
);

@Injectable({
    providedIn: 'root'
})
export class WidgetsService {
    highCharts: any;
    constructor() {
        this.init();
    }

    public async init() {
        this.highCharts = await loadHighcharts;
    }
    public reflowWidgets() {
        if (this.highCharts && this.highCharts.charts) {

            this.highCharts.charts.forEach(chart => {
                if (chart) {
                    chart.reflow();
                }

            });

        }

    }
}
