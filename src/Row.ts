import {
    addEntityToTile,
    getEntityByIdFromTile, getEntityByTypeFromTile,
    getRenderableEntityFromTile,
    removeEntityFromTile,
    Tile
} from './Tile';
import { Entity, EntityFactory, EntityType } from './Entity';

export interface Row {
    position: number;
    tiles: Tile[];
}

export const createRow = (position : number, tiles: Tile[] = []): Row => {
    return {
        position,
        tiles
    }
};

export const addTilesToRow = (tiles: Tile[], row: Row): Row => {
    return Object.assign({}, row, {
        tiles: [...row.tiles, ...tiles]
    });
};

export const fillRowWithEntity = (row: Row, entityFactory: EntityFactory): Row => {
    return Object.assign({}, row, {
        tiles: row.tiles.map(tile =>
            addEntityToTile(Object.assign({}, entityFactory(tile.position)), tile))
    });
};

export const addEntityToRow = (entity: Entity, row: Row, position: number): Row => {
    return Object.assign({}, row, {
        tiles: row.tiles.map(tile => {
            if (tile.position.x === position) {
                return addEntityToTile(entity, tile);
            }

            return tile;
        })
    });
};

export const removeEntityFromRow = (position: number, row: Row): Row => {
    return Object.assign({}, row, {
        tiles: row.tiles.map(tile => {
            if (tile.position.x === position) {
                return removeEntityFromTile(tile);
            }

            return tile;
        })
    });
};

export const getEntityByPositionFromRow = (position: number, row: Row): Entity => {
    const tile = row.tiles.find(t => t.position.x === position);

    if (tile === undefined) return undefined;

    return getRenderableEntityFromTile(tile);
};

export const getEntityByTypeFromRow = (entityType: EntityType, row: Row): Entity => {
    return getEntitiesByTypeFromRow(entityType, row)[0];
};

export const getEntitiesByTypeFromRow = (entityType: EntityType, row: Row): Entity[] => {
    const entities: Entity[] = [];

    row.tiles.forEach(tile => {
        let tileEntity = getEntityByTypeFromTile(entityType, tile);
        if (tileEntity !== undefined) entities.push(tileEntity);
    });

    return entities;
};

export const getTileByPositionFromRow = (position: number, row: Row): Tile => {
    return row.tiles[position];
};

export const replaceTileInRow = (newTile: Tile, position: number, row: Row): Row => {
    if (row.tiles[position] === undefined) return row;

    return Object.assign({}, row, {
        tiles: row.tiles.map(tile => {
            if (tile.position.x !== position) return tile;

            return newTile;
        })
    });
};

export const getEntityByIdFromRow = (id: string, row: Row): Entity => {
    let entity: Entity;

    row.tiles.forEach(tile => {
        const tileEntity = getEntityByIdFromTile(id, tile);
        if (tileEntity !== undefined) entity = tileEntity;
    });

    return entity;
};
