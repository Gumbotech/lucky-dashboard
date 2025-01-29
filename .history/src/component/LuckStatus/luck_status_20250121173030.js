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
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { List, Button, Input } from "antd";

const SortableItem = ({ id, item }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: "grab",
        padding: "8px",
        background: "#f0f0f0",
        borderRadius: "4px",
        marginBottom: "8px",
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
        if (newStatus.trim()) {
            setItems([...items, newStatus]);
            setNewStatus("");
        }
    };

    const saveChanges = () => {
        console.log("Saved Order:", items); // Replace with API call if needed
        alert("Order saved!");
    };

    return (
        <div style={{ padding: "24px", width: "400px", marginLeft: "0", marginTop: "16px" }}>
            <h3>Luck Status</h3>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={items} strategy={verticalListSortingStrategy}>
                    <List
                        dataSource={items}
                        renderItem={(item) => (
                            <List.Item style={{ padding: 0, borderBottom: "none" }}>
                                <SortableItem id={item} item={item} />
                            </List.Item>
                        )}
                    />
                </SortableContext>
            </DndContext>

            <div style={{ marginTop: "16px" }}>
                <Input
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    placeholder="Add new status"
                    style={{ marginBottom: "8px" }}
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
