import { Content } from "../src/commons"
import { Cube } from "./../src/cube"
import { MovesBattle } from "./../src/movesGenerator"

describe("Bonus Moves.", () => {
    it("Kill two opponents with bonus(1).", () => {
        const cube = new Cube();

        let cell1 = cube.GetCellByKey("c002");
        let cell2 = cube.GetCellByKey("c102");
        let cell3 = cube.GetCellByKey("c202");
        let cell4 = cube.GetCellByKey("c101");
        let cell5 = cube.GetCellByKey("c100");
        let cell6 = cube.GetCellByKey("c201");
        let cell7 = cube.GetCellByKey("c200");

        cell1.Content = Content.P1;
        cell5.Content = Content.P1;
        cell7.Content = Content.P1;

        cell4.Content = Content.P2;
        cell6.Content = Content.P2;

        let exportBefore = cube.Export();

        let moves = MovesBattle(cube, Content.P1, cell1.Id);
        let exportAfter = cube.Export();

        expect(exportBefore).toBe(exportAfter);
        expect(moves.length).toBe(4);

        let nbKills = moves.map(m => m.TotalKills).reduce((a, b) => Math.max(a, b));
        expect(nbKills).toBe(2);

        let mvKill0 = moves.find(m => m.IdAfter == cell2.Id);
        expect(mvKill0).toBeDefined();
        expect(mvKill0?.SubMoves.find(e => e.IdAfter == cell2.Id && e.IdOpponent1 == cell4.Id)).toBeDefined();

        let mvKill1 = moves.find(m => m.IdAfter == cell3.Id);
        expect(mvKill1).toBeDefined();
        expect(mvKill1?.SubMoves.find(e => e.IdAfter == cell2.Id && e.IdOpponent1 == cell4.Id)).toBeDefined();
        expect(mvKill1?.SubMoves.find(e => e.IdAfter == cell3.Id && e.IdOpponent1 == cell6.Id)).toBeDefined();

        for (let mv of moves) {
            mv.Do(cube);
            mv.Undo(cube);
            expect(exportBefore).toBe(cube.Export());
        }
    });

    it("Kill two opponents with bonus(2).", () => {
        const cube = new Cube();

        let cell1 = cube.GetCellByKey("c102");
        let cell2 = cube.GetCellByKey("c202");
        let cell3 = cube.GetCellByKey("c101");
        let cell4 = cube.GetCellByKey("c100");
        let cell5 = cube.GetCellByKey("c201");
        let cell6 = cube.GetCellByKey("c200");

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
        
        let mvKill0 = moves.find(m => m.IdAfter == cell2.Id);
        expect(mvKill0).toBeDefined();
        expect(mvKill0?.SubMoves.find(e => e.IdAfter == cell2.Id && e.IdOpponent1 == cell5.Id)).toBeDefined();

        let mvKill1 = moves.find(m => m.IdAfter == cell1.Id);
        expect(mvKill1).toBeDefined();
        expect(mvKill1?.SubMoves.find(e => e.IdAfter == cell2.Id && e.IdOpponent1 == cell5.Id)).toBeDefined();
        expect(mvKill1?.SubMoves.find(e => e.IdAfter == cell1.Id && e.IdOpponent1 == cell3.Id)).toBeDefined();

        for (let mv of moves) {
            mv.Do(cube);
            mv.Undo(cube);
            expect(exportBefore).toBe(cube.Export());
        }
    });

    it("Kill three opponents.", () => { 
        const cube = new Cube();

        let cell1 = cube.GetCellByKey("c002");
        let cell2 = cube.GetCellByKey("c011");
        let cell3 = cube.GetCellByKey("c010");
        let cell4 = cube.GetCellByKey("c021");
        let cell5 = cube.GetCellByKey("c020");
        let cell6 = cube.GetCellByKey("c121");
        let cell7 = cube.GetCellByKey("c221");

        cell1.Content = Content.P1;
        cell3.Content = Content.P1;
        cell5.Content = Content.P1;
        cell7.Content = Content.P1;

        cell2.Content = Content.P2;
        cell4.Content = Content.P2;
        cell6.Content = Content.P2;

        let exportBefore = cube.Export();

        let moves = MovesBattle(cube, Content.P1, cell1.Id);
        let exportAfter = cube.Export();

        expect(exportBefore).toBe(exportAfter);
        expect(moves.length).toBe(5);

        let nbKills = moves.map(m => m.TotalKills).reduce((a, b) => Math.max(a, b));
        expect(nbKills).toBe(3);

        for (let mv of moves) {
            mv.Do(cube);
            mv.Undo(cube);
            expect(exportBefore).toBe(cube.Export());
        }
    });
});
