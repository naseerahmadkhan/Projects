import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import { getAllDataFromField } from "../../firebase/fieldOperations/fieldOperations";
import { addCategory } from "../../features/todos/categorySlice";

const Categories = () => {
  const [age, setAge] = useState("");  // Local state to track selected category
  const [categories,setCategories] = useState([])

  const getData = async () => {
    const fetchedCategoriesList = await getAllDataFromField("categories");
    setCategories(fetchedCategoriesList)
    
    
  };
  useEffect(() => {
    

    getData();
  }, []);  // Only run this effect once when component mounts

 

  // Map categories to MenuItems for rendering
  const categoriesList = categories.map((item, index) => (
    <MenuItem key={index} value={item.cname}>
      {item.cname}
    </MenuItem>
  ));

  // Handle category selection change
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Categories</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Categories"
        onChange={handleChange}
      >
        {categories.length === 0 && <MenuItem value={0}>No Data</MenuItem>}
        {categories.length > 0 && categoriesList}
      </Select>
    </FormControl>
  );
};

export default Categories;
