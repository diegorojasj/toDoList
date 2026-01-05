import { db, useTasks } from "@/lib/db";
import { ScrollArea } from "./ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

const AppTable = () => {
    const tasks = useTasks();
    const onDelete = (id?: number) => {
        if (!id) return;
        db.tasks.delete(id);
    }
    return <div className="mt-10 w-full rounded-md border">
        {/* Header */}
        <Table className="table-fixed w-full">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[80%]">Task</TableHead>
                    <TableHead className="w-[20%] text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>
        </Table>

        {/* Scrollable body */}
        <ScrollArea className="h-64">
            <Table className="table-fixed w-full">
                <TableBody>
                    {tasks?.map((task, index) => (
                        <TableRow key={index}>
                            <TableCell className="w-[80%]">{task.description}</TableCell>
                            <TableCell className="w-[20%]">
                                <div className="flex items-center justify-center gap-2">
                                    <Checkbox
                                        checked={task.completed}
                                        onCheckedChange={(checked) => {
                                            if (!task.id) return;
                                            db.tasks.update(task.id, { completed: !!checked });
                                        }}
                                    />
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        aria-label="Delete task"
                                        onClick={() => onDelete(task.id)}
                                    >
                                        <Trash />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>
    </div>
}

export default AppTable