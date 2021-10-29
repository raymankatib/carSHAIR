import axios from 'axios';

import { addDummyData } from '../utils/HelperFunctions';

const BASE_URL = 'https://vpic.nhtsa.dot.gov/api';

const vehicles = {
	state: {
		vehiclesList: [],
		error: '',
		isVehiclesLoading: false,
		userSearchValue: '',
		message: ''
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
		},
		filterdDataResponse(state, payload) {
			return {
				...state,
				filterdDataResponse: payload
			};
		},
		message(state, payload) {
			return {
				...state,
				message: payload
			};
		}
	},
	effects: (dispatch) => ({
		async getAllVehiclesAction(payload, rootState) {
			try {
				dispatch.vehicles.isVehiclesLoading(true);
				const {
					data: { Results: vehiclesList }
				} = await axios.get(`${BASE_URL}/vehicles/getallmakes?format=json`);
				dispatch.vehicles.isVehiclesLoading(false);
				// add some dummy data
				if (vehiclesList) {
					let vehiclesListCopy = [...vehiclesList].slice(0, 100);
					const vehiclesWithDummyData = addDummyData(vehiclesListCopy);

					dispatch.vehicles.vehiclesList(vehiclesWithDummyData);

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
			try {
				const { vehicleMake, vehicleType, yearValue } = rootState.vehicles;
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
				dispatch.vehicles.message('');
				const {
					data: { Results: filterdDataResponse, Count }
				} = await axios.get(`${BASE_URL}${url}`);
				dispatch.vehicles.isVehiclesLoading(false);
				if (Count === 0) dispatch.vehicles.message('No vehicles match your filter!');
				if (filterdDataResponse) {
					let filterdDataResponseCopy = [...filterdDataResponse];
					let filterdDataCopyWithDummyData;
					// remove year dommy data if year or type selected by user
					if (yearValue || vehicleType) {
						filterdDataCopyWithDummyData = addDummyData(filterdDataResponseCopy, yearValue, vehicleType);
					} else {
						filterdDataCopyWithDummyData = addDummyData(filterdDataResponseCopy);
					}

					dispatch.vehicles.filterdDataResponse(filterdDataCopyWithDummyData);

					return filterdDataCopyWithDummyData;
				}
			} catch (error) {
				console.log(error);
				return dispatch.vehicles.error("Coudn't fetch filtered data");
			}
		},
		clearFilterAction(payload, rootState) {
			dispatch.vehicles.vehicleMake('');
			dispatch.vehicles.vehicleMake('');
			dispatch.vehicles.yearValue('');
			dispatch.vehicles.message('');
			dispatch.vehicles.vehicleType('');
			dispatch.vehicles.priceRangeValues(null);
			dispatch.vehicles.filterdDataResponse(null);
		}
	})
};

export default vehicles;
