const fs = require('fs');
const path = './database/storage.json';
let storage = {};

module.exports = {
    put: (key, value) => {
        checkIfKeyTypeIsString(key);
        checkIfKeyExist(key);
        storage[key] = value;
    },
    get: (key) => {
        checkIfKeyTypeIsString(key);
        checkIfKeyDoesNotExist(key);
        return storage[key];
    },
    getAll: () => {
        if (Object.keys(storage).length === 0) {
            return 'There are no items in the storage.';
        }
        return storage;
    },
    update: (key, newValue) => {
        checkIfKeyTypeIsString(key);
        checkIfKeyDoesNotExist(key);
        storage[key] = newValue;
    },
    delete: (key) => {
        checkIfKeyTypeIsString(key);
        checkIfKeyDoesNotExist(key);
        delete storage[key];
    },
    clear: () => {
        storage = {};
    },
    saveSync: () => {
        fs.writeFileSync(path, JSON.stringify(storage));
        console.log("Saved succesfully!");
    },
    loadSync: () => {
        storage = JSON.parse(fs.readFileSync(path));
        console.log("Loaded succesfully!");
    },
    save: () => {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, JSON.stringify(storage), (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log("Saved succesfully!");
                resolve();
            });
        })
    },
    load: () => {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                storage = JSON.parse(data);
                console.log("Loaded succesfully!");
                resolve();
            })
        })
    }
}


function checkIfKeyTypeIsString(key) {
    if (typeof key !== 'string') {
        throw new Error('Key must be a string!');
    }
}

function checkIfKeyDoesNotExist(key) {
    if (!storage.hasOwnProperty(key)) {
        throw new Error('Key does not exist!');
    }
}

function checkIfKeyExist(key) {
    if (storage.hasOwnProperty(key)) {
        throw new Error('Key already exists!');
    }
}
