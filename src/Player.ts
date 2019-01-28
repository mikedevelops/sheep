import { createEntityFactory, Entity, EntityType } from './Entity';
import { getEntityByTypeFromGrid, Grid, moveEntity } from './Grid';
import { addVector, Directions, Vector2 } from './Vector2';

export const createPlayer = createEntityFactory(EntityType.PLAYER);

export const createMovePlayer = (direction: Vector2): (grid: Grid) => Grid => {
    return (grid: Grid): Grid => {
        const player = getEntityByTypeFromGrid(EntityType.PLAYER, grid);
        const newPosition = addVector(player.position, direction);

        return moveEntity(grid, player.position, newPosition);
    }
};

export const movePlayerNorth = createMovePlayer(Directions.NORTH);
export const movePlayerEast = createMovePlayer(Directions.EAST);
export const movePlayerSouth = createMovePlayer(Directions.SOUTH);
export const movePlayerWest = createMovePlayer(Directions.WEST);

export const getPlayer = (grid: Grid): Entity => getEntityByTypeFromGrid(EntityType.PLAYER, grid);
