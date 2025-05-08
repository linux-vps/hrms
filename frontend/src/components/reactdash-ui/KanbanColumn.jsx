import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const KanbanColumn = (props) => {
  const { id, items, title } = props;

  const { setNodeRef } = useDroppable({
    id
  });

  return (
    <SortableContext
      id={id}
      items={items.map((item) => item.unique)}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef} className="flex flex-col gap-6 flex-shrink-0 w-72 py-6 px-4 bg-gray-100 dark:bg-gray-900 rounded">
        {/* heading */}
        <div className="flex flex-row justify-between py-3 px-4 rounded-lg text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
          <h3 className="text-title-md">{title}</h3>
          <span className="compact-hide w-5 h-5 flex items-center justify-center rounded-full text-[11px] leading-none tracking-[.045em] font-medium bg-gray-200 dark:bg-gray-700 ml-auto">
            {items.length}
          </span>
        </div>

        {items.map((item) => (
          <SortableItem key={item.unique} id={item.unique} item={item} />
        ))}
      </div>
    </SortableContext>
  );
}
export default KanbanColumn;

// Sorter Kanban Item
export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-50"
        {...attributes}
        {...listeners}
      >
        <Item id={props.id} item={props.item} />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Item id={props.id} item={props.item} />
    </div>
  );
}
// Kanban Item
export function Item(props) {
  const { item } = props;
  // Label urgency color
  let urgencyClass = '';
  switch (item.urgency) {
    case 'Urgent':
      urgencyClass = 'text-pink-700 dark:text-pink-200 bg-pink-100 dark:bg-pink-800';
      break;
    case 'Medium':
      urgencyClass = 'text-yellow-700 dark:text-yellow-200 bg-yellow-100 dark:bg-yellow-800';
      break;
    case 'Low':
      urgencyClass = 'text-green-700 dark:text-green-200 bg-green-100 dark:bg-green-800';
      break;
    default:
      // Default CSS
      urgencyClass = 'text-green-700 dark:text-green-200 bg-green-100 dark:bg-yellow-800';
      break;
  }
  // Assigments
  const maxAssignmentsToShow = 3;
  // Show Assigments
  const assignmentsToShow = item.assignments && item.assignments.slice(0, maxAssignmentsToShow);
  // More Assigments
  const remainingAssignments = item.assignments && Math.max(0, item.assignments.length - maxAssignmentsToShow);

  return (
    <>
      <div className={`drop-item cursor-grab relative flex flex-col items-start p-4 rounded-lg ${urgencyClass}`} draggable="true">
        <span className="flex items-center h-6 px-3 text-xs font-semibold text-pink-400 bg-white dark:bg-black rounded-full">{item.category}</span>
        <h4 className="mt-3 text-sm font-medium">{item.content}</h4>
        <div className="flex justify-between items-center w-full mt-3 text-xs font-medium">
          <span className="px-2 py-1 flex items-center font-semibold text-xs rounded text-pink-400 border border-pink-400 bg-white dark:bg-black">Due: {item.date}</span>
          <div className="relative flex items-center ">
            {assignmentsToShow && assignmentsToShow.map((assignment, index) => (
              <div key={index} aria-label={assignment.name} data-microtip-position="top" role="tooltip" className="inline-block  max-w-full -ms-3 transform hover:-translate-y-1">
                <img
                  className="rounded-full w-8 h-8 max-w-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-700"
                  src={assignment.avatar}
                  alt={assignment.name}
                />
              </div>
            ))}
            {remainingAssignments > 0 && (
              <div aria-label={remainingAssignments > 1 ? `${remainingAssignments}+` : "1+"} data-microtip-position="top" role="tooltip" className="inline-block  max-w-full -ms-3 transform hover:-translate-y-1">
                <div className="rounded-full flex justify-center items-center w-8 h-8 max-w-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-700">{remainingAssignments > 1 ? `${remainingAssignments}+` : "1+"}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
