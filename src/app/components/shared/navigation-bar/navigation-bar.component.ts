import {Component, EventEmitter, Output, OnInit} from '@angular/core';

@Component({
    selector: 'app-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
    @Output() toggleSidenav = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }
}
