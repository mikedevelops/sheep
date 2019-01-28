import { createGrass } from './Grass';
import { createPlayer } from './Player';
import { createSheep } from './Sheep';
import { createGoal } from './Goal';
import { EntityFactory, EntityType } from './Entity';

export const ENTITY_FACTORY_MAP: { [index: string]: EntityFactory } = {
    [EntityType.GRASS]: createGrass,
    [EntityType.PLAYER]: createPlayer,
    [EntityType.SHEEP]: createSheep,
    [EntityType.GOAL]: createGoal
};
