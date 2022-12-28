import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {Command} from './command';
import {ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-alg-table',
    templateUrl: './alg-table.component.html',
    styleUrls: ['./alg-table.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AlgTableComponent implements OnInit, OnChanges{
    @Input() symbols: String[] = []
    @Input() symbolsLength : number = 0
    command: String = ""
    states: number[] = [1, 2, 3, 4]
    isOpen: boolean = false
    type: number = 0
    cells: boolean[][] = [[]]
    cellRow: number = -1
    cellCol: number = -1
    moves: String[] = ["Л", "П", "Н"]
    cellsValues: Command[][] = [[]]

    move: String = ""
    state: Number = 0
    symbol: String = ""
    newSymbol: String = ""
    nextState: Number = 0

    @Output() newItemEvent = new EventEmitter<Command[][]>();
    commands: Command[] | undefined
    @Output() newNumberOfStates = new EventEmitter<number>();

    constructor() {}

    ngOnInit(): void {
        this.commands = new Array(0);
        
        this.cells = new Array(this.states.length)
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i] = new Array(this.symbols.length).fill(false)
        }

        this.cellsValues = new Array(this.states.length)
        for (let i = 0; i < this.cellsValues.length; i++) {
            this.cellsValues[i] = new Array(this.symbols.length).fill(null)
        }
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        this.changeCells()
    }

    insertColumnLeft(i: number) {
        if (i == 0) {
            return
        }
        this.states.splice(i - 1, 0, 1)
        this.states[i - 1] = (i).valueOf()
        for (let j = i; j < this.states.length; j++) {
            this.states[j] += 1
        }
        // console.log(this.states)
        this.changeCells()
    }

    insertColumnRight(i: number) {
        this.states.splice(i + 1, 0, 1)
        this.states[i + 1] = (i + 1).valueOf()
        for (let j = i + 1; j < this.states.length; j++) {
            this.states[j] += 1
        }
        this.changeCells()
    }

    deleteColumn(i: number) {
        if (this.states.length > 2) {
            if (i > -1) {
                this.states.splice(i, 1);
            }
            for (let j = i; j < this.states.length; j++) {
                this.states[j] -= 1
            }
            this.changeCells()
        }

    }

    changeCells() {
        console.log(this.symbols.length)
        let cellValues = this.cellsValues
        this.cells = new Array(this.symbols.length)
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i] = new Array(this.states.length).fill(false)
        }

        this.cellsValues = new Array(this.symbols.length)
        let minSize = Math.min(this.cellsValues.length, cellValues.length)
        for (let i = 0; i < this.cellsValues.length; i++){
            this.cellsValues[i] = new Array(this.states.length).fill(null)
        }
        for (let i = 0; i < minSize; i++) {
            this.cellsValues[i] = new Array(this.states.length).fill(null)
            let minSizeJ = Math.min(this.cellsValues[i].length, cellValues[0].length)
            for (let j = 0; j < minSizeJ; j++){
                this.cellsValues[i][j] = cellValues[i][j]
            }
        }
        /*
        console.log("states = " + this.states.length)
        console.log("symbols = " + this.symbols.length)
        console.log("строк"+this.cellsValues.length)
        console.log("столбцов"+this.cellsValues[0].length)
        console.log(this.cellsValues)
        */
    }

    showList(j: number, i: number) {
        if ((this.cellCol) != -1 && (this.cellRow != -1)) {
            this.cells[this.cellRow][this.cellCol] = false
        }
        this.isOpen = true
        this.cells[j][i] = true
        this.cellRow = j
        this.cellCol = i
    }

    increaseType(event: any) {
        this.command += event.target.value
        console.log(this.symbols)
        if (this.type == 0) {
            this.newSymbol = event.target.value
        }
        if (this.type == 1) {
            this.move = event.target.value
        }
        if (this.type == 2) {
            this.type = 0
            this.nextState = parseInt(event.target.value)
            this.state = this.states[this.cellCol]
            this.symbol = this.symbols[this.cellRow]

            let command: Command = {
                move: this.move,
                newSymbol: this.newSymbol,
                state: (this.state.valueOf() - 1),
                nextState: this.nextState.valueOf() - 1,
                symbol: this.symbol
            }
            this.commands?.push(command)
            this.newItemEvent.emit(this.cellsValues)

            this.isOpen = false
            this.cellsValues[this.cellRow][this.cellCol] = command
            this.command = ""
            return
        }
        this.type++
    }

    setCellValue(j : number, i : number){

        // console.log("\nin:" +this.symbols.length + "-" + this.states.length)
        // console.log("out:" +this.cellsValues.length + "-" + this.cellsValues[0].length)

        if (this.cellsValues[j][i] !== null){
            return this.cellsValues[j][i].newSymbol + " " +
                this.cellsValues[j][i].move + " " +
                (this.cellsValues[j][i].nextState+1) + " ";
        }
        else{
            return ''
        }
    }

    deleteCellsValue() {
        this.commands = new Array(0);

        this.cells = new Array(this.states.length)
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i] = new Array(this.symbols.length).fill(false)
        }

        this.cellsValues = new Array(this.states.length)
        for (let i = 0; i < this.cellsValues.length; i++) {
            this.cellsValues[i] = new Array(this.symbols.length).fill(null)
        }
    }
}

