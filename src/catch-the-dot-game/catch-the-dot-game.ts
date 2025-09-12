import { fromEvent, interval, map, scan, switchMap, takeWhile, tap } from 'rxjs';
import template from './catch-the-dot-game.hbs';
import { DomUpdater } from '../utils/dom-updater';

type CatchTheDotGame = {
    readonly type: string;
    startGame: () => void;
};

type State = {
    score: number;
    intrvl: number;
};

export function CatchTheDotGame(appRootNode: HTMLElement): CatchTheDotGame {
    const catchTheDotGameTemplate = template();
    appRootNode.innerHTML = catchTheDotGameTemplate;

    const domUpdater = DomUpdater();

    const gameState: State = {
        score: 0,
        intrvl: 500,
    };

    const makeInterval = (gameState: State) =>
        interval(gameState.intrvl).pipe(
            map((v) => 5 - v),
            tap((intrvlValue) => domUpdater.setTimerText(intrvlValue.toString()))
        );

    const isNotGameOver = (intervalValue: number) => intervalValue >= 0;

    const nextState = (gameState: State) => ({
        ...gameState,
        score: (gameState.score += 1),
        intrvl: gameState.score % 3 === 0 ? (gameState.intrvl -= 50) : gameState.intrvl,
    });

    const state = {
        type: 'catch-the-dot',
        startGame() {
            const $game = fromEvent(domUpdater.gameDot, 'mouseover').pipe(
                tap(domUpdater.moveDot),
                scan<Event, State>(nextState, gameState),
                tap((gameState) => domUpdater.updateDot(gameState.score)),
                switchMap(makeInterval),
                tap(domUpdater.resetDotSize),
                takeWhile(isNotGameOver)
            );

            $game.subscribe({
                next: () => {},
                error: () => {},
                complete: () => {
                    domUpdater.setTimerText('Game Over');
                },
            });
        },
    };

    return Object.assign({}, state);
}
