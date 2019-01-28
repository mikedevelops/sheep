import {
    addEntityToRow,
    addTilesToRow,
    createRow,
    fillRowWithEntity,
    getEntityByTypeFromRow,
    getEntityByPositionFromRow,
    removeEntityFromRow,
    Row, getEntitiesByTypeFromRow, getTileByPositionFromRow, replaceTileInRow, getEntityByIdFromRow
} from './Row';
import { createTile, getRenderableEntityFromTile, Tile } from './Tile';
import { createVector2, Vector2 } from './Vector2';
import { Entity, EntityFactory, EntityType } from './Entity';
import { isNullOrUndefined } from 'util';

export interface Grid {
    width: number;
    height: number;
    rows: Row[];
}

export const createGrid = (width: number, height: number): Grid => {
    const rows: Row[] = createEmptyRows(height)
        .map(row =>
            addTilesToRow(createEmptyTiles(width, row.position), row));

    return {
        width,
        height,
        rows
    }
};

export const createEmptyRows = (y: number): Row[] => {
    const rows: Row[] = [];

    for (let r = 0; r < y; r++) {
        rows.push(createRow(r));
    }

    return rows;
};

export const createEmptyTiles = (width: number, y: number): Tile[] => {
    const tiles: Tile[] = [];

    for (let t = 0; t < width; t++) {
        tiles.push(createTile(createVector2(t, y)));
    }

    return tiles;
};

export const fillGridWithEntity = (grid: Grid, entityFactory: EntityFactory): Grid => {
    return Object.assign({}, grid, {
        rows: grid.rows.map(row => fillRowWithEntity(row, entityFactory))
    });
};

export const spawnEntity = (grid: Grid, entity: Entity, position: Vector2): Grid => {
    return Object.assign({}, grid, {
        rows: grid.rows.map(row => {
            if (row.position === position.y) {
                return addEntityToRow(entity, row, position.x);
            }

            return row;
        })
    });
};

export const isGridPositionValid = (grid: Grid, position: Vector2): boolean => {
    if (grid.rows[position.y] === undefined) return false;
    if (grid.rows[position.y].tiles[position.x] === undefined) return false;

    return true;
};

export const moveEntity = (grid: Grid, position: Vector2, target: Vector2): Grid => {
    const validGridPosition = isGridPositionValid(grid, target);

    if (!validGridPosition) {
        return grid;
    }

    const entity = getEntityByPositionFromRow(position.x, grid.rows[position.y]);
    const targetEntity = getEntityByPositionFromRow(target.x, grid.rows[target.y]);

    if (targetEntity.passableEntities.indexOf(entity.type) === -1) {
        return grid
    }

    const rowsWithEntityRemoved = grid.rows.map(row => {
        if (row.position === position.y) {
            return removeEntityFromRow(position.x, grid.rows[position.y]);
        }

        return row;
    });
    const rowsWithEntityMoved = rowsWithEntityRemoved.map(row => {
        if (row.position === target.y) {
            return addEntityToRow(entity, rowsWithEntityRemoved[target.y], target.x);
        }

        return row;
    });

    return Object.assign({}, grid, {
        rows: rowsWithEntityMoved
    })
};

export const getEntityByTypeFromGrid = (entityType: EntityType, grid: Grid): Entity => {
    return getEntitiesByTypeFromGrid(entityType, grid)[0];
};

export const getEntitiesByTypeFromGrid = (entityType: EntityType, grid: Grid): Entity[] => {
    return grid.rows.reduce((entities: Entity[], row) => {
        return [...entities, ...getEntitiesByTypeFromRow(entityType, row)];
    }, []);
};

export const getEntityByPositionFromGrid = (entityPosition: Vector2, grid: Grid): Entity => {
    if (grid.rows[entityPosition.y] === undefined) return undefined;

    return getEntityByPositionFromRow(entityPosition.x, grid.rows[entityPosition.y]);
};

export const getTileByPositionFromGrid = (position: Vector2, grid: Grid): Tile => {
    if (grid.rows[position.y] === undefined) return undefined;

    return getTileByPositionFromRow(position.x, grid.rows[position.y]);
};

export const replaceTileInGrid = (tile: Tile, grid: Grid): Grid => {
    if (grid.rows[tile.position.y] === undefined) return grid;

    return Object.assign({}, grid, {
        rows: grid.rows.map(row => {
            if (row.position !== tile.position.y) return row;

            return replaceTileInRow(tile, tile.position.x, row);
        })
    });
};

export const getEntityByIdFromGrid = (id: string, grid: Grid): Entity => {
    let entity: Entity;

    grid.rows.forEach(row => {
        const rowEntity = getEntityByIdFromRow(id, row);
        if (rowEntity !== undefined) entity = rowEntity;
    });

    return entity;
};
