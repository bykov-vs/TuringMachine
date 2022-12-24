import { Component, Input, Inject, AfterViewInit, OnInit } from '@angular/core';
import { Command } from './command';

@Component({
  selector: 'app-alg-table',
  templateUrl: './alg-table.component.html',
  styleUrls: ['./alg-table.component.css']
})
export class AlgTableComponent implements OnInit{
  @Input() 
  symbols : String[] = []
  command : String = ""
  states : Number[] = [1, 2, 3, 4]
  isOpen : boolean = false
  type : number = 0
  cells : boolean[][] = [[]]
  cellRow : number = -1
  cellCol : number = -1
  moves : String[] = ["Л","П","Н"]
  cellsValues : String[][] = [[]]

  move : String = ""
  state : Number = 0
  symbol : String = ""
  newSymbol : String = ""
  nextState : Number = 0

  commands : Command[] | undefined

  ngOnInit(): void {
    this.commands = new Array(0);
    this.cells = new Array(this.states.length)
      for (let i = 0; i < this.cells.length; i++){
        this.cells[i] = new Array(this.symbols.length).fill(false)
      }

      this.cellsValues = new Array(this.states.length)
      for (let i = 0; i < this.cellsValues.length; i++){
        this.cellsValues[i] = new Array(this.symbols.length).fill("")
      }
  }

  showList(i :number, j :number){
    if((this.cellCol) != -1 && (this.cellRow != -1)){
      this.cells[this.cellRow][this.cellCol] = false
    }
    this.isOpen = true
    this.cells[i][j] = true
    this.cellRow = i
    this.cellCol = j
  }

  increaseType(event : any){
    this.command += event.target.value
    if (this.type == 0){
      this.newSymbol = event.target.value
    }
    if (this.type == 1){
      this.move = event.target.value
    }
    if (this.type == 2){
      this.type = 0
      this.nextState = event.target.value
      this.state = this.states[this.cellCol]
      this.symbol = this.symbols[this.cellRow]

      let command : Command = {
        move: this.move,
        newSymbol: this.newSymbol,
        state: this.state,
        nextState: this.nextState,
        symbol: this.symbol
      }
      this.commands?.push(command)

      this.isOpen = false
      this.cellsValues[this.cellRow][this.cellCol] = this.command
      this.command=""
      return
    }
    this.type++
  }
}

