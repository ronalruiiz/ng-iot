import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    title = 'ng-mqtt';
    public typeSideMenu = 'side';

    ngOnInit(): void {
    }
    constructor(breakpointObserver: BreakpointObserver, ) {
        breakpointObserver.observe([
            Breakpoints.HandsetLandscape,
            Breakpoints.HandsetPortrait
        ]).subscribe(result => {
            if (result.matches) {
               this.typeSideMenu = 'over';
            }
        });
        breakpointObserver.observe([
            Breakpoints.Large,
            Breakpoints.Medium,
        ]).subscribe(result => {
            if (result.matches) {
                this.typeSideMenu = 'side';
            }
        });
    }
}
