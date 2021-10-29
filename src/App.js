import { Box } from '@chakra-ui/react';

import './App.css';
import SearchBar from './Components/SearchBar';
import VehiclesGrid from './Components/VehiclesGrid';
import FilterMenu from './Components/FilterMenu';
import ClearFilter from './Components/ClearFilter';

function App() {
	return (
		<Box p="5px" pt="1px" w="100%" d="flex" flexDir="column" justifyContent="center" alignItems="center">
			<Box position="fixed" w="100%" top="0px" d="flex" justifyContent="center" alignItems="center">
				<SearchBar />
				<FilterMenu />
				<ClearFilter />
			</Box>
			<VehiclesGrid />
		</Box>
	);
}

export default App;
