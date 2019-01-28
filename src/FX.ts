import { Grid, replaceTileInGrid } from './Grid';
import { addVector, createVector2, getAreaFromCorner } from './Vector2';
import { createTile } from './Tile';
import { createEntityFactory, EntityType } from './Entity';

export const winFactory = createEntityFactory(EntityType.WIN);

export const createFX = (fx: Iterator<Grid>, grid: Grid, fps: number = 12) => {
    let frame = 0;
    const MAX_FRAMES = 1000;
    const nextFrame = fx.next();

    if (!nextFrame.done || frame < MAX_FRAMES) {
        grid = nextFrame.value;
        setTimeout(createFX.bind(null, fx, grid), 1000 / fps);
    }
};

export const win = (grid: Grid): Iterator<Grid> => {
    let corner = createVector2(0, 0);

    return {
        next: () => {
            const area = getAreaFromCorner(corner);
            let newGrid = grid;

            area.forEach(tile => {
                newGrid = replaceTileInGrid(createTile(tile, [winFactory()]), newGrid);
            });

            corner = addVector(corner, createVector2(1, 1));

            return {
                value: newGrid,
                done: false
            };
        }
    }
};
