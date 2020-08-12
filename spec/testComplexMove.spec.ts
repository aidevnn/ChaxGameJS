import { Content } from "../src/commons"
import { Cube } from "./../src/cube"
import { MovesBattle } from "./../src/movesGenerator"

describe("Complex Moves.", () => {
    it("Three cells and kill one opponent (1).", () => {
        const cube = new Cube();
        cube.SetCellByKey("c000", Content.P1);
        cube.SetCellByKey("c012", Content.P1);
        cube.SetCellByKey("c011", Content.P2);
        let cell0 = cube.GetCellByKey("c010");
        let cell1 = cube.GetCellByKey("c011");
        let exportBefore = cube.Export();

        let moves = MovesBattle(cube, Content.P1, 0);
        let exportAfter = cube.Export();

        expect(exportBefore).toBe(exportAfter);
        expect(moves.length).toBe(3);

        let nbKills = moves.map(m => m.TotalKills).reduce((a, b) => Math.max(a, b));
        expect(nbKills).toBe(1);

        let mvKill = moves.find(m => m.IdAfter == cell0.Id);
        expect(mvKill).toBeDefined();
        expect(mvKill?.SubMoves.find(e => e.IdAfter == cell0.Id && e.IdOpponent1 == cell1.Id)).toBeDefined();

        for (let mv of moves) {
            mv.Do(cube);
            mv.Undo(cube);
            expect(exportBefore).toBe(cube.Export());
        }
    });

    it("Three cells and kill one opponent (2).", () => {
        const cube = new Cube();
        cube.SetCellByKey("c020", Content.P1);
        cube.SetCellByKey("c001", Content.P1);
        cube.SetCellByKey("c011", Content.P2);
        let cell0 = cube.GetCellByKey("c021");
        let cell1 = cube.GetCellByKey("c011");
        let exportBefore = cube.Export();

        let moves = MovesBattle(cube, Content.P1, cube.GetCellByKey("c020").Id);
        let exportAfter = cube.Export();

        expect(exportBefore).toBe(exportAfter);
        expect(moves.length).toBe(3);

        let nbKills = moves.map(m => m.TotalKills).reduce((a, b) => Math.max(a, b));
        expect(nbKills).toBe(1);

        let mvKill = moves.find(m => m.IdAfter == cell0.Id);
        expect(mvKill).toBeDefined();
        expect(mvKill?.SubMoves.find(e => e.IdAfter == cell0.Id && e.IdOpponent1 == cell1.Id)).toBeDefined();

        for (let mv of moves) {
            mv.Do(cube);
            mv.Undo(cube);
            expect(exportBefore).toBe(cube.Export());
        }
    });

    it("Kill two opponents (1).", () => {
        const cube = new Cube();

        let cell1 = cube.GetCellByKey("c200");
        let cell2 = cube.GetCellByKey("c201");
        let cell3 = cube.GetCellByKey("c101");
        let cell4 = cube.GetCellByKey("c001");
        let cell5 = cube.GetCellByKey("c211");
        let cell6 = cube.GetCellByKey("c221");

        cell1.Content = Content.P1;
        cell4.Content = Content.P1;
        cell6.Content = Content.P1;

        cell3.Content = Content.P2;
        cell5.Content = Content.P2;

        let exportBefore = cube.Export();

        let moves = MovesBattle(cube, Content.P1, cell1.Id);
        let exportAfter = cube.Export();

        expect(exportBefore).toBe(exportAfter);
        expect(moves.length).toBe(3);

        let nbKills = moves.map(m => m.TotalKills).reduce((a, b) => Math.max(a, b));
        expect(nbKills).toBe(2);

        let mvKill = moves.find(m => m.IdAfter == cell2.Id);
        expect(mvKill).toBeDefined();
        expect(mvKill?.SubMoves.find(e => e.IdAfter == cell2.Id && e.IdOpponent1 == cell5.Id && e.IdOpponent2 == cell3.Id)).toBeDefined();

        for (let mv of moves) {
            mv.Do(cube);
            mv.Undo(cube);
            expect(exportBefore).toBe(cube.Export());
        }
    });

    it("Kill two opponents (2).", () => {
        const cube = new Cube();

        let cell1 = cube.GetCellByKey("c001");
        let cell2 = cube.GetCellByKey("c002");
        let cell3 = cube.GetCellByKey("c102");
        let cell4 = cube.GetCellByKey("c202");
        let cell5 = cube.GetCellByKey("c012");
        let cell6 = cube.GetCellByKey("c022");

        cell1.Content = Content.P1;
        cell4.Content = Content.P1;
        cell6.Content = Content.P1;

        cell3.Content = Content.P2;
        cell5.Content = Content.P2;

        let exportBefore = cube.Export();

        let moves = MovesBattle(cube, Content.P1, cell1.Id);
        let exportAfter = cube.Export();

        expect(exportBefore).toBe(exportAfter);
        expect(moves.length).toBe(4);

        let nbKills = moves.map(m => m.TotalKills).reduce((a, b) => Math.max(a, b));
        expect(nbKills).toBe(2);

        let mvKill = moves.find(m => m.IdAfter == cell2.Id);
        expect(mvKill).toBeDefined();
        expect(mvKill?.SubMoves.find(e => e.IdAfter == cell2.Id && e.IdOpponent1 == cell5.Id && e.IdOpponent2 == cell3.Id)).toBeDefined();

        for (let mv of moves) {
            mv.Do(cube);
            mv.Undo(cube);
            expect(exportBefore).toBe(cube.Export());
        }
    });
});
