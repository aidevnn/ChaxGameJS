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
        mv.Weight = (cube.ComputeDomination(player).DomPlayer * 100 + c.Power * 10000);
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
        mv.Weight = -(cube.ComputeDomination(player).DomPlayer * 100 + c.Power * 10000);
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

export let AllCubes = new Array<number>();
export const AllCubesClear = function (): void {
    AllCubes = new Array<number>();
}

export const RandomCubes = function () {
    AllCubesClear();

    for (let k = 2; k < 11; ++k) {
        console.group(`Players : ${k} x 2 tokens`);
        for (let j = 0; j < 2; ++j) {
            console.log(j);
            let lt = Array.from(Array(24), (e, i) => i).sort((a, b) => 0.5 - Math.random());
            let cube = new Cube();
            for (let i = 0; i < k; ++i) {
                cube.SetCellById(lt[2 * i], Content.P1);
                cube.SetCellById(lt[2 * i + 1], Content.P2);
            }

            AllCubes.push(cube.ExportBit());
        }
        console.groupEnd();
    }
    console.log("NbAllCubes", AllCubes.length);
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
        let e = cube.ExportBit();
        if (!AllCubes.includes(e)) {
            if (mv.Steps == 1 || ms.NbKills != 0) {
                let sc = cube.ComputeDomination(current.Player);
                mv.Weight = RandInteger(0, 100) + sc.DomPlayer * 100 + mv.TotalKills * 10000;
                moves.push(mv);
            }

            if (ms.NbKills != 0)
                BuildMoveBattle(cube, mv, moves);
        }

        ms.UndoStep(cube)
    }
}

export const MovesBattle = function (cube: Cube, player: Content, idCell: number): Array<MoveBattle> {
    let root = MoveBattle.FromPlayerAndCell(player, idCell);
    let moves = new Array<MoveBattle>();
    BuildMoveBattle(cube, root, moves);

    return moves;
}

export const GenMovesBattle = function (cube: Cube, player: Content): Array<MoveBattle> | Array<MovePass> {
    let moves = new Array<MoveBattle>();
    for (let i = 0; i < 24; ++i) {
        let cell = cube.GetCellById(i);
        if (cell.Content != player)
            continue;

        let root = MoveBattle.FromPlayerAndCell(player, cell.Id);
        BuildMoveBattle(cube, root, moves);
    }

    if (moves.length == 0) {
        let pass = new Array<MovePass>();
        pass.push(new MovePass(player));
        return pass;
    }

    return moves.sort(MoveComparer);
}