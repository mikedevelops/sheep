import { Level } from '../src/Level';
import { EntityType } from '../src/Entity';
import { Directions } from '../src/Vector2';

export const basic_multi_sheep: Level = {
    width: 10,
    height: 5,
    terrain: EntityType.GRASS,
    entities: [
        {
            type: EntityType.SHEEP,
            x: 4,
            y: 1
        },
        {
            type: EntityType.GOAL,
            x: 5,
            y: 1,
            direction: Directions.WEST
        },
        {
            type: EntityType.SHEEP,
            x: 4,
            y: 2
        },
        {
            type: EntityType.GOAL,
            x: 5,
            y: 2,
            direction: Directions.WEST
        },
        {
            type: EntityType.SHEEP,
            x: 4,
            y: 3
        },
        {
            type: EntityType.GOAL,
            x: 5,
            y: 3,
            direction: Directions.WEST
        },
        {
            type: EntityType.PLAYER,
            x: 0,
            y: 0
        }
    ]
};
