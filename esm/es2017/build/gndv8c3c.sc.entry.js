import { h } from '../mycomponent.core.js';

class AnalogClock {
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

class ClockFace {
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

class TimeZoneSlider {
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

function hostContext(selector, el) {
    return el.closest(selector) !== null;
}
function createColorClasses(color) {
    return (typeof color === 'string' && color.length > 0) ? {
        'ion-color': true,
        [`ion-color-${color}`]: true
    } : undefined;
}

class Label {
    constructor() {
        this.noAnimate = false;
    }
    componentWillLoad() {
        this.noAnimate = (this.position === "floating");
        this.emitStyle();
    }
    componentDidLoad() {
        if (this.noAnimate) {
            setTimeout(() => {
                this.noAnimate = false;
            }, 1000);
        }
    }
    positionChanged() {
        this.emitStyle();
    }
    emitStyle() {
        const position = this.position;
        this.ionStyle.emit({
            "label": true,
            [`label-${position}`]: position !== undefined
        });
    }
    hostData() {
        const position = this.position;
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`label-${position}`]: position !== undefined, [`label-no-animate`]: (this.noAnimate) })
        };
    }
    static get is() { return "ion-label"; }
    static get encapsulation() { return "scoped"; }
    static get properties() {
        return {
            "color": {
                "type": String,
                "attr": "color"
            },
            "el": {
                "elementRef": true
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "noAnimate": {
                "state": true
            },
            "position": {
                "type": String,
                "attr": "position",
                "watchCallbacks": ["positionChanged"]
            }
        };
    }
    static get events() {
        return [{
                "name": "ionStyle",
                "method": "ionStyle",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get style() { return ".item.sc-ion-label-ios-h, .item   .sc-ion-label-ios-h{--color:initial;display:block;color:var(--color);font-family:var(--ion-font-family,inherit);font-size:inherit;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box}.ion-color.sc-ion-label-ios-h{color:var(--ion-color-base)}[text-wrap].sc-ion-label-ios-h{white-space:normal}.item-interactive-disabled.sc-ion-label-ios-h, .item-interactive-disabled   .sc-ion-label-ios-h{cursor:default;opacity:.3;pointer-events:none}.item-input.sc-ion-label-ios-h, .item-input   .sc-ion-label-ios-h{-ms-flex:initial;flex:initial;max-width:200px;pointer-events:none}.label-fixed.sc-ion-label-ios-h{-ms-flex:0 0 100px;flex:0 0 100px;width:100px;min-width:100px;max-width:200px}.label-floating.sc-ion-label-ios-h, .label-stacked.sc-ion-label-ios-h{margin-bottom:0;-ms-flex-item-align:stretch;align-self:stretch;width:auto;max-width:100%}.item-has-focus.label-floating.sc-ion-label-ios-h, .item-has-focus   .label-floating.sc-ion-label-ios-h, .item-has-placeholder.label-floating.sc-ion-label-ios-h, .item-has-placeholder   .label-floating.sc-ion-label-ios-h, .item-has-value.label-floating.sc-ion-label-ios-h, .item-has-value   .label-floating.sc-ion-label-ios-h{-webkit-transform:translateZ(0) scale(.8);transform:translateZ(0) scale(.8)}.label-no-animate.label-floating.sc-ion-label-ios-h{-webkit-transition:none;transition:none}[text-wrap].sc-ion-label-ios-h{font-size:14px;line-height:1.5}.label-stacked.sc-ion-label-ios-h{margin-bottom:4px;font-size:13.6px}.label-floating.sc-ion-label-ios-h{margin-bottom:0;-webkit-transform:translate3d(0,27px,0);transform:translate3d(0,27px,0);-webkit-transform-origin:left top;transform-origin:left top;-webkit-transition:-webkit-transform .15s ease-in-out;transition:-webkit-transform .15s ease-in-out;transition:transform .15s ease-in-out;transition:transform .15s ease-in-out,-webkit-transform .15s ease-in-out}[dir=rtl].label-floating.sc-ion-label-ios-h{-webkit-transform-origin:right top;transform-origin:right top}.sc-ion-label-ios-s  h1 {font-size:24px}.sc-ion-label-ios-s  h1 , .sc-ion-label-ios-s  h2 {margin-left:0;margin-right:0;margin-top:0;margin-bottom:2px;font-weight:400}.sc-ion-label-ios-s  h2 {font-size:17px}.sc-ion-label-ios-s  h3 , .sc-ion-label-ios-s  h4 , .sc-ion-label-ios-s  h5 , .sc-ion-label-ios-s  h6 {margin-left:0;margin-right:0;margin-top:0;margin-bottom:3px;font-size:14px;font-weight:400;line-height:normal}.sc-ion-label-ios-s  p {margin-left:0;margin-right:0;margin-top:0;margin-bottom:2px;font-size:14px;line-height:normal;text-overflow:inherit;overflow:inherit}.sc-ion-label-ios-s > p{color:var(--ion-color-step-400,#999)}.sc-ion-label-ios-h.ion-color.sc-ion-label-ios-s > p, .ion-color .sc-ion-label-ios-h.sc-ion-label-ios-s > p{color:inherit}.sc-ion-label-ios-s  h2:last-child , .sc-ion-label-ios-s  h3:last-child , .sc-ion-label-ios-s  h4:last-child , .sc-ion-label-ios-s  h5:last-child , .sc-ion-label-ios-s  h6:last-child , .sc-ion-label-ios-s  p:last-child {margin-bottom:0}"; }
    static get styleMode() { return "ios"; }
}

function clamp(min, n, max) {
    return Math.max(min, Math.min(n, max));
}
function debounceEvent(event, wait) {
    const original = event._original || event;
    return {
        _original: event,
        emit: debounce(original.emit.bind(original), wait)
    };
}
function debounce(func, wait = 0) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(func, wait, ...args);
    };
}

class Range {
    constructor() {
        this.noUpdate = false;
        this.hasFocus = false;
        this.ratioA = 0;
        this.ratioB = 0;
        this.debounce = 0;
        this.name = "";
        this.dualKnobs = false;
        this.min = 0;
        this.max = 100;
        this.pin = false;
        this.snaps = false;
        this.step = 1;
        this.disabled = false;
        this.value = 0;
        this.handleKeyboard = (knob, isIncrease) => {
            let step = this.step;
            step = step > 0 ? step : 1;
            step = step / (this.max - this.min);
            if (!isIncrease) {
                step *= -1;
            }
            if (knob === "A") {
                this.ratioA = clamp(0, this.ratioA + step, 1);
            }
            else {
                this.ratioB = clamp(0, this.ratioB + step, 1);
            }
            this.updateValue();
        };
    }
    debounceChanged() {
        this.ionChange = debounceEvent(this.ionChange, this.debounce);
    }
    minChanged() {
        if (!this.noUpdate) {
            this.updateRatio();
        }
    }
    maxChanged() {
        if (!this.noUpdate) {
            this.updateRatio();
        }
    }
    disabledChanged() {
        if (this.gesture) {
            this.gesture.setDisabled(this.disabled);
        }
        this.emitStyle();
    }
    valueChanged(value) {
        if (!this.noUpdate) {
            this.updateRatio();
        }
        this.ionChange.emit({ value });
    }
    onBlur() {
        if (this.hasFocus) {
            this.hasFocus = false;
            this.ionBlur.emit();
            this.emitStyle();
        }
    }
    onFocus() {
        if (!this.hasFocus) {
            this.hasFocus = true;
            this.ionFocus.emit();
            this.emitStyle();
        }
    }
    componentWillLoad() {
        this.updateRatio();
        this.debounceChanged();
        this.emitStyle();
    }
    async componentDidLoad() {
        this.gesture = (await import('./chunk-f56eaea8.js')).createGesture({
            el: this.rangeSlider,
            queue: this.queue,
            gestureName: "range",
            gesturePriority: 100,
            threshold: 0,
            onStart: ev => this.onStart(ev),
            onMove: ev => this.onMove(ev),
            onEnd: ev => this.onEnd(ev),
        });
        this.gesture.setDisabled(this.disabled);
    }
    componentDidUnload() {
        if (this.gesture) {
            this.gesture.destroy();
            this.gesture = undefined;
        }
    }
    getValue() {
        const value = this.value || 0;
        if (this.dualKnobs) {
            if (typeof value === "object") {
                return value;
            }
            return {
                lower: 0,
                upper: value
            };
        }
        else {
            if (typeof value === "object") {
                return value.upper;
            }
            return value;
        }
    }
    emitStyle() {
        this.ionStyle.emit({
            "interactive": true,
            "interactive-disabled": this.disabled
        });
    }
    onStart(detail) {
        const rect = this.rect = this.rangeSlider.getBoundingClientRect();
        const currentX = detail.currentX;
        const ratio = clamp(0, (currentX - rect.left) / rect.width, 1);
        this.pressedKnob =
            !this.dualKnobs ||
                Math.abs(this.ratioA - ratio) < Math.abs(this.ratioB - ratio)
                ? "A"
                : "B";
        this.setFocus(this.pressedKnob);
        this.update(currentX);
    }
    onMove(detail) {
        this.update(detail.currentX);
    }
    onEnd(detail) {
        this.update(detail.currentX);
        this.pressedKnob = undefined;
    }
    update(currentX) {
        const rect = this.rect;
        let ratio = clamp(0, (currentX - rect.left) / rect.width, 1);
        if (this.snaps) {
            ratio = valueToRatio(ratioToValue(ratio, this.min, this.max, this.step), this.min, this.max);
        }
        if (this.pressedKnob === "A") {
            this.ratioA = ratio;
        }
        else {
            this.ratioB = ratio;
        }
        this.updateValue();
    }
    get valA() {
        return ratioToValue(this.ratioA, this.min, this.max, this.step);
    }
    get valB() {
        return ratioToValue(this.ratioB, this.min, this.max, this.step);
    }
    get ratioLower() {
        if (this.dualKnobs) {
            return Math.min(this.ratioA, this.ratioB);
        }
        return 0;
    }
    get ratioUpper() {
        if (this.dualKnobs) {
            return Math.max(this.ratioA, this.ratioB);
        }
        return this.ratioA;
    }
    updateRatio() {
        const value = this.getValue();
        const { min, max } = this;
        if (this.dualKnobs) {
            this.ratioA = valueToRatio(value.lower, min, max);
            this.ratioB = valueToRatio(value.upper, min, max);
        }
        else {
            this.ratioA = valueToRatio(value, min, max);
        }
    }
    updateValue() {
        this.noUpdate = true;
        const { valA, valB } = this;
        this.value = !this.dualKnobs
            ? valA
            : {
                lower: Math.min(valA, valB),
                upper: Math.max(valA, valB)
            };
        this.noUpdate = false;
    }
    setFocus(knob) {
        if (this.el.shadowRoot) {
            const knobEl = this.el.shadowRoot.querySelector(knob === "A" ? ".range-knob-a" : ".range-knob-b");
            if (knobEl) {
                knobEl.focus();
            }
        }
    }
    hostData() {
        return {
            class: Object.assign({}, createColorClasses(this.color), { "in-item": hostContext("ion-item", this.el), "range-disabled": this.disabled, "range-pressed": this.pressedKnob !== undefined, "range-has-pin": this.pin })
        };
    }
    render() {
        const { min, max, step, ratioLower, ratioUpper } = this;
        const barL = `${ratioLower * 100}%`;
        const barR = `${100 - ratioUpper * 100}%`;
        const ticks = [];
        if (this.snaps) {
            for (let value = min; value <= max; value += step) {
                const ratio = valueToRatio(value, min, max);
                ticks.push({
                    ratio,
                    active: ratio >= ratioLower && ratio <= ratioUpper,
                    left: `${ratio * 100}%`
                });
            }
        }
        return [
            h("slot", { name: "start" }),
            h("div", { class: "range-slider", ref: el => this.rangeSlider = el }, ticks.map(t => (h("div", { style: { left: t.left }, role: "presentation", class: {
                    "range-tick": true,
                    "range-tick-active": t.active
                } }))), h("div", { class: "range-bar", role: "presentation" }), h("div", { class: "range-bar range-bar-active", role: "presentation", style: {
                    left: barL,
                    right: barR
                } }), renderKnob({
                knob: "A",
                pressed: this.pressedKnob === "A",
                value: this.valA,
                ratio: this.ratioA,
                pin: this.pin,
                disabled: this.disabled,
                handleKeyboard: this.handleKeyboard,
                min,
                max
            }), this.dualKnobs && renderKnob({
                knob: "B",
                pressed: this.pressedKnob === "B",
                value: this.valB,
                ratio: this.ratioB,
                pin: this.pin,
                disabled: this.disabled,
                handleKeyboard: this.handleKeyboard,
                min,
                max
            })),
            h("slot", { name: "end" })
        ];
    }
    static get is() { return "ion-range"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "color": {
                "type": String,
                "attr": "color"
            },
            "debounce": {
                "type": Number,
                "attr": "debounce",
                "watchCallbacks": ["debounceChanged"]
            },
            "disabled": {
                "type": Boolean,
                "attr": "disabled",
                "watchCallbacks": ["disabledChanged"]
            },
            "dualKnobs": {
                "type": Boolean,
                "attr": "dual-knobs"
            },
            "el": {
                "elementRef": true
            },
            "max": {
                "type": Number,
                "attr": "max",
                "watchCallbacks": ["maxChanged"]
            },
            "min": {
                "type": Number,
                "attr": "min",
                "watchCallbacks": ["minChanged"]
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "name": {
                "type": String,
                "attr": "name"
            },
            "pin": {
                "type": Boolean,
                "attr": "pin"
            },
            "pressedKnob": {
                "state": true
            },
            "queue": {
                "context": "queue"
            },
            "ratioA": {
                "state": true
            },
            "ratioB": {
                "state": true
            },
            "snaps": {
                "type": Boolean,
                "attr": "snaps"
            },
            "step": {
                "type": Number,
                "attr": "step"
            },
            "value": {
                "type": Number,
                "attr": "value",
                "mutable": true,
                "watchCallbacks": ["valueChanged"]
            }
        };
    }
    static get events() {
        return [{
                "name": "ionChange",
                "method": "ionChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionStyle",
                "method": "ionStyle",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionFocus",
                "method": "ionFocus",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionBlur",
                "method": "ionBlur",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get listeners() {
        return [{
                "name": "focusout",
                "method": "onBlur"
            }, {
                "name": "focusin",
                "method": "onFocus"
            }];
    }
    static get style() { return ".sc-ion-range-ios-h{--knob-handle-size:calc(var(--knob-size) * 2);display:-ms-flexbox;display:flex;position:relative;-ms-flex:3;flex:3;-ms-flex-align:center;align-items:center;font-family:var(--ion-font-family,inherit);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}.range-disabled.sc-ion-range-ios-h{pointer-events:none}.sc-ion-range-ios-s > ion-label{-ms-flex:initial;flex:initial}.sc-ion-range-ios-s > ion-icon[slot]{font-size:24px}.range-slider.sc-ion-range-ios{position:relative;-ms-flex:1;flex:1;width:100%;height:var(--height);contain:size layout style;cursor:-webkit-grab;cursor:grab;-ms-touch-action:pan-y;touch-action:pan-y}.range-pressed.sc-ion-range-ios-h   .range-slider.sc-ion-range-ios{cursor:-webkit-grabbing;cursor:grabbing}.range-pin.sc-ion-range-ios{position:absolute;background:var(--ion-color-base);color:var(--ion-color-contrast);-webkit-box-sizing:border-box;box-sizing:border-box}.range-knob-handle.sc-ion-range-ios{left:0;top:calc((var(--height) - var(--knob-handle-size)) / 2);margin-left:calc(0px - var(--knob-handle-size) / 2);position:absolute;width:var(--knob-handle-size);height:var(--knob-handle-size);text-align:center}[dir=rtl].sc-ion-range-ios-h   .range-knob-handle.sc-ion-range-ios, [dir=rtl]   .sc-ion-range-ios-h   .range-knob-handle.sc-ion-range-ios{right:0}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.range-knob-handle.sc-ion-range-ios{margin-left:unset;-webkit-margin-start:calc(0px - var(--knob-handle-size) / 2);margin-inline-start:calc(0px - var(--knob-handle-size) / 2)}}.range-knob-handle.sc-ion-range-ios:active, .range-knob-handle.sc-ion-range-ios:focus{outline:none}.range-bar.sc-ion-range-ios{border-radius:var(--bar-border-radius);left:0;top:calc((var(--height) - var(--bar-height)) / 2);position:absolute;width:100%;height:var(--bar-height);background:var(--bar-background);pointer-events:none}[dir=rtl].sc-ion-range-ios-h   .range-bar.sc-ion-range-ios, [dir=rtl]   .sc-ion-range-ios-h   .range-bar.sc-ion-range-ios{right:0}.range-knob.sc-ion-range-ios{border-radius:var(--knob-border-radius);left:calc(50% - var(--knob-size) / 2);top:calc(50% - var(--knob-size) / 2);position:absolute;width:var(--knob-size);height:var(--knob-size);background:var(--knob-background);-webkit-box-shadow:var(--knob-box-shadow);box-shadow:var(--knob-box-shadow);z-index:2;pointer-events:none}[dir=rtl].sc-ion-range-ios-h   .range-knob.sc-ion-range-ios, [dir=rtl]   .sc-ion-range-ios-h   .range-knob.sc-ion-range-ios{right:calc(50% - var(--knob-size) / 2)}.range-pressed.sc-ion-range-ios-h   .range-bar-active.sc-ion-range-ios{will-change:left,right}.in-item.sc-ion-range-ios-h{width:100%}.sc-ion-range-ios-h.in-item .sc-ion-range-ios-s > ion-label{-ms-flex-item-align:center;align-self:center}.sc-ion-range-ios-h{--knob-border-radius:50%;--knob-background:var(--ion-background-color,#fff);--knob-box-shadow:0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02);--knob-size:28px;--bar-height:1px;--bar-background:var(--ion-color-step-250,#bfbfbf);--bar-background-active:var(--ion-color-primary,#3880ff);--bar-border-radius:0;--height:42px;padding-left:16px;padding-right:16px;padding-top:8px;padding-bottom:8px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-range-ios-h{padding-left:unset;padding-right:unset;-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px}}.ion-color.sc-ion-range-ios-h   .range-bar-active.sc-ion-range-ios, .ion-color.sc-ion-range-ios-h   .range-tick-active.sc-ion-range-ios{background:var(--ion-color-base)}.sc-ion-range-ios-s > [slot=start]{margin-left:0;margin-right:16px;margin-top:0;margin-bottom:0}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-range-ios-s > [slot=start]{margin-left:unset;margin-right:unset;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:16px;margin-inline-end:16px}}.sc-ion-range-ios-s > [slot=end]{margin-left:16px;margin-right:0;margin-top:0;margin-bottom:0}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.sc-ion-range-ios-s > [slot=end]{margin-left:unset;margin-right:unset;-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-end:0;margin-inline-end:0}}.range-has-pin.sc-ion-range-ios-h{padding-top:20px}.range-bar-active.sc-ion-range-ios{bottom:0;width:auto;background:var(--bar-background-active)}.range-tick.sc-ion-range-ios{margin-left:-.5px;border-radius:0;position:absolute;top:17.5px;width:1px;height:8px;background:var(--ion-color-step-250,#bfbfbf);pointer-events:none}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.range-tick.sc-ion-range-ios{margin-left:unset;-webkit-margin-start:-.5px;margin-inline-start:-.5px}}.range-tick-active.sc-ion-range-ios{background:var(--bar-background-active)}.range-pin.sc-ion-range-ios{-webkit-transform:translate3d(0,28px,0) scale(.01);transform:translate3d(0,28px,0) scale(.01);padding-left:8px;padding-right:8px;padding-top:8px;padding-bottom:8px;display:inline-block;position:relative;top:-20px;min-width:28px;-webkit-transition:-webkit-transform .12s ease;transition:-webkit-transform .12s ease;transition:transform .12s ease;transition:transform .12s ease,-webkit-transform .12s ease;background:transparent;color:var(--ion-text-color,#000);font-size:12px;text-align:center}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.range-pin.sc-ion-range-ios{padding-left:unset;padding-right:unset;-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px}}.range-knob-pressed.sc-ion-range-ios   .range-pin.sc-ion-range-ios{-webkit-transform:translateZ(0) scale(1);transform:translateZ(0) scale(1)}.range-disabled.sc-ion-range-ios-h{opacity:.5}"; }
    static get styleMode() { return "ios"; }
}
function renderKnob({ knob, value, ratio, min, max, disabled, pressed, pin, handleKeyboard }) {
    return (h("div", { onKeyDown: (ev) => {
            const key = ev.key;
            if (key === "ArrowLeft" || key === "ArrowDown") {
                handleKeyboard(knob, false);
                ev.preventDefault();
                ev.stopPropagation();
            }
            else if (key === "ArrowRight" || key === "ArrowUp") {
                handleKeyboard(knob, true);
                ev.preventDefault();
                ev.stopPropagation();
            }
        }, class: {
            "range-knob-handle": true,
            "range-knob-a": knob === "A",
            "range-knob-b": knob === "B",
            "range-knob-pressed": pressed,
            "range-knob-min": value === min,
            "range-knob-max": value === max
        }, style: {
            "left": `${ratio * 100}%`
        }, role: "slider", tabindex: disabled ? -1 : 0, "aria-valuemin": min, "aria-valuemax": max, "aria-disabled": disabled ? "true" : null, "aria-valuenow": value }, pin && h("div", { class: "range-pin", role: "presentation" }, Math.round(value)), h("div", { class: "range-knob", role: "presentation" })));
}
function ratioToValue(ratio, min, max, step) {
    let value = (max - min) * ratio;
    if (step > 0) {
        value = Math.round(value / step) * step + min;
    }
    return clamp(min, value, max);
}
function valueToRatio(value, min, max) {
    return clamp(0, (value - min) / (max - min), 1);
}

export { AnalogClock, ClockFace, TimeZoneSlider, Label as IonLabel, Range as IonRange };
