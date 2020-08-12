import { Content, ActionType } from "./commons"
import { Cube, EmptyCube } from "./cube"

export interface Move {
    Player: Content;
    ActionType: ActionType;
    Weight: number;

    Do(cube: Cube): void;
    Undo(cube: Cube): void;

    ToStr(): string;
}

export const MoveComparer = function (m0: Move, m1: Move) {
    return m0.Weight > m1.Weight ? -1 : 1;
}

export class MovePass implements Move {
    Player: Content
    ActionType: ActionType
    Weight: number

    constructor(player: Content) {
        this.Player = player;
        this.ActionType = ActionType.Pass;
        this.Weight = 0;
    }

    ToStr(): string {
        return `Player:${this.Player} PASS`;
    }

    Do(cube: Cube): void { }
    Undo(cube: Cube): void { }
}

export class MovePlace implements Move {
    Player: Content
    ActionType: ActionType
    IdCell: number
    Weight: number

    constructor(player: Content, idCell: number) {
        this.Player = player;
        this.ActionType = ActionType.Place;
        this.Weight = 0;
        this.IdCell = idCell;
    }
    
    ToStr(): string {
        let c = EmptyCube.AllCells[this.IdCell].Coords.cxyz;
        return `Player:${this.Player} PLACE AT ${c}`;
    }

    Do(cube: Cube): void {
        cube.SetCellById(this.IdCell, this.Player);
    }

    Undo(cube: Cube): void {
        cube.SetCellById(this.IdCell, Content.Empty);
    }
}

export class MoveFirst implements Move {
    Player: Content
    ActionType: ActionType
    IdCell: number
    Weight: number

    constructor(player: Content, idCell: number) {
        this.Player = player;
        this.ActionType = ActionType.Remove;
        this.Weight = 0;
        this.IdCell = idCell;
    }

    ToStr(): string {
        let c = EmptyCube.AllCells[this.IdCell].Coords.cxyz;
        return `Player:${this.Player} REMOVE AT ${c}`;
    }

    Do(cube: Cube): void {
        cube.SetCellById(this.IdCell, Content.Empty);
    }

    Undo(cube: Cube): void {
        cube.SetCellById(this.IdCell, this.Player);
    }
}
