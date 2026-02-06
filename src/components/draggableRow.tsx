import type { Task } from "@/lib/db";
import { db } from "@/lib/db";
import { TableRow, TableCell } from "./ui/table"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

const DraggableRow = ({ task }: { task: Task }) => {
    const {
        setNodeRef,
        transform,
        transition,
        attributes,
        listeners,
    } = useSortable({ id: task.id as number })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }
    const onDelete = (id?: number) => {
        if (!id) return;
        db.tasks.delete(id);
    }
    return (
        <TableRow
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors"
        >
            <TableCell className="w-[80%]">{task.description}</TableCell>
            <TableCell className="w-[20%]">
                <div
                    className="flex items-center justify-center gap-2"
                >
                    <Checkbox
                        checked={task.completed}
                        onPointerDown={(e) => e.stopPropagation()}
                        onCheckedChange={(checked) => {
                            if (!task.id) return;
                            db.tasks.update(task.id, { completed: !!checked });
                        }}
                    />
                    <Button
                        variant="destructive"
                        size="icon"
                        aria-label="Delete task"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={() => onDelete(task.id)}
                    >
                        <Trash />
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    )
}

export default DraggableRow