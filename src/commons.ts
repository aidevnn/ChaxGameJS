export enum Dir { R, L, D, U, F, B };

export enum Content { Empty, P1, P2 };

export enum ActionType { Place, Remove, Pass, Battle };

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

let m_w = 123456789;
let m_z = 987654321;
let mask = 0xffffffff;

// Takes any integer
export const RandSeed = function (i: number): void {
    m_w = (123456789 + i) & mask;
    m_z = (987654321 - i) & mask;
}

// Returns number between 0 (inclusive) and 1.0 (exclusive),
// just like Math.random().
function random(): number {
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
    var result = ((m_z << 16) + (m_w & 65535)) >>> 0;
    result /= 4294967296;
    return result;
}

export const RandInteger = function (min: number, max: number): number {
    return Math.floor(random() * (max - min)) + min;
}