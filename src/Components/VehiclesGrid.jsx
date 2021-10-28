import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { SimpleGrid } from '@chakra-ui/react';

import VehicleCard from './VehicleCard';

const VehiclesGrid = ({ getAllVehicles, vehiclesList }) => {
	useEffect(() => {
		getAllVehicles();
	}, []);

	return (
		<SimpleGrid columns={[2, 3, 4]} spacing="40px">
			{vehiclesList.map((vehicle) => (
				<VehicleCard vehicle={vehicle} />
			))}
		</SimpleGrid>
	);
};

const mapStateToProps = ({ vehicles: { vehiclesList } }) => ({
	vehiclesList: vehiclesList
});

const mapDispatchToProps = ({ vehicles: { getAllVehiclesAction } }) => ({
	getAllVehicles: getAllVehiclesAction
});

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesGrid);
