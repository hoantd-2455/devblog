const animal = {
  name: "cat",
  sound: "meo meo",
  describe: function () {
    return `${this.name}: ${this.sound}`;
  },
};

const dog = Object.create(animal);
dog.name = "dog";
dog.sound = "gau gau";

console.log(dog.describe());
console.log(Object.getPrototypeOf(dog) === animal);

class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  describe() {
    return `${this.name}: ${this.sound}`;
  }
}

const dog2 = new Animal("dog2", "gau gau 2");
console.log(dog2.describe());
console.log(Object.getPrototypeOf(dog2) === Animal.prototype); // true
