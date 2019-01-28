import { fillGridWithEntity, getEntitiesByTypeFromGrid, getEntityByIdFromGrid, Grid } from './Grid';
import { EntityType, isEntityInGoal, moveEntityAwayFromEntity } from './Entity';
import { getPlayer, movePlayerEast, movePlayerNorth, movePlayerSouth, movePlayerWest } from './Player';
import { createInputListener } from './Input';
import { getNearbyPlayerPosition } from './Sheep';
import { allGoalsComplete, completeGoal } from './Goal';
import { createLevelManager, LevelManager } from './Level';
import { basic_sheep } from '../levels/basic_sheep';
import { winFactory } from './FX';
import { basic_multi_sheep } from '../levels/basic_multi_sheep';
import { renderHTML } from './Renderers/HTML';
import { Renderer } from './Renderer';
import { basic_simultaneous_sheep } from '../levels/basic_simultaneous_sheep';

const FPS = 60;
const levelManager = createLevelManager([
    basic_sheep,
    basic_multi_sheep,
    basic_simultaneous_sheep
]);

const grid = levelManager.start();
const isInputDown = createInputListener('ArrowDown');
const isInputRight = createInputListener('ArrowRight');
const isInputUp = createInputListener('ArrowUp');
const isInputLeft = createInputListener('ArrowLeft');

let moves = 0;

const createStart = (render: Renderer) => {
    return (grid: Grid, levelManager: LevelManager) => {
        render(grid, levelManager)
    }
};

const createUpdate = (render: Renderer) => {
    const update = (gridLastFrame: Grid) => {
        let gridThisFrame = gridLastFrame;

        if (!levelManager.shouldUpdate()) return;

        if (isInputDown()) {
            gridThisFrame = movePlayerSouth(gridThisFrame);
        }

        if (isInputLeft()) {
            gridThisFrame = movePlayerWest(gridThisFrame);
        }

        if (isInputUp()) {
            gridThisFrame = movePlayerNorth(gridThisFrame);
        }

        if (isInputRight()) {
            gridThisFrame = movePlayerEast(gridThisFrame);
        }

        if (gridLastFrame !== gridThisFrame) {
            const sheeps = getEntitiesByTypeFromGrid(EntityType.SHEEP, gridThisFrame);

            sheeps.forEach(sheep => {
                const playerPosition = getNearbyPlayerPosition(sheep.position, gridThisFrame);

                if (playerPosition === undefined) return undefined;

                gridThisFrame = moveEntityAwayFromEntity(gridThisFrame, sheep, getPlayer(gridThisFrame));
                sheep = getEntityByIdFromGrid(sheep.id, gridThisFrame);

                if (isEntityInGoal(sheep, gridThisFrame)) {
                    gridThisFrame = completeGoal(gridThisFrame, sheep.position);
                }
            });

            moves++;
            render(gridThisFrame, levelManager);

            if (allGoalsComplete(levelManager.getLevelGoals(), gridThisFrame)) {
                setTimeout(() => {
                    levelManager.startLevelTransition();
                    gridThisFrame = fillGridWithEntity(gridThisFrame, winFactory);
                    render(gridThisFrame, levelManager);
                }, 500);

                setTimeout(() => {
                    gridThisFrame = levelManager.next();

                    if (levelManager.isComplete()) {
                        console.clear();
                        console.log(`Level ${levelManager.getLevelIndex()}/${levelManager.getTotalLevels()}`);
                        console.log(`Game Complete 🏆 – ${moves} Moves`);
                        return;
                    }

                    render(gridThisFrame, levelManager);
                    levelManager.finishLevelTransition();
                    setTimeout(update.bind(null, gridThisFrame), 1000 / FPS);
                }, 1000);
            }
        }

        setTimeout(update.bind(null, gridThisFrame), 1000 / FPS);
    };

    return update;
};



const root = document.getElementById('root');
const update = createUpdate(renderHTML.bind(null, root));
const start = createStart(renderHTML.bind(null, root));

start(grid, levelManager);
update(grid);
