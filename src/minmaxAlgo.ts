import { Content, GetOpponent } from "./commons"
import { GameState } from "./gameState"
import { Move, MovePass } from "./moves"

class NodeAB {
    parentNode: NodeAB | null
    bestChild: NodeAB | null
    move: Move | null
    score: number
    maximize: boolean

    constructor() {
        this.parentNode = null;
        this.bestChild = null;
        this.move = null;
        this.score = 0;
        this.maximize = true;
    }

    static FromParent(parent: NodeAB, mv: Move): NodeAB {
        let n = new NodeAB();
        n.parentNode = parent;
        n.move = mv;
        n.maximize = !parent.maximize;
        return n;
    }
}

const INF = 1000000000;

const AlphaBetaSearch = function (g: GameState, node: NodeAB, player: Content, depth: number, alpha: number, beta: number): void {
    if (node.move != null) {
        let sc = g.cube.ComputeDomination(node.move.Player);
        if (sc.ScorePlayer == 0) {
            node.score = -INF;
            return;
        }

        if (sc.ScoreOpponent == 0) {
            node.score = +INF;
            return;
        }

        if (depth == 0) {
            let opponent = GetOpponent(player);
            let dom = 50 + sc.GetDomination(player) - sc.GetDomination(opponent);
            let NbPlayer = sc.GetScore(player), NbOpponent = sc.GetScore(opponent);
            let diff = NbPlayer - NbOpponent;
            node.score = dom + (12 - NbOpponent) * 100 + NbPlayer * 10000 + diff * 1000000;
            return;
        }
    }

    if (node.maximize) {
        node.score = -INF;
        let moves = g.GenMoves();
        node.bestChild = NodeAB.FromParent(node, moves[0]);
        for (let mv of moves) {
            g.DoMove(mv);
            let child = NodeAB.FromParent(node, mv);
            AlphaBetaSearch(g, child, player, depth - 1, alpha, beta);
            if (node.score < child.score) {
                node.bestChild = child;
                node.score = child.score;
            }

            g.UndoMove(mv);

            alpha = Math.max(alpha, node.score);
            if (alpha > beta)
                break;
        }
    }
    else {
        node.score = +INF;
        let moves = g.GenMoves();
        node.bestChild = NodeAB.FromParent(node, moves[0]);
        for (let mv of moves) {
            g.DoMove(mv);
            let child = NodeAB.FromParent(node, mv);
            AlphaBetaSearch(g, child, player, depth - 1, alpha, beta);
            if (node.score > child.score) {
                node.bestChild = child;
                node.score = child.score;
            }

            g.UndoMove(mv);

            beta = Math.min(beta, node.score);
            if (beta < alpha)
                break;
        }
    }
}

export const AlphaBeta = function (g: GameState, depth: number): Move {
    let g0 = g.Clone();
    let root = new NodeAB();
    AlphaBetaSearch(g0, root, g.player, depth, -INF, +INF);
    if (root.bestChild == null || root.bestChild.move == null)
        return new MovePass(g.player);

    return root.bestChild.move;
}