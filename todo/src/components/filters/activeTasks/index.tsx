import { Filters } from "../../../types/types";

export const ActiveTaskCheckBox = ({toggleActiveTasks, filtersState}: { toggleActiveTasks: () => void; filtersState: Filters;}
) => {
  return (
      <input
        onChange={toggleActiveTasks}
        checked={filtersState.active}
        type="checkbox"
      ></input>
  );
};
