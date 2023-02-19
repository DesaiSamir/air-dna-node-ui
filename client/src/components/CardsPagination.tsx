import * as React from 'react';
import { Box, Sheet } from '@mui/joy';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface CardsPaginationProps {
	totalPages: number;
	onPageChange: (pageNumber: number) => void;
}

export default function CardsPagination({ totalPages, onPageChange }: CardsPaginationProps) {
	const [currentPage, setCurrentPage] = React.useState(1);
	
	React.useEffect(() => {
		setCurrentPage(1);
	}, [totalPages]);

	return (
		
		<Sheet
			variant="outlined"
			sx={{
				borderRadius: 'sm',
				'& > *': {
					p: 2,
					'&:nth-of-type(n):not(:nth-of-type(-n+4))': {
						borderBottom: '1px solid',
						borderColor: 'divider',
					},
				},
			}}
		>
			
			<Box sx={{ display: 'flex', justifyContent: 'center', }}>
				<Stack spacing={2}>
					<Pagination 
						count={totalPages}
						page={currentPage}
						onChange={(event: React.ChangeEvent<unknown>, page: number) => {
							setCurrentPage(page);
							onPageChange(page);
						}}
					/>
				</Stack>
			</Box>
		</Sheet>
	);
}