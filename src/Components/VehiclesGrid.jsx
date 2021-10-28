import React, { useEffect, useState } from 'react';
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

const VehiclesGrid = ({ getAllVehicles, vehiclesList, isVehiclesLoading, userSearchValue }) => {
	const [renderedList, setRenderedList] = useState(vehiclesList);
	useEffect(() => {
		async function getData() {
			const data = await getAllVehicles();
			setRenderedList(data);
		}
		getData();
	}, []);

	useEffect(() => {
		if (userSearchValue.length > 0) {
			const vehiclesListClone = [...vehiclesList];
			const filteredSearchList = vehiclesListClone.filter((vehicle) =>
				vehicle.Make_Name.toUpperCase().match(new RegExp(userSearchValue, 'i'))
			);
			setRenderedList(filteredSearchList);
		} else {
			setRenderedList(vehiclesList);
		}
	}, [userSearchValue]);

	return !isVehiclesLoading ? (
		<SimpleGrid columns={[1, 2, 3, 4]} spacing="40px">
			{renderedList.map((vehicle, i) => (
				<VehicleCard key={i} vehicle={vehicle} />
			))}
		</SimpleGrid>
	) : (
		<MoonLoader color={colors.mainGreen} loading={isVehiclesLoading} css={override} size={100} />
	);
};

const mapStateToProps = ({ vehicles: { vehiclesList, isVehiclesLoading, userSearchValue } }) => ({
	vehiclesList: vehiclesList,
	isVehiclesLoading: isVehiclesLoading,
	userSearchValue: userSearchValue
});

const mapDispatchToProps = ({ vehicles: { getAllVehiclesAction } }) => ({
	getAllVehicles: getAllVehiclesAction
});

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesGrid);
