import React, { useCallback } from 'react';
import { Box, TextField, MenuItem, Button } from '@mui/material';

const SearchBar = ({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    categories,
    onSearch,
}) => {
    // Use a debounced input handler to optimize updates
    const handleInputChange = useCallback((e) => {
        setSearchTerm(e.target.value);
    }, [setSearchTerm]);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                padding: 1,
                backgroundColor: '#f5f5f5',
                borderRadius: 2,
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
        >
            <TextField
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Buscar productos..."
                variant="outlined"
                size="small"
                sx={{ flex: 1 }}
            />
            <TextField
                select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                placeholder="Categoría"
                variant="outlined"
                size="small"
                sx={{ minWidth: 150 }}
            >
                <MenuItem value="">Todas las categorías</MenuItem>
                {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                        {category}
                    </MenuItem>
                ))}
            </TextField>
            <Button
                variant="contained"
                onClick={onSearch}
                sx={{
                    backgroundColor: '#388E3C',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#2E7D32' },
                }}
            >
                Buscar
            </Button>
        </Box>
    );
};

export default SearchBar;
