import { Grid } from '../Grid';
import { LevelManager } from '../Level';
import { getRenderableEntityFromTile } from '../Tile';

export const renderConsole = (grid: Grid, levelManager: LevelManager) => {
    console.clear();
    console.log(`Level ${levelManager.getLevelIndex() + 1}/${levelManager.getTotalLevels()}`);

    const screen = grid.rows.reduce((buffer, row) => {
        let output = '';

        if (row.position !== 0) output += '\n';

        output += row.tiles.reduce((tileBuffer, tile) => {
            return tileBuffer + getRenderableEntityFromTile(tile).sprite;
        }, '');

        return buffer + output;
    }, '');

    console.log(screen);
};
