import React, { useState, useEffect, useMemo } from "react";
import { Box, Grid, CircularProgress, ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import Sidebar from "../components/Sidebar";
import Pagination from "../components/Pagination";
import { fetchProducts, fetchProductCategories } from './../utils/api'; // Import API functions

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await fetchProducts();  
      setProducts(productsData);
      setLoading(false);

      const categoriesData = await fetchProductCategories(); 
      setCategories(categoriesData);
    };

    fetchData();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((item) => item !== category)
        : [...prevSelected, category]
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length
      ? selectedCategories.includes(product.category)
      : true;
    return matchesSearch && matchesCategory;
  });

  const productsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          ...(darkMode
            ? {
                background: { default: "#121212", paper: "#1E1E1E" },
                text: { primary: "#fff", secondary: "#bbb" },
              }
            : {
                background: { default: "#f9f9f9", paper: "#fff" },
                text: { primary: "#000", secondary: "#333" },
              }),
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: "background.default", minHeight: "100vh", color: "text.primary" }}>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} darkMode={darkMode} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Sidebar
            categories={categories}
            selectedCategories={selectedCategories}
            handleCategoryChange={handleCategoryChange}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          <Box sx={{ flexGrow: 1, padding: "20px" }}>
            {loading ? (
              <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
            ) : (
              <>
                <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", gap: "10px" }}>
                  {paginatedProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                      <ProductCard product={product} onClick={setSelectedProduct} darkMode={darkMode} />
                    </Grid>
                  ))}
                </Box>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </>
            )}
          </Box>
        </Box>

        <ProductModal product={selectedProduct} open={Boolean(selectedProduct)} onClose={() => setSelectedProduct(null)} />
      </Box>
    </ThemeProvider>
  );
};

export default Home;
