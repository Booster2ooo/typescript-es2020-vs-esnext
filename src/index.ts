const PropertyProxy = () => {
  return (target: any, propertyName: string, descriptor: PropertyDescriptor|null = null) => {
      // console.log("target", target);
      // console.log("propertyName", propertyName);
      // console.log("descriptor", descriptor);
      if (!descriptor) {
        const hiddenPropertyName = `__${String(propertyName)}`;
        descriptor = {
          get: function() {
            return (this as any)[hiddenPropertyName];
          },
          set: function(value: any) {
            console.log(`Replacing value '${(this as any)[hiddenPropertyName]}' with new value '${value}' for property '${propertyName}'.`);
            (this as any)[hiddenPropertyName] = value;
          }
        }
        Object.defineProperty(target, propertyName, descriptor);
        return;
      }
      if (descriptor.set) {
        const set = descriptor.set;
        descriptor.set = function(value: any) {
          console.log(`Replacing value '${(this as any)[propertyName]}' with new value '${value}' for property '${propertyName}'.`);
          set.call(this, value);
        }
      }
  }
}

class Foo {
  @PropertyProxy()
  bar: string = "hello";

  _buzz: number = 42;
  @PropertyProxy()
  get buzz(): number {
    return this._buzz;
  }
  set buzz(value: number) {
    this._buzz = value;
  }
}

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