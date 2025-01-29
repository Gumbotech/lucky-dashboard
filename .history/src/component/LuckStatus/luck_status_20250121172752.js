import React, { useState } from "react";
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    useSortable,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { List, Button, Input, message } from "antd";

const MAX_COLUMNS = 3; // Maximum number of columns per row

const SortableItem = ({ id, item }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: "grab",
        padding: "8px 16px",
        background: "#f0f0f0",
        borderRadius: "4px",
        margin: "0 8px",
        display: "inline-block", // Make items inline
        flexBasis: `calc(33.33% - 16px)`, // Ensures 3 items per row with margin
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {item}
        </div>
    );
};

const DragAndDropList = () => {
    const [items, setItems] = useState(["Lucky", "Unlucky", "Average"]);
    const [newStatus, setNewStatus] = useState("");

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = items.indexOf(active.id);
            const newIndex = items.indexOf(over.id);
            setItems((items) => arrayMove(items, oldIndex, newIndex));
        }
    };

    const addNewStatus = () => {
        if (items.length >= MAX_COLUMNS * 2) { // Allow a maximum of 6 items
            message.error(`You can only add up to ${MAX_COLUMNS * 2} items.`);
            return;
        }

        if (newStatus.trim()) {
            setItems([...items, newStatus]);
            setNewStatus("");
        }
    };

    const saveChanges = () => {
        console.log("Saved Order:", items); // Replace with API call if needed
        message.success("Order saved!");
    };

    return (
        <div style={{ padding: "16px", maxWidth: "600px", margin: "0 auto" }}>
            <h3>Luck Status</h3>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={items} strategy={horizontalListSortingStrategy}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {items.map((item) => (
                            <SortableItem key={item} id={item} item={item} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            <div style={{ marginTop: "16px" }}>
                <Input
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    placeholder="Add new status"
                    style={{ marginBottom: "8px", maxWidth: "300px" }}
                />
                <Button type="primary" onClick={addNewStatus} style={{ marginRight: "8px" }}>
                    Add
                </Button>
                <Button type="primary" onClick={saveChanges}>
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default DragAndDropList;
