import { Box } from '@chakra-ui/react';
import './App.css';

import SearchBar from './Components/SearchBar';
import VehiclesGrid from './Components/VehiclesGrid';

function App() {
	return (
		<Box p="10px">
			<Box w="50%" d="flex" justifyContent="space-between">
				<SearchBar />
			</Box>
			<VehiclesGrid />
		</Box>
	);
}

export default App;
