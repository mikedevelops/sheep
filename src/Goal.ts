import { createEntityFactory, Entity, EntityType } from './Entity';
import { getEntitiesByTypeFromGrid, Grid, replaceTileInGrid } from './Grid';
import { createTile } from './Tile';
import { Direction, Vector2 } from './Vector2';

export interface Goal extends Entity {
    direction: Direction;
}

export const isGoal = (object: any): object is Goal => {
    return 'direction' in object;
};

export const createGoal = createEntityFactory(EntityType.GOAL, [EntityType.SHEEP]);
export const createGoalCompleted = createEntityFactory(EntityType.GOAL_COMPLETE);

export const completeGoal = (grid: Grid, goalPosition: Vector2): Grid => {
    const tile = createTile(goalPosition, [createGoalCompleted()]);

    return replaceTileInGrid(tile, grid);
};

export const allGoalsComplete = (goals: number, grid: Grid): boolean => {
    return getEntitiesByTypeFromGrid(EntityType.GOAL_COMPLETE, grid).length === goals;
};
