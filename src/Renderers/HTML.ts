import { Grid } from '../Grid';
import { getRenderableEntityFromTile } from '../Tile';
import { isGoal } from '../Goal';
import { Direction } from '../Vector2';

export const renderHTML = (root: HTMLElement, grid: Grid): void => {
    const temp = document.createElement('div');

    grid.rows.forEach(row => {
        temp.appendChild(document.createElement('br'));
        row.tiles.forEach(tile => {
            const tileElement = document.createElement('span');
            const entity = getRenderableEntityFromTile(tile);

            if (isGoal(entity)) {
                let rotation = 0;

                tileElement.style.display = 'inline-block';

                switch (entity.direction) {
                    case Direction.WEST:
                        rotation = 90;
                        break;
                    case Direction.NORTH:
                        rotation = 180;
                        break;
                    case Direction.EAST:
                        rotation = 270;
                        break;
                }

                tileElement.style.transform = `rotate(${rotation}deg)`;
            }

            tileElement.className = 'tile';
            tileElement.innerText = entity.sprite;
            temp.appendChild(tileElement);
        });
    });

    root.innerHTML = temp.innerHTML;
};
