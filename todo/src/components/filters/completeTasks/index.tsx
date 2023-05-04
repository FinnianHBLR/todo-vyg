import { Filters } from "../../../types/types";

export const CompleteTasksCheckBox = ({
  toggleCompeltedTasks,
  filtersState,
}: {
  toggleCompeltedTasks: () => void;
  filtersState: Filters;
}) => {
  return (
      <input
        onChange={toggleCompeltedTasks}
        checked={filtersState.complete}
        type="checkbox"
      ></input>
  );
};
