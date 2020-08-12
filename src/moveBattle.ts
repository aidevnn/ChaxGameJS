import { Content, ActionType, GetOpponent } from "./commons"
import { Cube, EmptyCube } from "./cube"
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

    ToStr(): string {
        let cb = EmptyCube.AllCells[this.IdBefore].Coords.cxyz;
        let ca = EmptyCube.AllCells[this.IdAfter].Coords.cxyz;
        let co1 = this.IdOpponent1 == -1 ? "" : EmptyCube.AllCells[this.IdOpponent1].Coords.cxyz;
        let co2 = this.IdOpponent2 == -1 ? "" : EmptyCube.AllCells[this.IdOpponent2].Coords.cxyz;
        let kills = "";
        if (this.NbKills == 1) kills = `Kill one at [${co1}]`;
        if (this.NbKills == 2) kills = `Kill two at [${co1}] and [${co2}]`;
        return `    MOVE from [${cb}] to [${ca}] ${kills}`;
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

    constructor(player: Content) {
        this.Player = player;
        this.Opponent = GetOpponent(player);
        this.SubMoves = new Array<SubMove>();
    }

    ToStr(): string {
        let s = '';
        let cb = EmptyCube.AllCells[this.IdBefore].Coords.cxyz;
        let ca = EmptyCube.AllCells[this.IdAfter].Coords.cxyz;
        if (this.TotalKills == 0) {
            return `Player:${this.Player} MOVEBATTLE from [${cb}] to [${ca}]`;
        }

        s += `Player:${this.Player} MOVEBATTLE from [${cb}] to [${ca}]\n`;
        let k = 0;
        for (let ms of this.SubMoves) {
            ++k;
            s += "" + k + " " + ms.ToStr() + '\n';
        }
        s += `  TotalKils: ${this.TotalKills}`;

        return s;
    }

    Do(cube: Cube): void {
        for (let mv of this.SubMoves) {
            mv.DoStep(cube);
        }
    }

    Undo(cube: Cube): void {
        for (let mv of this.SubMoves.slice().reverse()) {
            mv.UndoStep(cube);
        }
    }

}