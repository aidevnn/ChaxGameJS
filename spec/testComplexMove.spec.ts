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

        let mvKill = moves.find(m => m.IdAfter == cell0?.Id);
        expect(mvKill).toBeDefined();
        expect(mvKill?.SubMoves.find(e => e.IdAfter == cell0?.Id && e.IdOpponent1 == cell1?.Id)).toBeDefined();

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

        let moves = MovesBattle(cube, Content.P1, cube.GetCellByKey("c020")?.Id);
        let exportAfter = cube.Export();

        expect(exportBefore).toBe(exportAfter);
        expect(moves.length).toBe(3);

        let nbKills = moves.map(m => m.TotalKills).reduce((a, b) => Math.max(a, b));
        expect(nbKills).toBe(1);

        let mvKill = moves.find(m => m.IdAfter == cell0?.Id);
        expect(mvKill).toBeDefined();
        expect(mvKill?.SubMoves.find(e => e.IdAfter == cell0?.Id && e.IdOpponent1 == cell1?.Id)).toBeDefined();

        for (let mv of moves) {
            mv.Do(cube);
            mv.Undo(cube);
            expect(exportBefore).toBe(cube.Export());
        }
    });

    it("Kill two opponents (1).", () => { });
    it("Kill two opponents (2).", () => { });
    it("Kill two opponents with bonus(1).", () => { });
    it("Kill two opponents with bonus(2).", () => { });
    it("Kill three opponents.", () => { });
});
