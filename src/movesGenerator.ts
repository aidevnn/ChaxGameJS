import { Content, ActionType, GetOpponent, RandInteger, DiffContent, SameContent } from "./commons"
import { Cube } from "./cube"
import { Move, MovePlace, MoveFirst, MovePass, MoveComparer } from "./moves"
import { SubMove, MoveBattle } from "./moveBattle"

export const Placement = function (cube: Cube, player: Content, randomize?: boolean): Array<Move> {
    let moves = new Array<MovePlace>();
    for (let idCell = 0; idCell < 24; ++idCell) {
        let c = cube.GetCellById(idCell);
        if (c.Content != Content.Empty)
            continue;

        let mv = new MovePlace(player, idCell);
        mv.Do(cube);
        mv.Weight = cube.ComputeDomination(player).DomPlayer * 100 + c.Power * 10000;
        if (randomize)
            mv.Weight += RandInteger(0, 100);

        moves.push(mv);
        mv.Undo(cube);
    }

    return moves.sort(MoveComparer);
}

export const FirstTurn = function (cube: Cube, player: Content, randomize?: boolean): Array<Move> {
    let moves = new Array<MoveFirst>();
    for (let idCell = 0; idCell < 24; ++idCell) {
        let c = cube.GetCellById(idCell);
        if (c.Content != player)
            continue;

        let mv = new MoveFirst(player, idCell);
        mv.Do(cube);
        mv.Weight = -cube.ComputeDomination(player).DomPlayer * 100 - c.Power * 10000;
        if (randomize)
            mv.Weight -= RandInteger(0, 100);

        moves.push(mv);
        mv.Undo(cube);
    }

    return moves.sort(MoveComparer);
};

export const BuildSubMoves = function (cube: Cube, player: Content, idBefore: number, idAfter: number): SubMove {
    let cell = cube.GetCellById(idAfter);
    let ms = new SubMove(player, idBefore, idAfter);
    for (let row of cell.Rows) {
        let row0 = row[0];
        let c0 = row0.Content;
        var c1 = row[1].Content;

        if (DiffContent(player, c0) && SameContent(player, c1)) {
            if (ms.NbKills == 0) ms.IdOpponent1 = row0.Id;
            else ms.IdOpponent2 = row0.Id;

            ++ms.NbKills;
        }
    }

    return ms;
}

export const BuildMoveBattle = function (cube: Cube, current: MoveBattle, moves: Array<MoveBattle>): void {
    let cell = cube.GetCellById(current.IdAfter);
    if (current.Steps == 0 && DiffContent(cell.Content, current.Player))
        throw new Error("exception");

    for (let n of cell.Neighbors) {
        if (n.Content != Content.Empty)
            continue;

        let mv = MoveBattle.FromPrevious(current, current.IdBefore, n.Id);
        let ms = BuildSubMoves(cube, current.Player, current.IdAfter, n.Id);
        mv.TotalKills += ms.NbKills;
        mv.SubMoves.push(ms);

        ms.DoStep(cube);
        if (mv.Steps == 1 || ms.NbKills != 0) {
            mv.Weight = RandInteger(0, 100) + n.Power * 100 + mv.TotalKills * 1000;
            moves.push(mv);
        }

        if (ms.NbKills != 0)
            BuildMoveBattle(cube, mv, moves);

        ms.UndoStep(cube)
    }
}

export const MovesBattle = function (cube: Cube, player: Content, idCell: number | undefined): Array<MoveBattle> {
    let id0 = idCell == undefined ? 0 : idCell;
    let root = MoveBattle.FromPlayerAndCell(player, id0);
    let moves = new Array<MoveBattle>();
    BuildMoveBattle(cube, root, moves);

    return moves;
}