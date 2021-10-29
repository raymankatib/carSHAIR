import axios from 'axios';

import { imagesList } from '../Config/variables';

const BASE_URL = 'https://vpic.nhtsa.dot.gov/api';

const vehicles = {
	state: {
		vehiclesList: [],
		error: '',
		isVehiclesLoading: false,
		userSearchValue: ''
	},
	reducers: {
		vehiclesList(state, payload) {
			return {
				...state,
				vehiclesList: payload
			};
		},
		error(state, payload) {
			return {
				...state,
				error: payload
			};
		},
		isVehiclesLoading(state, payload) {
			return {
				...state,
				isVehiclesLoading: payload
			};
		},
		userSearchValue(state, payload) {
			return {
				...state,
				userSearchValue: payload
			};
		},
		vehicleMake(state, payload) {
			return {
				...state,
				vehicleMake: payload
			};
		},
		vehicleType(state, payload) {
			return {
				...state,
				vehicleType: payload
			};
		},
		yearValue(state, payload) {
			return {
				...state,
				yearValue: payload
			};
		},
		priceRangeValues(state, payload) {
			return {
				...state,
				priceRangeValues: payload
			};
		}
	},
	effects: (dispatch) => ({
		async getAllVehiclesAction(payload, rootState) {
			try {
				function getRandomNumber(min, max) {
					return Math.floor(Math.random() * (max - min + 1) + min);
				}
				function randomCarImage() {
					const randomNum = Math.floor(Math.random() * imagesList.length);
					return imagesList[randomNum];
				}
				dispatch.vehicles.isVehiclesLoading(true);
				const {
					data: { Results: vehiclesList }
				} = await axios.get(`${BASE_URL}/vehicles/getallmakes?format=json`);
				dispatch.vehicles.isVehiclesLoading(false);
				// add some dummy data
				if (vehiclesList) {
					let vehiclesListCopy = [...vehiclesList].slice(0, 100);

					vehiclesListCopy.forEach((vehicle, i) => {
						vehicle.price = getRandomNumber(120, 800);
						vehicle.rate = getRandomNumber(1, 5);
						vehicle.milage = getRandomNumber(200, 50000);
						vehicle.madeYear = getRandomNumber(1999, 2022);
						vehicle.image = randomCarImage();
						if (!vehicle.Model_Name) vehicle.Model_Name = '';
						if (!vehicle.VehicleTypeName) vehicle.VehicleTypeName = i % 2 === 0 ? 'Truck' : 'Passenger Car';
					});
					dispatch.vehicles.vehiclesList(vehiclesListCopy);

					return vehiclesListCopy;
				}
				return dispatch.vehicles.error("Coudn't fetch vehicles list");
			} catch (error) {
				console.log(error);
				return dispatch.vehicles.error("Coudn't fetch vehicles list");
			}
		},
		setUserSerachValueAction(payload, rootState) {
			return dispatch.vehicles.userSearchValue(payload);
		},
		setVehicleMakeAction(payload, rootState) {
			return dispatch.vehicles.vehicleMake(payload);
		},
		setVehicleTypeAction(payload, rootState) {
			return dispatch.vehicles.vehicleType(payload);
		},
		setYearValueAction(payload, rootState) {
			return dispatch.vehicles.yearValue(payload);
		},
		setPriceRangeValuesAction(payload, rootState) {
			return dispatch.vehicles.priceRangeValues(payload);
		},
		async submitFilterValuesAction(payload, rootState) {
			const { vehicleMake, vehicleType, yearValue, priceRangeValues } = rootState.vehicles;
			console.log(vehicleMake, vehicleType, yearValue, priceRangeValues);
			let url = '';
			if (vehicleMake && vehicleType && yearValue) {
				url = `/vehicles/GetModelsForMakeYear/make/${vehicleMake}/modelyear/${yearValue}/vehicletype/${vehicleType}?format=json`;
			} else if (vehicleMake && vehicleType) {
				url = `/vehicles/GetModelsForMakeYear/make/${vehicleMake}/vehicletype/${vehicleType}?format=json`;
			} else if (vehicleMake && yearValue) {
				url = `/vehicles/GetModelsForMakeYear/make/${vehicleMake}/modelyear/${yearValue}?format=json`;
			} else if (vehicleMake && !yearValue && !vehicleType) {
				url = `/vehicles/GetModelsForMake/${vehicleMake}?format=json`;
			}
			dispatch.vehicles.isVehiclesLoading(true);

			const {
				data: { Results: filterdDataResponse }
			} = await axios.get(`${BASE_URL}${url}`);
			dispatch.vehicles.isVehiclesLoading(false);

			console.log(filterdDataResponse);
		}
	})
};

export default vehicles;
