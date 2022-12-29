import { Component, Input } from '@angular/core';
import {HttpService} from "./HttpService";

@Component({
    selector: 'app-tape-combobox',
    template: `
        <div class="tape-element-scope" id="tape-element-scope-{{id}}">
            <p class="label">{{label}}</p>
            <div class="tape-element">
                <select class="label" id="tape-element-{{id}}">
                    <option *ngFor="let symbol of symbols" [value]="symbol">{{symbol}}</option>
                </select>
            </div>
        </div>
        `
})
export class TapeComboboxComponent {
    label: any;
    id: any;

    @Input() symbols : String[] = []

    setSymbols(symbols : any) {
        this.symbols = symbols
    }
    constructor() {

    }
}
