import React, { useState } from "react";
import { List, Button, Modal, Input, Select, Typography, message } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const { Option } = Select;
const { Text } = Typography;

const initialData = [
  { id: "1", status: "Lucky", description: "Great day to take risks!" },
  { id: "2", status: "Unlucky", description: "Avoid major decisions." },
  { id: "3", status: "Average", description: "A neutral day overall." },
];

const LuckStatusManager = () => {
  const [data, setData] = useState(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedData = Array.from(data);
    const [movedItem] = reorderedData.splice(result.source.index, 1);
    reorderedData.splice(result.destination.index, 0, movedItem);

    setData(reorderedData);
    message.success("Order updated!");
  };

  const handleAddStatus = () => {
    if (!newStatus || !newDescription) {
      message.error("Please fill in all fields!");
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      status: newStatus,
      description: newDescription,
    };

    setData([...data, newItem]);
    setIsModalVisible(false);
    setNewStatus("");
    setNewDescription("");
    message.success("New status added!");
  };

  const handleSaveChanges = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      message.success("Changes saved!");
    }, 1000);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <Typography.Title level={3}>Luck Status Manager</Typography.Title>

      {/* Drag and Drop List */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="statuses">
          {(provided) => (
            <List
              ref={provided.innerRef}
              {...provided.droppableProps}
              dataSource={data}
              renderItem={(item, index) => (
                <Draggable draggableId={item.id} index={index} key={item.id}>
                  {(provided) => (
                    <List.Item
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px 16px",
                        marginBottom: "8px",
                        backgroundColor: "#f9f9f9",
                        border: "1px solid #d9d9d9",
                        borderRadius: "4px",
                        ...provided.draggableProps.style,
                      }}
                    >
                      <div>
                        <Text strong>{item.status}</Text>
                        <br />
                        <Text type="secondary">{item.description}</Text>
                      </div>
                    </List.Item>
                  )}
                </Draggable>
              )}
            >
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>

      {/* Buttons */}
      <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between" }}>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Add New Status
        </Button>
        <Button type="default" onClick={handleSaveChanges} loading={saving}>
          Save Changes
        </Button>
      </div>

      {/* Modal for Adding New Status */}
      <Modal
        title="Add New Luck Status"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleAddStatus}
      >
        <div style={{ marginBottom: 16 }}>
          <label>Status:</label>
          <Select
            placeholder="Select a status"
            value={newStatus}
            onChange={(value) => setNewStatus(value)}
            style={{ width: "100%" }}
          >
            <Option value="Lucky">Lucky</Option>
            <Option value="Unlucky">Unlucky</Option>
            <Option value="Average">Average</Option>
          </Select>
        </div>
        <div>
          <label>Description:</label>
          <Input.TextArea
            placeholder="Enter a description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            rows={4}
          />
        </div>
      </Modal>
    </div>
  );
};

export default LuckStatusManager;
