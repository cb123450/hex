import Board from "./Board"

export class Game{
    board : Board;
    turn : number;
    curr_player : string;

    constructor(board : Board){
        this.board = board;
        this.turn = 0;
        this.curr_player = "red";
    }

    set setTurn(num : number){
        this.turn += 1;
    }

    get getTurn(){
        return this.turn;
    }

    get getCurrPlayer(){
        return this.curr_player;
    }

    set setCurrPlayer(color : string){
        this.curr_player = color;
    }
}

export default Game