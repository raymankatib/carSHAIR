import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { SimpleGrid } from '@chakra-ui/react';
import { css } from '@emotion/react';
import MoonLoader from 'react-spinners/MoonLoader';

import VehicleCard from './VehicleCard';
import { colors } from '../Config/variables';
import PaginationComponent from './PaginationComponent';

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
	priceRangeValues,
	filterdCleared
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
	}, [JSON.stringify(filterdDataResponse), filterdDataResponse]);

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

	useEffect(() => {
		setRenderedList(vehiclesList);
	}, [filterdCleared]);

	return !isVehiclesLoading ? (
		<PaginationComponent renderedList={renderedList} message={message} />
	) : (
		<MoonLoader color={colors.mainGreen} loading={isVehiclesLoading} css={override} size={100} />
	);
};

const mapStateToProps = ({
	vehicles: {
		vehiclesList,
		isVehiclesLoading,
		userSearchValue,
		filterdDataResponse,
		message,
		priceRangeValues,
		filterdCleared
	}
}) => ({
	vehiclesList: vehiclesList,
	isVehiclesLoading: isVehiclesLoading,
	userSearchValue: userSearchValue,
	filterdDataResponse: filterdDataResponse,
	message: message,
	priceRangeValues: priceRangeValues,
	filterdCleared: filterdCleared
});

const mapDispatchToProps = ({ vehicles: { getAllVehiclesAction } }) => ({
	getAllVehicles: getAllVehiclesAction
});

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesGrid);
