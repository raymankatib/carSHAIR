import { Box } from '@chakra-ui/react';

import './App.css';
import SearchBar from './Components/SearchBar';
import VehiclesGrid from './Components/VehiclesGrid';
import FilterMenu from './Components/FilterMenu';
import ClearFilter from './Components/ClearFilter';

function App() {
	return (
		<Box p="10px">
			<Box d="flex" justifyContent="center" alignItems="center">
				<SearchBar />
				<FilterMenu />
				<ClearFilter />
			</Box>
			<VehiclesGrid />
		</Box>
	);
}

export default App;
