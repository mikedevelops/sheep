import { createEntityFactory, EntityType } from './Entity';

export const createGrass = createEntityFactory(EntityType.GRASS, [EntityType.SHEEP, EntityType.PLAYER]);
