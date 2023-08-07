import Board from "./Board"

export class Game{
    public board : Board;
    public turn : number;
    public curr_player : string;

    constructor(board : Board){
        this.board = board;
        this.turn = 0;
        this.curr_player = "red";
    }
}

export default Game