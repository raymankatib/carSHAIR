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

const VehiclesGrid = ({
	getAllVehicles,
	vehiclesList,
	isVehiclesLoading,
	userSearchValue,
	filterdDataResponse,
	message,
	priceRangeValues
}) => {
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

	useEffect(() => {
		if (filterdDataResponse && filterdDataResponse.length > 0) {
			setRenderedList(filterdDataResponse);
		} else {
			setRenderedList(vehiclesList);
		}
	}, [JSON.stringify(filterdDataResponse)]);

	useEffect(() => {
		if (priceRangeValues && priceRangeValues.length > 0) {
			const vehiclesInPriceRange = renderedList.map((item) => {
				if (item.price > priceRangeValues[0] && item.price < priceRangeValues[1]) {
					item.inPriceRange = true;
				} else {
					item.inPriceRange = false;
				}
				return item;
			});
			setRenderedList(vehiclesInPriceRange);
		} else {
			setRenderedList(vehiclesList);
		}
	}, [JSON.stringify(priceRangeValues), priceRangeValues]);

	return !isVehiclesLoading ? (
		<SimpleGrid mt="50px" columns={[1, 2, 3, 4]} spacing="40px">
			{!message ? renderedList.map((vehicle, i) => <VehicleCard key={i} vehicle={vehicle} />) : message}
		</SimpleGrid>
	) : (
		<MoonLoader color={colors.mainGreen} loading={isVehiclesLoading} css={override} size={100} />
	);
};

const mapStateToProps = ({
	vehicles: { vehiclesList, isVehiclesLoading, userSearchValue, filterdDataResponse, message, priceRangeValues }
}) => ({
	vehiclesList: vehiclesList,
	isVehiclesLoading: isVehiclesLoading,
	userSearchValue: userSearchValue,
	filterdDataResponse: filterdDataResponse,
	message: message,
	priceRangeValues: priceRangeValues
});

const mapDispatchToProps = ({ vehicles: { getAllVehiclesAction } }) => ({
	getAllVehicles: getAllVehiclesAction
});

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesGrid);
