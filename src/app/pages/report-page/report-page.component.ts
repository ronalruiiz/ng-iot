import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
    selector: 'app-report-page',
    templateUrl: './report-page.component.html',
    styleUrls: ['./report-page.component.scss']
})
export class ReportPageComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['value', 'device', 'type_device', 'created_at'];
    dataSource = new MatTableDataSource([]);
    option = 'temp';
    public initDate;
    public endDate;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    constructor(private firebaseService: FirebaseService) {
        this.dataSource.filterPredicate = (data, filter) => {
            if (this.initDate && this.endDate) {
                return new Date(data.created_at) >= this.initDate && new Date(data.created_at) <= this.endDate;
            }
            return true;
        };
    }

    ngOnInit() {
        return this.firebaseService.getTypeData(this.option, 'casa').subscribe((r: Object[]) => {
            this.dataSource.data = r;
        }, () => {
            console.log('No hay comunicación');
        });
    }
    updateTable() {
        this.dataSource.data = [];
        this.firebaseService.getTypeData(this.option, 'casa').subscribe((r: Object[]) => {
            this.dataSource.data = r;
        }, () => {
            console.log('No hay comunicación');
        });
        this.dataSource._updateChangeSubscription()
    }
    applyFilter() {
        this.dataSource.filter = '' + Math.random();
    }
}
