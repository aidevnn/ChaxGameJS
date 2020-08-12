import { ActionType, Content, GetOpponent } from "./commons"
import { Cube } from "./cube"
import { ConsoleReadline, DisplayMove } from "./displayMoves"
import { MoveBattle } from "./moveBattle"
import { Move } from "./moves"
import { FirstTurn, GenMovesBattle, Placement } from "./movesGenerator"

export class GameState {
    cube: Cube
    turn: number
    player: Content
    constructor() {
        this.cube = new Cube();
        this.turn = 0;
        this.player = Content.P1;
    }

    Clone(): GameState {
        let c = new GameState();
        c.turn = this.turn;
        c.player = this.player;
        c.cube.Import(this.cube.Export());
        return c;
    }

    GenMoves(): Array<Move> {
        if (this.turn < 24)
            return Placement(this.cube, this.player, true);
        else if (this.turn == 24)
            return FirstTurn(this.cube, this.player, true);

        return GenMovesBattle(this.cube, this.player);
    }

    EndGame(): boolean {
        let sc = this.cube.ComputeDomination(this.player);
        return this.turn > 3 && (sc.ScorePlayer == 0 || sc.ScoreOpponent == 0);
    }

    DoMove(mv: Move): void {
        mv.Do(this.cube);
        this.turn++;
        this.player = GetOpponent(this.player);
    }

    UndoMove(mv: Move): void {
        mv.Undo(this.cube);
        this.turn--;
        this.player = mv.Player;
    }

    DoMoveAndConsoleDisplay(mv0: Move): void {
        if (this.turn < 25 || mv0.ActionType == ActionType.Pass) {
            this.DoMove(mv0);
            this.cube.ConsoleCube(true);
            console.log(mv0.ToStr());
        }
        else {
            let mv1 = <MoveBattle>mv0;

            this.turn++;
            DisplayMove(this.cube, mv1);
            this.player = GetOpponent(this.player);
        }

        ConsoleReadline(`#### End Turn: ${this.turn}`);
    }
}