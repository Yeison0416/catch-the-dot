import template from './catch-the-dot-game.hbs';

type CatchTheDotGame = {
    readonly type: string;
    startGame: () => void;
};

export function CatchTheDotGame(appRootNode: HTMLElement): CatchTheDotGame {
    const catchTheDotGameTemplate = template();
    appRootNode.innerHTML = catchTheDotGameTemplate;

    const state = {
        type: 'catch-the-dot',
        startGame() {},
    };

    return Object.assign({}, state);
}
