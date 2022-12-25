import {Component, EventEmitter, Output, Input} from '@angular/core';
import {Command} from '../alg-table/command';
import {HttpService} from "../../HttpService";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})


export class SettingsComponent {
  steps : any = []
  @Output() taleLengthChange = new EventEmitter<Event>()
  tapeElements: Array<string> = [];
  trace : any 
  operand1 : Number = 0
  operand2 : Number = 0
  mode : String = "standard"
  tapeLength : number = 0
  @Input() commands : Command[] = []
  @Input() symbols : String[] = []

  constructor(private httpService: HttpService) {
  }

  createRequest() : any{
    let symbols = []
    let name : String = "test_alg"
    let tapeLength : number = 3
    let firstOperand : string = this.operand1.toString()
    let secondOperand : string = this.operand2.toString()
    let tape : String = firstOperand+secondOperand
    for (let x of this.symbols){
      symbols.push({"name":x})
    }
    let alphabet = {"alphabet":symbols}
    let request : any = {
      "name": name,
      "tapeLength": tapeLength,
      "tape": tape,
      "alphabet": alphabet,
      "commands": this.commands
    }
    return request
  }

  execute(){
    let request : any = this.createRequest()
    this.httpService.executeAlgorithm(request)
      .subscribe((data : any) => {
        this.trace = data.trace
        this.tapeLength = data.tapeLength
      })
    this.runAlgorithm()
  }

  sleep(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onTapeLengthChange(event : any){
    this.taleLengthChange.emit(event)
  }

  changeMode(mode : String){
    this.mode = mode
  }  

    onOperandChange() {
        let tapeElement, i = 1;
        while (tapeElement = document.getElementById('tape-element-' + i)){
            if ((i >= 3 && i < 3+this.operand1.valueOf()) ||
                (i >= 3+1+this.operand1.valueOf() && i < 3+1+this.operand1.valueOf()+this.operand2.valueOf())){
                // @ts-ignore
                tapeElement.value = this.symbols[0]
            }
            else {
                // @ts-ignore
                tapeElement.value = '_'
            }
            i++
        }
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
