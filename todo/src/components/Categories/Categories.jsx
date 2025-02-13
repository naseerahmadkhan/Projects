import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getAllDataFromField } from "../../firebase/fieldOperations/fieldOperations";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("notSeleted");  
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const fetchedCategoriesList = await getAllDataFromField("categories");
      setCategories(fetchedCategoriesList);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
   

    fetchData();
  }, []);

  // Handle category selection
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="categories-label">Categories</InputLabel>
      <Select
        labelId="categories-label"
        id="categories-select"
        value={selectedCategory}
        onChange={handleChange}
      >
       {/* Default "Please Choose" option */}
       <MenuItem value="notSeleted" disabled>
          Please Choose
        </MenuItem>

        {/* Show "No Data" if categories are empty */}
        {categories.length === 0 ? (
          <MenuItem disabled>No Data</MenuItem>
        ) : (
          categories.map((item) => (
            <MenuItem key={item.id || item.cname} value={item.cname}>
              {item.cname}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
};

export default Categories;
