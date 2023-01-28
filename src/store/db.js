import Dexie from "dexie";




export const db = new Dexie('App');
db.version(1).stores({
    data: '++id,date'
});

