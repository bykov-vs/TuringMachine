import {Component, EventEmitter, Output, Input} from '@angular/core';
import {Command} from '../alg-table/command';
import {HttpService} from "../../HttpService";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})


export class SettingsComponent {
    steps: any = []
    @Output() taleLengthChange = new EventEmitter<Event>()

    tapeElements: Array<string> = [];

    operand1: Number = 0
    operand2: Number = 0
    mode: String = "standard"
    @Input() commands: Command[] = []
    @Input() _symbols: String[] = []

    constructor(private httpService: HttpService) {
    }

    createRequest() {
        let symbols = []
        let name: String = "test_alg"
        let tapeLength: number = 3
        let firstOperand: String = this.operand1.toString()
        let secondOperator: String = this.operand2.toString()
        for (let x of this._symbols) {
            symbols.push({"name": x})
        }
        let alphabet = {"alphabet": symbols}
    }

    sleep(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    onTapeLengthChange(event: any) {
        this.taleLengthChange.emit(event)
    }

    changeMode(mode: String) {
        this.mode = mode
    }

    runAlgorithm() {
        let i = 1, tapeElement;
        this.tapeElements = [];
        while (tapeElement = document.getElementById('tape-element-' + i)){
            // @ts-ignore
            this.tapeElements.push(tapeElement.value)
            i++
        }
        console.log("Элементы ленты" + this.tapeElements)

        let element, tapeScope, combobox
        (async () => {
            for (const x of this.steps) {
                element = document.getElementById('col-' + x.col + '-row-' + x.row)
                tapeScope = document.getElementById('tape-element-scope-' + x.tape)
                combobox = document.getElementById('tape-element-' + x.tape)
                if (element && tapeScope && combobox) {
                    element.setAttribute('class', 'selected')
                    tapeScope.setAttribute('class', 'tape-element-scope selected')
                    await this.sleep(1000);
                    element.setAttribute('class', '')
                    tapeScope.setAttribute('class', 'tape-element-scope')
                    // @ts-ignore
                    combobox.value = x.newVal
                }
            }
        })();
    }
}
