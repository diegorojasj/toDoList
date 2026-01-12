import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Field } from "./ui/field";
import { Input } from "./ui/input";
import { db } from "@/lib/db";
import { useState } from "react";

const AppForm = () => {
    const [input, setInput] = useState("");
    const onAdd = async () => {
        const tasks = await db.tasks.toArray()
        db.tasks.add({ description: input, completed: false, order: tasks.length + 1 });
        setInput("");
    }
    return <form onSubmit={(e) => { e.preventDefault(); onAdd() }}>
        <Field orientation="horizontal" >
            <Input placeholder="Add a task" value={input} onChange={(e) => setInput(e.target.value)} required />
            <Button type="submit" variant="outline" size="icon" aria-label="Submit">
                <Plus />
            </Button>
        </Field>
    </form>
}

export default AppForm