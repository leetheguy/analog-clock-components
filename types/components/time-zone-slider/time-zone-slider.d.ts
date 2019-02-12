import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
import '@ionic/core';
export declare class TimeZoneSlider {
    offset: number;
    timeZoneChanged: EventEmitter;
    positionChanged(event: CustomEvent): void;
    render(): JSX.Element;
}
