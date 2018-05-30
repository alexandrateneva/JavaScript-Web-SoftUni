let storage = require('./storage');

console.log(storage.getAll());
storage.put('one', 1);
storage.put('two', 2);
storage.put('three', 3);
//storage.put('one', 1);  -> Error
//storage.put(1, 1); -> Error
console.log(storage.getAll());

console.log(storage.get('one'));
//console.log(storage.get(1));  -> Error
//console.log(storage.get('ten'));  -> Error

storage.update('one', 'first');
//storage.update('second', 2);  -> Error
//storage.update(3, 'third');  -> Error
console.log(storage.getAll());

storage.delete('one');
//storage.delete('second');  -> Error
//storage.delete(3);  -> Error
console.log(storage.getAll());

storage.clear();
console.log(storage.getAll());

storage.put('one', 1);
storage.put('two', 2);
storage.put('three', 3);
storage.saveSync();

storage.clear();

console.log(storage.getAll());
storage.loadSync();
console.log(storage.getAll());

storage.clear();

console.log('------------asynchronously save and load------------');

storage.put('one', 1);
storage.put('two', 2);
storage.put('three', 3);
storage.save();

storage.clear();

console.log(storage.getAll());
storage.load();
console.log(storage.getAll());
setTimeout(function () { console.log(storage.getAll()) }, 1000);