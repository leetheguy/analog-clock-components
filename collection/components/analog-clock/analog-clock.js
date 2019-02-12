export class AnalogClock {
    constructor() {
        this.time = Date.now();
        this.timeZone = 0;
    }
    timeZoneChangedHandler(event) {
        this.timeZone = event.detail;
    }
    componentDidLoad() {
        this.timer = window.setInterval(() => {
            this.time = Date.now();
        }, 250);
    }
    componentDidUnload() {
        clearInterval(this.timer);
    }
    get hour() {
        return new Date(this.time).getHours();
    }
    get minute() {
        return new Date(this.time).getMinutes();
    }
    get second() {
        return new Date(this.time).getSeconds();
    }
    render() {
        return (h("div", null,
            h("clock-face", { hour: this.hour + this.timeZone, minute: this.minute, second: this.second }),
            h("time-zone-slider", { offset: this.timeZone })));
    }
    static get is() { return "analog-clock"; }
    static get properties() { return {
        "time": {
            "state": true
        },
        "timeZone": {
            "state": true
        }
    }; }
    static get listeners() { return [{
            "name": "timeZoneChanged",
            "method": "timeZoneChangedHandler"
        }]; }
}
