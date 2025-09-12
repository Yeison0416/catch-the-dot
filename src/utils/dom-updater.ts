type DomUpdater = {
    type: string;
    moveDot: () => void;
    updateDot: (score: number) => void;
    resetDotSize: () => void;
    setTimerText: (text: string) => void;
    gameDot: HTMLElement;
    gameTimer: HTMLElement;
};

export function DomUpdater(): DomUpdater {
    const randomNumber = () => Math.floor(Math.random() * 500);

    const getDomElementById = (elementSelector: string): HTMLElement => document.getElementById(elementSelector)!;

    const setElementText = (element: HTMLElement, text: string) => (element.innerText = text);

    const setDotSize = (widthDot: number, heightDot: number) => {
        gameDot.style.width = `${widthDot}px`;
        gameDot.style.height = `${heightDot}px`;
    };

    const moveDot = () => {
        setDotSize(5, 5);
        gameDot.style.transform = `translate(${randomNumber()}px, ${randomNumber()}px)`;
    };

    const updateDot = (score: number) => {
        if (score % 3) {
            gameDot.style.backgroundColor = '#' + ((Math.random() * 0xffffff) << 0).toString(16);
        }
        setElementText(gameDot, score.toString());
    };

    const resetDotSize = () => setDotSize(30, 30);

    const setTimerText = (text: string) => setElementText(gameTimer, text);

    const gameDot: HTMLElement = getDomElementById('game-dot');
    const gameTimer: HTMLElement = getDomElementById('game-timer');

    const state = {
        type: 'dom-updater',
        moveDot,
        updateDot,
        resetDotSize,
        setTimerText,
        gameDot,
        gameTimer,
    };

    return Object.assign({}, state);
}
