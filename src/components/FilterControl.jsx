import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export const FilterControl = ({ filterMode, setFilterMode }) => {
  return (
    <FormControl>
      <FormLabel>Показать:</FormLabel>
      <RadioGroup
        row
        defaultValue="all"
        value={filterMode}
        onChange={(e) => setFilterMode(e.target.value)}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <FormControlLabel value="all" label="Все" control={<Radio />} />
        <FormControlLabel value="active" label="Активные" control={<Radio />} />
        <FormControlLabel
          value="complete"
          label="Завершенные"
          control={<Radio />}
        />
      </RadioGroup>
    </FormControl>
  );
};
