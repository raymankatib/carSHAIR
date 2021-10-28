import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { SimpleGrid } from '@chakra-ui/react';
import { css } from '@emotion/react';
import MoonLoader from 'react-spinners/MoonLoader';

import VehicleCard from './VehicleCard';
import { colors } from '../Config/variables';
const override = css`
	display: block;
	margin: 20% auto;
	border-color: ${colors.mainGreen};
`;

const VehiclesGrid = ({ getAllVehicles, vehiclesList, isVehiclesLoading }) => {
	useEffect(() => {
		getAllVehicles();
	}, []);

	return !isVehiclesLoading ? (
		<SimpleGrid columns={[1, 2, 3, 4]} spacing="40px">
			{vehiclesList.map((vehicle, i) => (
				<VehicleCard key={i} vehicle={vehicle} />
			))}
		</SimpleGrid>
	) : (
		<MoonLoader color={colors.mainGreen} loading={isVehiclesLoading} css={override} size={100} />
	);
};

const mapStateToProps = ({ vehicles: { vehiclesList, isVehiclesLoading } }) => ({
	vehiclesList: vehiclesList,
	isVehiclesLoading: isVehiclesLoading
});

const mapDispatchToProps = ({ vehicles: { getAllVehiclesAction } }) => ({
	getAllVehicles: getAllVehiclesAction
});

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesGrid);
