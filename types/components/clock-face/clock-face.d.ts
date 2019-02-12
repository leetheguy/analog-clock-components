import '../../stencil.core';
export declare class ClockFace {
    hour: number;
    minute: number;
    second: number;
    hourToDegrees(): number;
    minuteToDegrees(): number;
    secondToDegrees(): number;
    render(): JSX.Element;
}
