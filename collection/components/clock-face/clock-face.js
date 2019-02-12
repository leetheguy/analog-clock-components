export class ClockFace {
    hourToDegrees() {
        return Math.floor(this.minute / 2) + (this.hour * 30);
    }
    minuteToDegrees() {
        return Math.floor(this.second / 10) + (this.minute * 6);
    }
    secondToDegrees() {
        return this.second * 6;
    }
    render() {
        return (h("svg", { width: "200", height: "200", xmlns: "http://www.w3.org/2000/svg" },
            h("circle", { cx: "100", cy: "100", r: "95", "stroke-width": "10", stroke: "black", fill: "transparent" }),
            h("line", { id: "hour-hand", transform: `rotate(${this.hourToDegrees()}, 100, 100)`, x1: "100", y1: "100", x2: "100", y2: "60", stroke: "black", "stroke-width": "10", "stroke-linecap": "round" }),
            h("line", { id: "minute-hand", transform: `rotate(${this.minuteToDegrees()}, 100, 100)`, x1: "100", y1: "100", x2: "100", y2: "30", stroke: "black", "stroke-width": "8", "stroke-linecap": "round" }),
            h("line", { id: "second-hand", transform: `rotate(${this.secondToDegrees()}, 100, 100)`, x1: "100", y1: "100", x2: "100", y2: "30", stroke: "black", "stroke-width": "2", "stroke-linecap": "round" })));
    }
    static get is() { return "clock-face"; }
    static get properties() { return {
        "hour": {
            "type": Number,
            "attr": "hour"
        },
        "minute": {
            "type": Number,
            "attr": "minute"
        },
        "second": {
            "type": Number,
            "attr": "second"
        }
    }; }
}
