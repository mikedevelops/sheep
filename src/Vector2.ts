export interface Vector2 {
    x: number;
    y: number;
}

export enum Direction {
    NORTH,
    EAST,
    SOUTH,
    WEST
}

export interface Directions {
    NORTH: Vector2;
    EAST: Vector2;
    SOUTH: Vector2;
    WEST: Vector2;
}

export const createVector2 = (x: number, y: number): Vector2 => {
    return { x, y };
};

export const Directions: Directions = {
    NORTH: createVector2(0, -1),
    EAST: createVector2(1, 0),
    SOUTH: createVector2(0, 1),
    WEST: createVector2(-1, 0)
};

export const isSamePosition = (a: Vector2, b: Vector2): boolean => {
    return a.x == b.x && a.y === b.y;
};

export const addVector = (a: Vector2, b: Vector2): Vector2 => {
    return createVector2(a.x + b.x, a.y + b.y);
};

export const vectorOne = () => createVector2(1, 1);

export const getAreaFromCorner = (corner: Vector2): Vector2[] => {
    const area: Vector2[] = [];

    for (let row = corner.y; row === 0; row--) {
        for (let column = corner.x; column === 0; column--) {
            area.push(createVector2(column, row));
        }
    }

    return area;
};

