import {Component, OnInit} from '@angular/core';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import {Subscription} from 'rxjs';
import * as Highcharts from 'highcharts';

declare var require: any;
const loadHcMore = require('highcharts/highcharts-more');
const loadSolidGaugeChart = require('highcharts/modules/solid-gauge');

loadHcMore(Highcharts);

@Component({
    selector: 'app-temperature',
    template: `
        <ng-container *ngIf="highCharts">
            <highcharts-chart [Highcharts]="highCharts"
                              (chartInstance)="logChartInstance($event)"
                              style="width: 100%; height: calc(100% - 40px); display: inline-block;"
                              [options]="chartOptions"></highcharts-chart>
        </ng-container>`,
})
export class TemperatureComponent implements OnInit {
    topicName = 'casa/sensores/temp';
    highCharts: typeof Highcharts = Highcharts;
    solidGaugeChart: any;
    hcMore: any;
    chartOptions = {
        chart: {
            type: 'solidgauge'
        },
        yAxis: {
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            min: 0,
            max: 100,
            lineWidth: 0,
            tickWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            labels: {
                y: 16
            },
            title: {
                text: null
            }
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }, pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },
        tooltip: {
            enabled: false
        },
        title: {text: ''},
        series: [{
            name: 'TEMP',
            data: [],
            dataLabels: {
                format:
                    '<div style="text-align:center">' +
                    '<span style="font-size:20px">{y}</span><br/>' +
                    '<span style="font-size:20px;opacity:0.4">°C</span>' +
                    '</div>'
            },
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 300
                },
                chartOptions: {
                    yAxis: {
                        className: 'highcharts-gauge-heading-small'
                    }
                }
            }]
        }
    };
    chartInstance: Highcharts.Chart;
    msg: any;
    private subscription: Subscription;

    logChartInstance(chart: Highcharts.Chart) {
        this.chartInstance = chart;
    }

    public ngOnInit() {
        this.hcMore = loadHcMore;
        this.solidGaugeChart = loadSolidGaugeChart;

        this.hcMore(this.highCharts);
        this.solidGaugeChart(this.highCharts);
    }

    constructor(private _mqttService: MqttService) {
        this.uploadData();
    }

    uploadData() {
        this.subscription = this._mqttService.observe(this.topicName).subscribe((message: IMqttMessage) => {
            this.msg = message;
            console.log(this.msg.payload.toString());
            if (this.chartInstance) {
                this.chartInstance.series[0].setData([Math.floor(this.msg.payload.toString())]);
            }
        });
    }
}
