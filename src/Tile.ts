import { Vector2 } from './Vector2';
import { Entity, EntityType } from './Entity';
import { memoize } from 'lodash';

export interface Tile {
    position: Vector2;
    entities: Entity[];
}

export const createTile = (position: Vector2, entities: Entity[] = []): Tile => {
    return {
        position,
        entities: entities.map(entity => {
            entity.position = position;
            return entity;
        })
    };
};

export const getRenderableEntityFromTile = memoize((tile: Tile): Entity => {
    const entity = tile.entities[tile.entities.length - 1];

    if (entity === undefined) return entity;

    return Object.assign({}, entity);
});

export const addEntityToTile = (entity: Entity, tile: Tile): Tile => {
    return Object.assign({}, tile, {
        entities: [...tile.entities, Object.assign({}, entity, {
            position: tile.position
        })]
    });
};

export const removeEntityFromTile = (tile: Tile): Tile => {
    return Object.assign({}, tile, {
        entities: tile.entities.slice(0, tile.entities.length - 1)
    });
};

export const getEntityByTypeFromTile = (type: EntityType, tile: Tile): Entity => {
    let entity: Entity;

    tile.entities.forEach(tileEntity => {
        if (tileEntity.type === type) entity = tileEntity;
    });

    return entity;
};

export const getEntityByIdFromTile = (id: string, tile: Tile): Entity => {
    return tile.entities.find(entity => entity.id === id);
};
