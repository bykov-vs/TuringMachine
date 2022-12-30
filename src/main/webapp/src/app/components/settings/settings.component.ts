import {Component, EventEmitter, Output, Input} from '@angular/core';
import {Command} from '../alg-table/command';
import {HttpService} from "../../HttpService";
import {AlphabetDownloadWindowComponent} from "../alphabet-download-window/alphabet-download-window.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {TraceShowComponent} from "../trace-show/trace-show.component";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})


export class SettingsComponent {
    steps: any = []
    @Output() tapeLengthChange = new EventEmitter<number>()
    tapeElements: Array<string> = [];
    trace: any
    operand1: Number = 1
    operand2: Number = 1
    mode: String = "standard"
    tapeLength: number = 16
    commands: Command[] = []
    @Input() symbols: String[] = []
    @Input() tapeHeadPosition: Number = 8
    @Input() numberOfStates: number = 3
    @Input() cellValues: Command[][] = [[]]
    speedRange: number = 10
    stepNumber: number = 0

    constructor(private httpService: HttpService, public dialog: MatDialog,) {
    }

    ngAfterViewInit() {
        (async () => {
            await this.sleep(100)
            this.onOperandChange()
        })()

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
            symbols.push(x)
        }
        this.commands = []
        for (let i = 0; i < this.cellValues.length; i++){
            for (let j = 0; j < this.cellValues[i].length; j++){
                if (this.cellValues[i][j] !== null){
                    this.commands.push(this.cellValues[i][j])
                }
            }
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
            "numberOfStates": (this.numberOfStates - 1)
        }
        return request
    }

    execute() {
        //this.onOperandChange()
        let tapeScope = document.getElementById('tape-element-scope-' + this.tapeHeadPosition)
        // @ts-ignore
        tapeScope.setAttribute('class', 'tape-element-scope')
        console.log(this.commands)
        let request: any = this.createRequest()
        this.httpService.executeAlgorithm(request)
            .subscribe((data: any) => {
                if (data.successful) {
                    this.steps = data.trackSteps
                    this.tapeLength = data.tapeLength
                    this.runAlgorithm()
                    console.log(data)
                    let str = ""
                    for (let obj of data.trackSteps) {
                        str += obj.tapeHeadPosition + " - " + obj.newSymbol + ";\n"
                    }
                    const dialogRef = this.dialog.open(TraceShowComponent, {
                        data: str,
                    });
                } else {
                    alert(data.message)
                }

            })
        // console.log("after request" + this.steps)
        // this.runAlgorithm()
    }

    sleep(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    onTapeLengthChange(event : any) {
        this.tapeLength = event.target.value
        if (this.tapeLength < 10 ){
            this.tapeLength = 10
        }
        if (this.tapeLength > 200 ){
            this.tapeLength = 200
        }
        this.tapeLengthChange.emit(this.tapeLength)
    }

    changeMode(mode: String) {
        this.mode = mode
        if (mode == 'standard') {
            let stepButton = document.getElementById('step-button')
            // @ts-ignore
            stepButton.setAttribute('class', 'hide')
            let speedRangeLabel = document.getElementById('speed-range-label')
            // @ts-ignore
            speedRangeLabel.setAttribute('class', '')
            let speedRange = document.getElementById('speed-range')
            // @ts-ignore
            speedRange.setAttribute('class', '')
            let speedRangeOutput = document.getElementById('speed-range-output')
            // @ts-ignore
            speedRangeOutput.setAttribute('class', '')
        }
        else if (mode == 'fast') {
            let stepButton = document.getElementById('step-button')
            // @ts-ignore
            stepButton.setAttribute('class', 'hide')
            let speedRangeLabel = document.getElementById('speed-range-label')
            // @ts-ignore
            speedRangeLabel.setAttribute('class', 'hide')
            let speedRange = document.getElementById('speed-range')
            // @ts-ignore
            speedRange.setAttribute('class', 'hide')
            let speedRangeOutput = document.getElementById('speed-range-output')
            // @ts-ignore
            speedRangeOutput.setAttribute('class', 'hide')
        }
        else {
            let stepButton = document.getElementById('step-button')
            // @ts-ignore
            stepButton.setAttribute('class', '')
            let speedRangeLabel = document.getElementById('speed-range-label')
            // @ts-ignore
            speedRangeLabel.setAttribute('class', 'hide')
            let speedRange = document.getElementById('speed-range')
            // @ts-ignore
            speedRange.setAttribute('class', 'hide')
            let speedRangeOutput = document.getElementById('speed-range-output')
            // @ts-ignore
            speedRangeOutput.setAttribute('class', 'hide')
        }
    }

    onOperandChange() {
        let tapeElement, i = 1;
        if (this.operand1 < 1){
            this.operand1 = 1
        }
        if (this.operand1 > 10){
            this.operand1 = 10
        }
        if (this.operand2 < 1){
            this.operand2 = 1
        }
        if (this.operand2 > 10){
            this.operand2 = 10
        }
        while (tapeElement = document.getElementById('tape-element-' + i)) {
            if ((i >= 3 && i < 3 + this.operand1.valueOf()) ||
                (i >= 3 + 1 + this.operand1.valueOf() && i < 3 + 1 + this.operand1.valueOf() + this.operand2.valueOf())) {
                // @ts-ignore
                tapeElement.value = this.symbols[1]
            } else {
                // @ts-ignore
                tapeElement.value = this.symbols[0]
            }
            i++
        }
    }

    nextStep() {
        let x = this.steps[this.stepNumber]
        let element, tapeScope, combobox
        element = document.getElementById('col-' + (x.col - 1) + '-row-' + (x.row - 1))
        tapeScope = document.getElementById('tape-element-scope-' + (x.tapeHeadPosition + 1))
        combobox = document.getElementById('tape-element-' + (x.tapeHeadPosition + 1))
        if (element && tapeScope && combobox) {
            element.setAttribute('class', '')
            tapeScope.setAttribute('class', 'tape-element-scope')
            // @ts-ignore
            combobox.value = x.newSymbol
        }

        this.stepNumber++
        x = this.steps[this.stepNumber]
        element = document.getElementById('col-' + (x.col - 1) + '-row-' + (x.row - 1))
        tapeScope = document.getElementById('tape-element-scope-' + (x.tapeHeadPosition + 1))
        combobox = document.getElementById('tape-element-' + (x.tapeHeadPosition + 1))
        if (element && tapeScope && combobox) {
            element.setAttribute('class', 'selected')
            tapeScope.setAttribute('class', 'tape-element-scope selected')
            // @ts-ignore
            combobox.value = x.newSymbol
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
        let element, tapeScope, combobox
        console.log("Элементы ленты" + this.tapeElements)
        if (this.mode!= 'step-by-step') {
            (async () => {
                for (const x of this.steps) {
                    element = document.getElementById('col-' + (x.col - 1) + '-row-' + (x.row - 1))
                    tapeScope = document.getElementById('tape-element-scope-' + (x.tapeHeadPosition + 1))
                    combobox = document.getElementById('tape-element-' + (x.tapeHeadPosition + 1))
                    if (element && tapeScope && combobox) {
                        element.setAttribute('class', 'selected')
                        tapeScope.setAttribute('class', 'tape-element-scope selected')
                        if (this.mode == 'fast'){
                            await this.sleep(1);
                        }
                        else if (this.mode == 'standard'){
                            await this.sleep(100 * (11 - this.speedRange));
                        }
                        element.setAttribute('class', '')
                        tapeScope.setAttribute('class', 'tape-element-scope')
                        // @ts-ignore
                        combobox.value = x.newSymbol
                    }
                }
            })();
        } else {
            this.stepNumber = 0;
            const x = this.steps[this.stepNumber]
            element = document.getElementById('col-' + (x.col - 1) + '-row-' + (x.row - 1))
            tapeScope = document.getElementById('tape-element-scope-' + (x.tapeHeadPosition + 1))
            combobox = document.getElementById('tape-element-' + (x.tapeHeadPosition + 1))
            if (element && tapeScope && combobox) {
                element.setAttribute('class', 'selected')
                tapeScope.setAttribute('class', 'tape-element-scope selected')
                // @ts-ignore
                combobox.value = x.newSymbol
            }
        }

    }
}
