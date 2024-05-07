import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Stack from '@mui/material/Stack';

const theme = createTheme({
    palette: {
        primary: {
            main: '#B2F2FF',

            dark: '#32DBFC',
            contrastText: '#47008F',
        }
    }
})


export default function PaginationButtons({ onPageChange, totalPages, currentPage }) {



    return (
        <ThemeProvider theme={theme}>
            <Stack spacing={4}>
                <Pagination count={totalPages} page={currentPage} shape="rounded" size='large' onChange={onPageChange} color="primary" />
            </Stack>
        </ThemeProvider>
    );
}