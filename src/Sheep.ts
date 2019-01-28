import { createEntityFactory, Entity, EntityType } from './Entity';
import { getEntityByPositionFromGrid, Grid } from './Grid';
import { addVector, Directions, Vector2 } from './Vector2';

export const createSheep = createEntityFactory(EntityType.SHEEP);

export const createIsEntityNearby = (otherEntityType: EntityType) => {
    return (entityPosition: Vector2, grid: Grid): Vector2 => {
        let otherEntityPosition: Vector2;
        const adjacentEntities: Entity[] = [
            getEntityByPositionFromGrid(addVector(entityPosition, Directions.NORTH), grid),
            getEntityByPositionFromGrid(addVector(entityPosition, Directions.EAST), grid),
            getEntityByPositionFromGrid(addVector(entityPosition, Directions.SOUTH), grid),
            getEntityByPositionFromGrid(addVector(entityPosition, Directions.WEST), grid),
        ].filter(entity => entity !== undefined);

        for (let e = 0; e < adjacentEntities.length; e++) {
            if (adjacentEntities[e].type === otherEntityType) {
                otherEntityPosition = adjacentEntities[e].position;
                break;
            }
        }

        return otherEntityPosition;
    };
};

export const getNearbyPlayerPosition = createIsEntityNearby(EntityType.PLAYER);
