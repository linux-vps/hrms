import React, { useState } from "react";
import { DndContext, DragOverlay, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import KanbanColumn, { Item } from './KanbanColumn';

const KanbanBoard = () => {
  // data
  const [items, setItems] = useState({
    backlog: [
      {
        unique: "z1",
        content: "User requirements analysis",
        urgency: "Urgent",
        category: "Research",
        date: "June 12",
        comments: 8,
        assignments: [
          {
            name: "John Doe",
            avatar: "/img/avatar/avatar4.png"
          },
          {
            name: "Alice Smith",
            avatar: "/img/avatar/avatar4.png"
          },
          {
            name: "Bob Johnson",
            avatar: "/img/avatar/avatar4.png"
          },
          {
            name: "Darmian",
            avatar: "/img/avatar/avatar4.png"
          }
        ]
      },
      {
        unique: "z2",
        content: "User interface design",
        urgency: "Low",
        category: "Design",
        date: "June 11",
        comments: 3,
        assignments: [
          {
            name: "John Doe",
            avatar: "/img/avatar/avatar4.png"
          },
          {
            name: "Alice Smith",
            avatar: "/img/avatar/avatar4.png"
          },
          {
            name: "Bob Johnson",
            avatar: "/img/avatar/avatar4.png"
          }
        ]
      },
      {
        unique: "z3",
        content: "Database development",
        urgency: "Medium",
        category: "Backend",
        date: "June 10",
        comments: 2,
        assignments: [
          {
            name: "John Doe",
            avatar: "/img/avatar/avatar4.png"
          },
          {
            name: "Alice Smith",
            avatar: "/img/avatar/avatar4.png"
          },
          {
            name: "Bob Johnson",
            avatar: "/img/avatar/avatar4.png"
          }
        ]
      }
    ],
    todo: [
      {
        unique: "z4",
        content: "Implement login & security",
        urgency: "Urgent",
        category: "Backend",
        date: "Jul 12",
        comments: 1,
        assignments: [
          {
            name: "John Doe",
            avatar: "/img/avatar/avatar4.png"
          },
          {
            name: "Alice Smith",
            avatar: "/img/avatar/avatar4.png"
          },
          {
            name: "Bob Johnson",
            avatar: "/img/avatar/avatar4.png"
          }
        ]
      },
      {
        unique: "z5",
        content: "Main page development",
        urgency: "Low",
        category: "Frontend",
        date: "Jul 11",
        comments: 1,
        assignments: [
          {
            name: "John Doe",
            avatar: "/img/avatar/avatar4.png"
          },
          {
            name: "Alice Smith",
            avatar: "/img/avatar/avatar4.png"
          },
          {
            name: "Bob Johnson",
            avatar: "/img/avatar/avatar4.png"
          }
        ]
      },
      {
        unique: "z6",
        content: "Project documentation",
        urgency: "Medium",
        category: "Frontend",
        date: "Jul 12",
        comments: 0,
        assignments: [
          {
            name: "John Doe",
            avatar: "/img/avatar/avatar4.png"
          },
          {
            name: "Alice Smith",
            avatar: "/img/avatar/avatar4.png"
          },
          {
            name: "Bob Johnson",
            avatar: "/img/avatar/avatar4.png"
          },
          {
            name: "Angelo",
            avatar: "/img/avatar/avatar4.png"
          },
          {
            name: "Justin",
            avatar: "/img/avatar/avatar4.png"
          }
        ]
      }
    ],
    inprogress: [
      {
        unique: "z7",
        content: "Functional testing",
        urgency: "Low",
        category: "Frontend",
        date: "Jul 8",
        comments: 1,
        assignments: [
          {
            name: "John Doe",
            avatar: "/img/avatar/avatar4.png"
          },
          {
            name: "Alice Smith",
            avatar: "/img/avatar/avatar4.png"
          },
          {
            name: "Bob Johnson",
            avatar: "/img/avatar/avatar4.png"
          }
        ]
      },
      {
        unique: "z8",
        content: "Performance optimization",
        urgency: "Low",
        category: "Frontend",
        date: "Jul 7",
        comments: 1,
        assignments: [
          {
            name: "John Doe",
            avatar: "/img/avatar/avatar4.png"
          },
          {
            name: "Alice Smith",
            avatar: "/img/avatar/avatar4.png"
          },
          {
            name: "Bob Johnson",
            avatar: "/img/avatar/avatar4.png"
          }
        ]
      },
      {
        unique: "z9",
        content: "Bug fixing",
        urgency: "Urgent",
        category: "Backend",
        date: "Jul 11",
        comments: 1,
        assignments: [
          {
            name: "John Doe",
            avatar: "/img/avatar/avatar4.png"
          },
          {
            name: "Alice Smith",
            avatar: "/img/avatar/avatar4.png"
          },
          {
            name: "Bob Johnson",
            avatar: "/img/avatar/avatar4.png"
          }
        ]
      }
    ],
    done: [
      {
        unique: "z10",
        content: "Website launch",
        urgency: "Medium",
        category: "Frontend",
        date: "Jul 22",
        comments: 1,
        assignments: [
          {
            name: "John Doe",
            avatar: "/img/avatar/avatar4.png"
          },
          {
            name: "Alice Smith",
            avatar: "/img/avatar/avatar4.png"
          },
          {
            name: "Bob Johnson",
            avatar: "/img/avatar/avatar4.png"
          }
        ]
      },
      {
        unique: "z11",
        content: "User training",
        urgency: "Low",
        category: "Research",
        date: "Jul 3",
        comments: 1,
        assignments: [
          {
            name: "John Doe",
            avatar: "/img/avatar/avatar4.png"
          },
          {
            name: "Alice Smith",
            avatar: "/img/avatar/avatar4.png"
          },
          {
            name: "Bob Johnson",
            avatar: "/img/avatar/avatar4.png"
          }
        ]
      }
    ],
    failed: []
  });
  const [activeId, setActiveId] = useState();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  return (
    <div className="flex flex-grow space-x-6 overflow-auto pb-12">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <KanbanColumn id="backlog" title="Backlog" items={items.backlog} />
        <KanbanColumn id="todo" title="Todo" items={items.todo} />
        <KanbanColumn id="inprogress" title="In Progress" items={items.inprogress} />
        <KanbanColumn id="done" title="Done" items={items.done} />
        <KanbanColumn id="failed" title="Failed" items={items.failed} />
        <DragOverlay>{activeId ? <Item id={activeId} item={activeId} /> : null}</DragOverlay>
      </DndContext>
    </div>
  );

  function findContainer(id) {
    for (const key in items) {
      if (items[key].some((item) => item.unique === id)) {
        return key;
      }
    }

    // Add this code to detect empty containers and return them as the target
    const emptyContainer = Object.keys(items).find((key) => items[key].length === 0);
    if (emptyContainer) {
      return emptyContainer;
    }
    return null;
  }

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;
    const activeContainer = findContainer(id);

    if (activeContainer) {
      const item = items[activeContainer].find((item) => item.unique === id);
      if (item) {
        setActiveId(item);
      }
    }
  }

  function handleDragOver(event) {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const overId = over ? over.id : null;

    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex((item) => item.unique === id);
      const overIndex = overItems.findIndex((item) => item.unique === overId);

      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          over &&
          overIndex === overItems.length - 1 &&
          draggingRect &&
          over.rect &&
          over.rect.height &&
          draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item.unique !== id)
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          prev[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex)
        ]
      };
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const { id } = active;
    const overId = over ? over.id : null;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer || activeContainer !== overContainer) {
      return;
    }

    const activeIndex = items[activeContainer].findIndex((item) => item.unique === id);
    const overIndex = items[overContainer].findIndex((item) => item.unique === overId);

    if (activeIndex !== overIndex) {
      setItems((prevItems) => {
        const newItems = { ...prevItems };
        newItems[overContainer] = arrayMove(newItems[overContainer], activeIndex, overIndex);
        return newItems;
      });
    }

    setActiveId(null);
  }
}

export default KanbanBoard;