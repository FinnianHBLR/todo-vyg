import { Filters } from "../../../types/types";

export const ActiveTaskCheckBox = ({toggleActiveTasks, filtersState}: { toggleActiveTasks: () => void; filtersState: Filters;}
) => {
  return (
    <div>
      <label>Active tasks</label>
      <input
        onChange={toggleActiveTasks}
        checked={filtersState.active}
        type="checkbox"
      ></input>
    </div>
  );
};
