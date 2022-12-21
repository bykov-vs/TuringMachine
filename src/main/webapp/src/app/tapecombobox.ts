import { Component } from '@angular/core';
import {HttpService} from "./HttpService";

@Component({
    selector: 'app-tape-combobox',
    template: `
<!--        <div ng-controller="DoubleController">-->
<!--            <select ng-model="data-ng-model" ng-options="item.id as item.name for item in items"></select>-->
<!--        </div>-->
        <div class="tape-element-scope">
            <p class="label">1</p>
            <div class="tape-element">
                <select class="label">
                    <option>-</option>
                    <option>*</option>
                    <option>_</option>
                </select>
            </div>
        </div>
        `
})
export class TapeCombobox {
    items: any = [
        {
            id: 1,
            name: 'qwe'
        }

    ];
    jsonObject: JSON;
    constructor() {
        this.jsonObject = <JSON>this.items;
    }
}