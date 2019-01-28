import { Level } from '../src/Level';
import { EntityType } from '../src/Entity';

export const basic_simultaneous_sheep: Level = {
    terrain: EntityType.GRASS,
    width: 8,
    height : 5,
    entities: [
        { type: EntityType.PLAYER, x: 0, y: 0 },

        { type: EntityType.GOAL, x: 3, y: 0 },
        { type: EntityType.SHEEP, x: 3, y: 1 },

        { type: EntityType.GOAL, x: 5, y: 2 },
        { type: EntityType.SHEEP, x: 4, y: 2 },

        { type: EntityType.GOAL, x: 3, y: 4 },
        { type: EntityType.SHEEP, x: 3, y: 3 },
    ]
};
