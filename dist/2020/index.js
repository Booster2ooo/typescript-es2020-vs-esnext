"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Foo_buzz;
const PropertyProxy = () => {
    return (target, propertyName, descriptor = null) => {
        // console.log("target", target);
        // console.log("propertyName", propertyName);
        // console.log("descriptor", descriptor);
        if (!descriptor) {
            const hiddenPropertyName = `__${String(propertyName)}`;
            descriptor = {
                get: function () {
                    return this[hiddenPropertyName];
                },
                set: function (value) {
                    console.log(`Replacing value '${this[hiddenPropertyName]}' with new value '${value}' for property '${propertyName}'.`);
                    this[hiddenPropertyName] = value;
                }
            };
            Object.defineProperty(target, propertyName, descriptor);
            return;
        }
        if (descriptor.set) {
            const set = descriptor.set;
            descriptor.set = function (value) {
                console.log(`Replacing value '${this[propertyName]}' with new value '${value}' for property '${propertyName}'.`);
                set.call(this, value);
            };
        }
    };
};
class Foo {
    constructor() {
        this.bar = "hello";
        _Foo_buzz.set(this, 42);
    }
    get buzz() {
        return __classPrivateFieldGet(this, _Foo_buzz, "f");
    }
    set buzz(value) {
        __classPrivateFieldSet(this, _Foo_buzz, value, "f");
    }
}
_Foo_buzz = new WeakMap();
__decorate([
    PropertyProxy()
], Foo.prototype, "bar", void 0);
__decorate([
    PropertyProxy()
], Foo.prototype, "buzz", null);
const foo = new Foo();
console.assert(foo.bar === "hello", `'foo.bar' should be 'hello'`);
console.assert(foo.buzz === 42, `'foo.buzz' should be '42'`);
foo.bar = "world";
console.assert(foo.bar === "world", `'foo.bar' should be 'world'`);
console.assert(foo["bar"] === "world", `'foo["bar"]' should be 'world'`);
foo.buzz = 21;
console.assert(foo.buzz === 21, `'foo.buzz' should be '21'`);
// const fuzz = new Foo();
// console.assert(fuzz.bar === "hello", `'fuzz.bar' should be 'hello'`);
// console.assert(fuzz.buzz === 42, `'fuzz.buzz' should be '42'`);
// fuzz.bar = "folks";
// console.assert(fuzz.bar === "folks", `'fuzz.bar' should be 'folks'`);
// console.assert(fuzz["bar"] === "folks", `'fuzz["bar"]' should be 'folks'`);
// console.assert(foo.bar === "world", `'foo.bar' should be 'world'`);
// fuzz.buzz = 84;
// console.assert(fuzz.buzz === 84, `'fuzz.buzz' should be '84'`);
// console.assert((fuzz as any).__buzz == null, `'fuzz.__buzz' should be null`);
// console.log(foo, Object.keys(foo));
