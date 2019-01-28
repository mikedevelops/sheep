import { addVector, Directions, isSamePosition, Vector2 } from './Vector2';
import { getEntitiesByTypeFromGrid, Grid, moveEntity } from './Grid';

export enum EntityType {
    GRASS = '🌾️',
    PLAYER = '🐶',
    SHEEP = '🐑',
    GOAL = '🥅',
    GOAL_COMPLETE = '✅',
    WIN = '🎉',
    FENCE = '🥓'
}

export interface Entity {
    id: string;
    type: EntityType;
    sprite: string;
    position: Vector2;
    passableEntities: EntityType[];
}

export type EntityFactory = (position?: Vector2) => Entity;

export const createEntityFactory = (type: EntityType, passableEntities: EntityType[] = []): EntityFactory => {
    let id = 0;

    return (position = { x: 0, y: 0 }, meta?: { [index: string]: any }): Entity => {
        return {
            id: `${type}_${id++}`,
            passableEntities,
            type,
            sprite: type,
            position,
            ...meta
        }
    };
};

export const moveEntityAwayFromEntity = (grid: Grid, entity: Entity, otherEntity: Entity): Grid => {
    // Other entity is above, move entity South
    if (otherEntity.position.y < entity.position.y) {
        return moveEntity(grid, entity.position, addVector(entity.position, Directions.SOUTH));
    }

    // Other entity is right, move entity West
    if (otherEntity.position.x > entity.position.x) {
        return moveEntity(grid, entity.position, addVector(entity.position, Directions.WEST));
    }

    // Other entity is below, move entity North
    if (otherEntity.position.y > entity.position.y) {
        return moveEntity(grid, entity.position, addVector(entity.position, Directions.NORTH));
    }

    // Other entity is left, move entity East
    if (otherEntity.position.x < entity.position.x) {
        return moveEntity(grid, entity.position, addVector(entity.position, Directions.EAST));
    }
};

export const isEntityInGoal = (entity: Entity, grid: Grid): boolean => {
    const goals = getEntitiesByTypeFromGrid(EntityType.GOAL, grid);

    for (let g = 0; g < goals.length; g++) {
        if (isSamePosition(goals[g].position, entity.position)) {
            return true;
        }

    }

    return false;
};
