import { createEntityFactory, EntityType } from './Entity';
import { Grid, replaceTileInGrid } from './Grid';
import { createVector2 } from './Vector2';
import { createTile } from './Tile';

export const createFence = createEntityFactory(EntityType.FENCE);

export const buildFence = (grid: Grid): Grid => {
    let newGrid = grid;

    for (let x = 0; x < grid.width; x++) {
        for (let y = 0; y < grid.height; y++) {
            if (x === 0 || x === grid.width - 1 || y === 0 || y === grid.height - 1) {
                const tile = createTile(createVector2(x, y), [createFence()]);

                newGrid = replaceTileInGrid(tile, newGrid);
            }
        }
    }

    return newGrid;
};
