/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author -  Dattaram Gawas
 *
 */

import {AfterViewInit, Component, DoCheck, EventEmitter, Input, OnInit, Output,} from '@angular/core';
import {CommonHttpService} from "../common.http.service";



@Component({
    selector: 'amexio-item-selector', template: `

        <div class=" amexio-itemselector" (window:resize)="onResize($event)">
            <div [style.width]="itemSelectorWidth">
                <table width="100%">
                    <tr>
                        <td class="amexio-itemselector-header">
                            Available
                        </td>
                    </tr>
                </table>
                <div [style.height]="itemSelectorHeight" style="overflow: auto">
                    <table width="100%">
                        <tbody>
                        <tr *ngFor="let data of availableData; let i = index" (click)="itemClick(data,i)">
                            <td class="amexio-itemselector-records" [ngClass]="data['isSelected'] ? 'amexio-itemselector-records-selected':''">{{data[displayField]}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <ng-container *ngIf="smallScreen">
                <div class="amexio-itemselector-width">
                    <div class="btn-group amexio-itemselector-btn-group " role="group"
                         aria-label="Button group with nested dropdown">
                        <amexio-btn (onClick)="moveTop()" [type]="'link'" [tooltipMessage]="'move top'" [block]="true"
                                    [icon]="'fa fa-caret-up'"></amexio-btn>
                        <amexio-btn (onClick)="upSwitch()" [type]="'link'" [tooltipMessage]="'move up'" [block]="true"
                                    [icon]="'fa fa-angle-double-up'"></amexio-btn>
                        <amexio-btn (onClick)="leftSwitch()" [type]="'link'" [tooltipMessage]="'move left'" [block]="true"
                                    [icon]="'fa fa-arrow-up'"></amexio-btn>
                        <amexio-btn (onClick)="rightSwitch()" [type]="'link'" [tooltipMessage]="'move right'" [block]="true"
                                    [icon]="'fa fa-arrow-down'"></amexio-btn>
                        <amexio-btn (onClick)="downSwitch()" [type]="'link'" [tooltipMessage]="'move down'" [block]="true"
                                    [icon]="'fa fa-angle-double-down'"></amexio-btn>
                        <amexio-btn (onClick)="moveDown()" [type]="'link'" [tooltipMessage]="'bottom'" [block]="true"
                                    [icon]="'fa fa-caret-down'"></amexio-btn>
                    </div>
                </div>

            </ng-container>
            <div class="amexio-itemselector-smallscreen" *ngIf="!smallScreen">
                <div class="list-group text-center amexio-itemselector-smallscreen-div" [style.height]="itemSelectorHeight">
                    <div>
                        <div class="btn-group-vertical" role="group" aria-label="Button group with nested dropdown">
                            <amexio-btn (onClick)="moveTop()" [type]="'link'" [tooltipMessage]="'move top'" [block]="true"
                                        [icon]="'fa fa-caret-up fa-2x'"></amexio-btn>
                            <amexio-btn (onClick)="upSwitch()" [type]="'link'" [tooltipMessage]="'move up'" [block]="true"
                                        [icon]="'fa fa-arrow-up'"></amexio-btn>
                            <amexio-btn (onClick)="leftSwitch()" [type]="'link'" [tooltipMessage]="'move left'" [block]="true"
                                        [icon]="'fa fa-arrow-left'"></amexio-btn>
                            <amexio-btn (onClick)="rightSwitch()" [type]="'link'" [tooltipMessage]="'move right'" [block]="true"
                                        [icon]="'fa fa-arrow-right'"></amexio-btn>
                            <amexio-btn (onClick)="downSwitch()" [type]="'link'" [tooltipMessage]="'move down'" [block]="true"
                                        [icon]="'fa fa-arrow-down'"></amexio-btn>
                            <amexio-btn (onClick)="moveDown()" [type]="'link'" [tooltipMessage]="'bottom'" [block]="true"
                                        [icon]="'fa fa-caret-down fa-2x '"></amexio-btn>
                        </div>
                    </div>

                </div>
            </div>
            <div [style.width]="itemSelectorWidth">
                <table width="100%">
                    <tr>
                        <td class="amexio-itemselector-header">
                            Selected
                        </td>
                    </tr>
                </table>
                <div [style.height]="itemSelectorHeight" style="overflow: auto">
                    <table width="100%">
                        <tbody>
                        <tr *ngFor="let data of selectedData; let i = index" (click)="itemClick(data,i)">
                            <td class="amexio-itemselector-records" [ngClass]="data['isSelected'] ? 'amexio-itemselector-records-selected':''">{{data[displayField]}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    `, styles: [`

        .amexio-itemselector {
            width: 100%;
            overflow: hidden;
            display: flex;
        }


        @media screen and (max-width: 768px) {
            .amexio-itemselector {
                width: 100%;
                overflow: hidden;
                display: block;
            }
        }


        .amexio-itemselector-header {
            padding: 10px;
            height: 48px;
            background-color: #cecece;
        }

        .amexio-itemselector-smallscreen {
            width: 8%;
        }

        .amexio-itemselector-smallscreen-div {
            padding-top: 35%;
        }

        .amexio-itemselector-btn-group {
            padding: 5% 5% 2% 5%;
        }

        .amexio-itemselector-width {
            width: 100%;
        }

        .amexio-itemselector-records {
            width: 100%;
            padding: 10px;
        }

        .amexio-itemselector-records-selected{
            background-color: #cecece;
        }



    `], providers: [CommonHttpService]
})
export class ItemSelectorComponent implements OnInit, AfterViewInit, DoCheck {

    @Input() height: any;

    @Input() httpUrl: string;

    @Input() dataReader: string;

    @Input() httpMethod: string;

    @Input() ItemSelectBindData: any;

    @Input() displayField: string;

    @Input() valueField: string;

    @Output() availableRecords: any = new EventEmitter<any>();

    @Output() selectedRecords: any = new EventEmitter<any>();


    availableData: any[];

    selectedData: any[];

    switchingObject: any;

    objectIndex: any;

    itemSelectorWidth: any;

    itemSelectorHeight: any;

    smallScreen: boolean;

    response: any;

    previousValue: any;


    constructor(private itemSelectorService: CommonHttpService) {
        this.selectedData = [];
    }

    ngOnInit() {
        if (this.height && this.height >= 300) {
            this.itemSelectorHeight = this.height + 'px';
        } else {
            this.itemSelectorHeight = 300 + 'px';
        }
        if (window.innerWidth < 768) {
            this.itemSelectorWidth = 100 + '%';
            this.smallScreen = true;
        } else {
            this.smallScreen = false;
            this.itemSelectorWidth = 46 + '%';
        }
        if (this.httpMethod && this.httpUrl) {
            this.itemSelectorService.fetchData(this.httpUrl, this.httpMethod).subscribe(response => {
                this.response = response.json();
            }, error => {
            }, () => {
                this.setData(this.response);
            });
        } else if (this.ItemSelectBindData) {
            this.previousValue = JSON.parse(JSON.stringify(this.ItemSelectBindData));
            this.setData(this.ItemSelectBindData);
        }
    }

    ngDoCheck() {
        if (JSON.stringify(this.previousValue) != JSON.stringify(this.ItemSelectBindData)) {
            this.previousValue = JSON.parse(JSON.stringify(this.ItemSelectBindData));
            this.setData(this.ItemSelectBindData);
        }
    }

    ngAfterViewInit() {

    }

    setData(httpResponse: any) {
        let responsedata = httpResponse;
        if (this.dataReader != null) {
            const dr = this.dataReader.split('.');
            for (let ir = 0; ir < dr.length; ir++) {
                responsedata = responsedata[dr[ir]];
            }
            responsedata.forEach((option: any, index: any) => {
                option['isSelected'] = false;
            });
        } else {
            responsedata = httpResponse;
        }

        this.availableData = responsedata;
    }

    itemClick(data: any, index: any) {
        debugger;
        this.switchingObject = data;
        this.objectIndex = index;

        for (let ir = 0; ir < this.availableData.length; ir++) {
            if((this.availableData[ir])[this.valueField] === data[this.valueField]){
                this.availableData[ir].isSelected = true;
            }else{
                this.availableData[ir].isSelected = false;
            }


        }
    }

    rightSwitch() {
        debugger;
        if (this.switchingObject != null) {
            if (this.switchingObject.isSelected) {
                this.selectedData.push(this.switchingObject);
                this.switchingObject.isSelected = true;
                this.availableData.forEach((option, index) => {
                    if (option.isSelected) {
                        this.availableData.splice(index, 1);
                    }
                });
                this.switchingObject = null;
                this.dataEmitter();
            }
        }

    }

    leftSwitch() {
        if (this.switchingObject != null) {
            if (this.switchingObject.isSelected) {
                this.availableData.push(this.switchingObject);
                this.switchingObject.isSelected = false;
                this.selectedData.forEach((option, index) => {
                    if (!option.isSelected) {
                        this.selectedData.splice(index, 1);
                    }
                });
                this.switchingObject = null;
                this.dataEmitter();
            }
        }


    }

    upSwitch() {
        if (this.switchingObject != null) {
            if (this.switchingObject.isSelected) {
                const index = this.selectedData[this.objectIndex];
                this.selectedData[this.objectIndex] = this.selectedData[this.objectIndex - 1];
                this.selectedData[this.objectIndex - 1] = index;
                this.switchingObject = null;
                this.dataEmitter();
            }
        }
    }

    downSwitch() {
        if (this.switchingObject != null) {
            if (this.switchingObject.isSelected) {
                if (this.selectedData.length - 1 !== this.objectIndex) {
                    const index = this.selectedData[this.objectIndex];
                    this.selectedData[this.objectIndex] = this.selectedData[this.objectIndex + 1];
                    this.selectedData[this.objectIndex + 1] = index;
                    this.switchingObject = null;
                    this.dataEmitter();
                }
            }
        }

    }

    moveTop() {
        const tempArray: any = [];
        if (this.switchingObject != null && this.switchingObject.isSelected) {
            if (this.selectedData.length > 1) {
                tempArray[0] = this.selectedData[this.objectIndex];
                this.selectedData.splice(this.objectIndex, 1);
                this.selectedData.forEach((option) => {
                    tempArray.push(option);
                });
                this.selectedData = tempArray;
                this.switchingObject = null;
                this.dataEmitter();
            }
        }
    }

    moveDown() {
        if (this.switchingObject != null) {
            if (this.switchingObject.isSelected && this.selectedData.length > 1) {
                this.selectedData.splice(this.objectIndex, 1);
                this.selectedData[this.selectedData.length] = this.switchingObject;
            }
        }
        this.switchingObject = null;
        this.dataEmitter();
    }

    dataEmitter() {
        this.availableRecords.emit(this.availableData);
        this.selectedRecords.emit(this.selectedData);
    }

    onResize(event: any) {
        if (event.target.innerWidth < 768) {
            this.itemSelectorWidth = 100 + '%';
            this.smallScreen = true;
        } else {
            this.smallScreen = false;
            this.itemSelectorWidth = 46 + '%';
        }
    }
}
