import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../rtk/filterSlice";
import { selectFilter } from "../rtk/filterSelector";

export const FilterControl = () => {
  const filterValue = useSelector(selectFilter);
  const dispatch = useDispatch();

  return (
    <FormControl>
      <FormLabel>Показать:</FormLabel>
      <RadioGroup
        row
        value={filterValue}
        onChange={(e) => dispatch(setFilter(e.target.value))}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <FormControlLabel value="all" label="Все" control={<Radio />} />
        <FormControlLabel value="active" label="Активные" control={<Radio />} />
        <FormControlLabel
          value="completed"
          label="Завершенные"
          control={<Radio />}
        />
      </RadioGroup>
    </FormControl>
  );
};
