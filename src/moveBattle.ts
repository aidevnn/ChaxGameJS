import { Content, ActionType, GetOpponent } from "./commons"
import { Cube } from "./cube"
import { Move } from "./moves"

export class SubMove {
    IdBefore: number;
    IdAfter: number;
    Player: Content;
    Opponent: Content;
    IdOpponent1: number = -1;
    IdOpponent2: number = -1;
    NbKills: number = 0;

    constructor(player: Content, idBefore: number, idAfter: number) {
        this.IdBefore = idBefore;
        this.IdAfter = idAfter;
        this.Player = player;
        this.Opponent = GetOpponent(player);
    }

    Clone(): SubMove {
        let ms = new SubMove(this.Player, this.IdBefore, this.IdAfter);
        ms.IdOpponent1 = this.IdOpponent1;
        ms.IdOpponent2 = this.IdOpponent2;
        ms.NbKills = this.NbKills;
        return ms;
    }

    DoStep(cube: Cube): void {
        cube.SetCellById(this.IdBefore, Content.Empty);
        cube.SetCellById(this.IdAfter, this.Player);
        if (this.IdOpponent1 != -1) cube.SetCellById(this.IdOpponent1, Content.Empty);
        if (this.IdOpponent2 != -1) cube.SetCellById(this.IdOpponent2, Content.Empty);
    }

    UndoStep(cube: Cube): void {
        if (this.IdOpponent1 != -1) cube.SetCellById(this.IdOpponent1, this.Opponent);
        if (this.IdOpponent2 != -1) cube.SetCellById(this.IdOpponent2, this.Opponent);

        cube.SetCellById(this.IdAfter, Content.Empty);
        cube.SetCellById(this.IdBefore, this.Player);
    }
}

export class MoveBattle implements Move {
    Player: Content;
    Opponent: Content;
    ActionType: ActionType = ActionType.Battle;
    Weight: number = 0;
    IdBefore: number = 0;
    IdAfter: number = 0;
    SubMoves: Array<SubMove>;
    Steps: number = 0;
    TotalKills: number = 0;

    static FromPlayerAndCell(player: Content, idCell: number): MoveBattle {
        let mv = new MoveBattle(player);
        mv.IdBefore = idCell;
        mv.IdAfter = idCell;
        return mv;
    }

    static FromPrevious(mv0: MoveBattle, idBefore: number, idAfter: number): MoveBattle {
        let mv = new MoveBattle(mv0.Player);
        mv.IdBefore = idBefore;
        mv.IdAfter = idAfter;
        mv.TotalKills = mv0.TotalKills;
        mv.Steps = mv0.Steps + 1;
        
        for (let ms of mv0.SubMoves) {
            mv.SubMoves.push(ms.Clone());
        }
        return mv;
    }

    static Clone(mv0: MoveBattle): MoveBattle {
        let mv = new MoveBattle(mv0.Player);
        mv.IdBefore = mv0.IdBefore;
        mv.IdAfter = mv0.IdAfter;
        mv.Weight = mv0.Weight;
        mv.TotalKills = mv0.TotalKills;
        mv.Steps = mv0.Steps;
        mv.SubMoves.concat(mv0.SubMoves);
        return mv;
    }

    constructor(player: Content) {
        this.Player = player;
        this.Opponent = GetOpponent(player);
        this.SubMoves = [];
    }

    Do(cube: Cube): void {
        for (let mv of this.SubMoves) {
            mv.DoStep(cube);
        }
    }

    Undo(cube: Cube): void {
        for (let mv of this.SubMoves.reverse()) {
            mv.UndoStep(cube);
        }
    }

}