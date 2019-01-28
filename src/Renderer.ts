import { Grid } from './Grid';
import { LevelManager } from './Level';

export type Renderer = (grid: Grid, levelManager: LevelManager) => void;
