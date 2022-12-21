import { Component } from '@angular/core';
import {HttpService} from "./HttpService";

@Component({
    selector: 'app-tape-combobox',
    template: `
        <div class="tape-element-scope" id="tape-element-scope-{{id}}">
            <p class="label">{{label}}</p>
            <div class="tape-element">
                <select class="label" id="tape-element-{{id}}">
                    <option value="_">_</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="+">+</option>
                </select>
            </div>
        </div>
        `
})
export class TapeComboboxComponent {
    label: any;
    id: any;
    constructor() {

    }
}