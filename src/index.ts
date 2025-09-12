import 'reset-css';
import './index.scss';

import { CatchTheDotGame } from './catch-the-dot-game/catch-the-dot-game';

function Game() {
    return {
        run() {
            const appRootElement: HTMLElement = document.getElementById('app-root') as HTMLElement;
            const catchTheDotGame = CatchTheDotGame(appRootElement);
            catchTheDotGame.startGame();
        },
    };
}

const game = Game();
game.run();
