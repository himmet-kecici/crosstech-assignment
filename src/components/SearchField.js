import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const SearchField = ({ value, onChange, disabled, ...props }) => (
  <TextField
    size="small"
    placeholder="Search"
    sx={{ minWidth: "30%", width: { xs: "100%", sm: "auto" } }}
    InputProps={{
      sx: { borderRadius: 10, borderColor: "none" },
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
    value={value}
    onChange={onChange}
    disabled={disabled}
    {...props}
  />
);

export default SearchField;
