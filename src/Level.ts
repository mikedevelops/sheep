import { EntityType } from './Entity';
import { createGrid, fillGridWithEntity, Grid, spawnEntity } from './Grid';
import { addVector, createVector2, Vector2, vectorOne } from './Vector2';
import { ENTITY_FACTORY_MAP } from './Factory';
import { buildFence } from './Fence';

export interface Level {
    width: number;
    height: number;
    entities: LevelEntity[];
    terrain: EntityType;
}

export interface LevelEntity {
    x: number;
    y: number;
    type: EntityType;
    direction?: Vector2;
}

export interface LevelManager {
    next: () => Grid;
    restart: () => Grid;
    start: () => Grid;
    getLevelGoals: () => number;
    getLevelIndex: () => number;
    getTotalLevels: () => number;
    startLevelTransition: () => void;
    shouldUpdate: () => boolean;
    finishLevelTransition: () => void;
    isComplete: () => boolean;
}

export const loadLevel = (level: Level): Grid => {
    let grid = createGrid(level.width + 2, level.height + 2);

    grid = fillGridWithEntity(grid, ENTITY_FACTORY_MAP[level.terrain]);
    grid = buildFence(grid);

    level.entities.forEach(entity => {
        let factory = ENTITY_FACTORY_MAP[entity.type];

        if (entity.direction !== undefined) {
           factory =  ENTITY_FACTORY_MAP[entity.type].bind(null, entity.direction);
        }

        grid = spawnEntity(
            grid,
            factory(),
            // Add (1,1) here to account for fence
            addVector(createVector2(entity.x, entity.y), vectorOne())
        );
    });

    return grid;
};

export const createLevelManager = (levels: Level[]): LevelManager => {
    let level = 0;
    let transitioning = false;

    return {
        start: () => {
            return loadLevel(levels[0]);
        },
        next: () => {
            level++;

            if (levels[level] === undefined) return;

            return loadLevel(levels[level]);
        },
        restart: () => {
            return loadLevel(levels[level])
        },
        getLevelGoals: () => {
            return levels[level].entities.filter(e => e.type === EntityType.GOAL).length;
        },
        getLevelIndex: () => {
            return level;
        },
        getTotalLevels: () => {
            return levels.length;
        },
        startLevelTransition: () => {
            transitioning = true;
        },
        finishLevelTransition: () => {
            transitioning = false;
        },
        shouldUpdate: () => {
            return !transitioning;
        },
        isComplete: () => {
            return level === levels.length;
        }
    };
};
