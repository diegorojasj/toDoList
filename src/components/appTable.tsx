import { db, useTasks } from "@/lib/db";
import { ScrollArea } from "./ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import DraggableRow from "./draggableRow";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { useMemo } from "react";

const AppTable = () => {
    const tasks = useTasks();

    const taskIds = useMemo(() => tasks?.map((t) => t.id as number) || [], [tasks]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id && tasks) {
            const oldIndex = tasks.findIndex((t) => t.id === active.id);
            const newIndex = tasks.findIndex((t) => t.id === over?.id);

            const newOrder = arrayMove(tasks, oldIndex, newIndex);

            // Update order in DB
            newOrder.forEach((task, index) => {
                if (task.id) {
                    db.tasks.update(task.id, { order: index });
                }
            });
        }
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

        {/* Scrollable and sortable body */}
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <ScrollArea className="h-64">
                <Table className="table-fixed w-full">
                    <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
                        <TableBody>
                            {tasks?.map((task) => (
                                <DraggableRow key={task.id} task={task} />
                            ))}
                        </TableBody>
                    </SortableContext>
                </Table>
            </ScrollArea>
        </DndContext>
    </div>
}

export default AppTable