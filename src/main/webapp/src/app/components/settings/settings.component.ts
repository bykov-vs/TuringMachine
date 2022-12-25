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
    trace: any
    operand1: Number = 0
    operand2: Number = 0
    mode: String = "standard"
    tapeLength: number = 0
    @Input() commands: Command[] = []
    @Input() symbols: String[] = []
    @Input() tapeHeadPosition: Number = 8

    constructor(private httpService: HttpService) {
    }

    createRequest(): any {
        let symbols = []
        let name: String = "test_alg"
        let tapeLength: number = this.tapeElements.length
        let tape: String = ""
        let i = 1, tapeElement;
        this.tapeElements = [];
        while (tapeElement = document.getElementById('tape-element-' + i)) {
            // @ts-ignore
            this.tapeElements.push(tapeElement.value)
            // @ts-ignore
            tape += tapeElement.value
            i++
        }
        // for (let x of this.tapeElements) {
        //     tape += x
        // }
        for (let x of this.symbols) {
            symbols.push({"name": x})
        }
        console.log(this.commands)
        let alphabet = {"alphabet": symbols}
        let request: any = {
            "name": name,
            "tapeLength": tapeLength,
            "tape": tape,
            "alphabet": symbols,
            "commands": this.commands,
            "tapeHeadPosition": this.tapeHeadPosition.valueOf() - 1,
            "numberOfStates": (3 - 1)
        }
        return request
    }

    execute() {
        let tapeScope = document.getElementById('tape-element-scope-' + this.tapeHeadPosition)
        // @ts-ignore
        tapeScope.setAttribute('class', 'tape-element-scope')
        console.log(this.commands)
        let request: any = this.createRequest()
        this.httpService.executeAlgorithm(request)
            .subscribe((data: any) => {
                this.steps = data.trackSteps
                this.tapeLength = data.tapeLength
                this.runAlgorithm()
                console.log(data)
            })
        // console.log("after request" + this.steps)
        // this.runAlgorithm()
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

    onOperandChange() {
        let tapeElement, i = 1;
        while (tapeElement = document.getElementById('tape-element-' + i)) {
            if ((i >= 3 && i < 3 + this.operand1.valueOf()) ||
                (i >= 3 + 1 + this.operand1.valueOf() && i < 3 + 1 + this.operand1.valueOf() + this.operand2.valueOf())) {
                // @ts-ignore
                tapeElement.value = this.symbols[0]
            } else {
                // @ts-ignore
                tapeElement.value = '_'
            }
            i++
        }
    }

    runAlgorithm() {
        console.log("run " + this.steps)
        let i = 1, tapeElement;
        this.tapeElements = [];
        while (tapeElement = document.getElementById('tape-element-' + i)) {
            // @ts-ignore
            this.tapeElements.push(tapeElement.value)
            i++
        }
        console.log("Элементы ленты" + this.tapeElements)

        let element, tapeScope, combobox
        (async () => {
            for (const x of this.steps) {
                console.log("step:" + x)
                console.log("col:" + (x.col - 1))
                console.log("row:" + x.row)
                console.log("newState:" + x.tapeHeadPosition)
                console.log("newSymbol:" + x.newSymbol)
                element = document.getElementById('col-' + (x.col - 1) + '-row-' + (x.row - 1))
                console.log(element)
                tapeScope = document.getElementById('tape-element-scope-' + x.tapeHeadPosition)
                console.log(tapeScope)
                combobox = document.getElementById('tape-element-' + x.tapeHeadPosition)
                console.log(combobox)
                if (element && tapeScope && combobox) {
                    element.setAttribute('class', 'selected')
                    tapeScope.setAttribute('class', 'tape-element-scope selected')
                    await this.sleep(1000);
                    element.setAttribute('class', '')
                    tapeScope.setAttribute('class', 'tape-element-scope')
                    // @ts-ignore
                    combobox.value = x.newSymbol
                }
            }
        })();
    }
}
