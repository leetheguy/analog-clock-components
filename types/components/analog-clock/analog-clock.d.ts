import '../../stencil.core';
export declare class AnalogClock {
    timer: number;
    time: number;
    timeZone: number;
    timeZoneChangedHandler(event: CustomEvent): void;
    componentDidLoad(): void;
    componentDidUnload(): void;
    readonly hour: number;
    readonly minute: number;
    readonly second: number;
    render(): JSX.Element;
}
