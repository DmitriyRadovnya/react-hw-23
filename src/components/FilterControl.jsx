import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { filterTasks } from "../redux/actions/actions";

export const FilterControl = () => {
  const { filterMode } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <FormControl>
      <FormLabel>Показать:</FormLabel>
      <RadioGroup
        row
        defaultValue="FILTER_ALL"
        value={filterMode}
        onChange={(e) => dispatch(filterTasks(e.target.value))}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <FormControlLabel value="FILTER_ALL" label="Все" control={<Radio />} />
        <FormControlLabel
          value="FILTER_ACTIVE"
          label="Активные"
          control={<Radio />}
        />
        <FormControlLabel
          value="FILTER_COMPLETED"
          label="Завершенные"
          control={<Radio />}
        />
      </RadioGroup>
    </FormControl>
  );
};
