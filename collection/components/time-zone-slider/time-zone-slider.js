export class TimeZoneSlider {
    positionChanged(event) {
        this.timeZoneChanged.emit(event.detail.value);
    }
    render() {
        return (h("ion-range", { debounce: 500, max: 12, min: -12, pin: true, snaps: true, step: 1, value: this.offset, onIonChange: event => this.positionChanged(event) },
            h("ion-label", { slot: "start" }, "-12"),
            h("ion-label", { slot: "end" }, "12")));
    }
    static get is() { return "time-zone-slider"; }
    static get properties() { return {
        "offset": {
            "type": Number,
            "attr": "offset"
        }
    }; }
    static get events() { return [{
            "name": "timeZoneChanged",
            "method": "timeZoneChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
}
