import * as React from 'react';
import CssBaseline from '@mui/joy/CssBaseline';

// custom
import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import PropertyList from '../components/PropertyList';
import PropertyDetails from '../components/PropertyDetails';
import Header from '../components/Header';

export default function Home() {

	return (
		<div>
			<CssBaseline />
			<Layout.Root
				sx={{
					gridTemplateColumns: {
						xs: '1fr',
						sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
						md: 'minmax(160px, 300px) minmax(600px, 1fr) minmax(300px, 420px)',
					},
				}}
			>
				<Layout.Header>
					<Header />
				</Layout.Header>
				<Navigation />
				<Layout.Main>
					<PropertyList />
				</Layout.Main>
				<PropertyDetails />
			</Layout.Root>
		</div>
	);
}
