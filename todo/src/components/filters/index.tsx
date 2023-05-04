import { useState } from "react";
import { ActiveTaskCheckBox } from "./activeTasks";
import { CompleteTasksCheckBox } from "./completeTasks";

// Import types from global types folder.
import { Filters } from "../../types/types";

// Action props need custom types.
interface Props {
    filtersState: Filters,
    setFilter: React.Dispatch<React.SetStateAction<Filters>>
}

export const CheckBoxFilters = ({filtersState, setFilter}: Props) => {


  const toggleActiveTasks = () => {
    // Update state with old state + fippped actitve task state
    setFilter((currentFilter) => ({
      ...currentFilter,
      active: !currentFilter.active,
    }));
  };

  const toggleCompeltedTasks = () => {
    // Update complete state with old state + fipllied complete state
    setFilter((currentFilter) => ({
      ...currentFilter,
      complete: !currentFilter.complete,
    }));
  };

  return (
    <form className="grid gap-6 mb-6 md:grid-cols-2 pt-7 px-8 border py-2 border-gray-300">
      <ActiveTaskCheckBox toggleActiveTasks={toggleActiveTasks} filtersState={filtersState}></ActiveTaskCheckBox>
      <CompleteTasksCheckBox toggleCompeltedTasks={toggleCompeltedTasks} filtersState={filtersState}></CompleteTasksCheckBox>
    </form>
  );
};