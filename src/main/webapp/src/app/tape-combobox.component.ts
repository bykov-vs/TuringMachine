import { Component } from '@angular/core';
import {HttpService} from "./HttpService";

@Component({
    selector: 'app-tape-combobox',
    template: `
        <div class="tape-element-scope">
            <p class="label">{{label}}</p>
            <div class="tape-element">
                <select class="label" id="{{id}}">
                    <option>-</option>
                    <option>*</option>
                    <option>_</option>
                </select>
            </div>
        </div>
        `
})
export class TapeComboboxComponent {
    items: any = [
        {
            id: 1,
            name: 'qwe'
        }

    ];
    jsonObject: JSON;
    label: any;
    id: any;
    constructor() {
        this.jsonObject = <JSON>this.items;
    }
}