import {Component, Input, Inject, AfterViewInit, OnInit, Output, EventEmitter} from '@angular/core';
import {Command} from './command';
import {ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-alg-table',
    templateUrl: './alg-table.component.html',
    styleUrls: ['./alg-table.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AlgTableComponent implements OnInit {
    @Input()
    symbols: String[] = []
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
        if (i > -1) {
            this.states.splice(i, 1);
        }
        for (let j = i; j < this.states.length; j++) {
            this.states[j] -= 1
        }
        this.changeCells()
    }

    changeCells() {
        let cellValues = this.cellsValues
        this.cells = new Array(this.symbols.length)
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i] = new Array(this.states.length).fill(false)
        }

        this.cellsValues = new Array(this.symbols.length)
        for (let i = 0; i < this.cellsValues.length; i++) {
            this.cellsValues[i] = new Array(this.states.length).fill(null)
            for (let j = 0; j < this.cellsValues.length; j++){
                this.cellsValues[i][j] = cellValues[i][j]
            }
        }
        console.log(this.cellsValues.length)
        console.log(this.cellsValues[0].length)
    }

    showList(i: number, j: number) {
        if ((this.cellCol) != -1 && (this.cellRow != -1)) {
            this.cells[this.cellRow][this.cellCol] = false
        }
        this.isOpen = true
        this.cells[i][j] = true
        this.cellRow = i
        this.cellCol = j
    }

    increaseType(event: any) {
        this.command += event.target.value
        if (this.type == 0) {
            this.newSymbol = event.target.value
        }
        if (this.type == 1) {
            this.move = event.target.value
        }
        if (this.type == 2) {
            this.type = 0
            this.nextState = parseInt(event.target.value)
            this.state = this.states[this.cellRow]
            this.symbol = this.symbols[this.cellCol]

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

    setCellValue(i : number, j : number){
        console.log(this.cellsValues)
        if (this.cellsValues[i][j] !== null){
            return this.cellsValues[i][j].newSymbol + " " +
                this.cellsValues[i][j].move + " " +
                (this.cellsValues[i][j].nextState+1) + " ";
        }
        else{
            return ''
        }
    }
}

