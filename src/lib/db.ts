import Dexie, { type Table } from "dexie";
import { useLiveQuery } from "dexie-react-hooks";


class AppDB extends Dexie {
    tasks!: Table<Task, number>;

    constructor() {
        super("AppDB");
        this.version(1).stores({
            tasks: "++id, description, completed, order"
        });
    }
}

export interface Task {
    id?: number;
    description: string;
    completed: boolean;
    order: number;
}


export const db = new AppDB();

export const useTasks = () => useLiveQuery(() => db.tasks.orderBy("order").toArray());