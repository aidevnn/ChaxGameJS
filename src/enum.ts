export enum Dir { R, L, D, U, F, B };

export enum Content { Empty, P1, P2 };

export function GetOpponent(content: Content): Content {
    switch (content) {
        case Content.Empty: return Content.Empty;
        case Content.P1: return Content.P2;
        case Content.P2: return Content.P1;
    }
}

export function SameContent(c1: Content, c2: Content): boolean {
    if (c1 == Content.Empty || c2 == Content.Empty) return false;
    return c1 == c2;
}

export function DiffContent(c1: Content, c2: Content): boolean {
    if (c1 == Content.Empty || c2 == Content.Empty) return false;
    return c1 != c2;
}