import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getAllDataFromField } from "../../firebase/fieldOperations/fieldOperations";
import { useSelector, useDispatch } from "react-redux";
import { addCategory } from "../../features/todos/categorySlice";

const Categories = ({categorySelected}) => {
  const [selected, setSelected] = useState("notSelected");
  const categories = useSelector((state) => state.categories.categories) || []; 



  const handleChange = (event) => {
    setSelected(event.target.value);
    categorySelected(event.target.value)
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="categories-label">Categories</InputLabel>
      <Select labelId="categories-label" id="categories-select" value={selected} onChange={handleChange}>
        <MenuItem value="notSelected" disabled>
          Please Choose
        </MenuItem>
        {
          categories.map((item, index) => (
            <MenuItem key={index} value={item.cid}>
              {item.cname}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
};

export default Categories;
