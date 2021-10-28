import axios from 'axios';

const BASE_URL = 'https://vpic.nhtsa.dot.gov/api';

const vehicles = {
	state: {
		vehiclesList: [],
		error: '',
		isVehiclesLoading: false
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
		}
	},
	effects: (dispatch) => ({
		async getAllVehiclesAction(payload, rootState) {
			try {
				function getRandomNumber(min, max) {
					return Math.floor(Math.random() * (max - min + 1) + min);
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
						if (!vehicle.Model_Name) vehicle.Model_Name = '';
						if (!vehicle.VehicleTypeName) vehicle.VehicleTypeName = i % 2 === 0 ? 'Truck' : 'Passenger Car';
					});

					return dispatch.vehicles.vehiclesList(vehiclesListCopy);
				}
				return dispatch.vehicles.error("Coudn't fetch vehicles list");
			} catch (error) {
				console.log(error);
				return dispatch.vehicles.error("Coudn't fetch vehicles list");
			}
		}
	})
};

export default vehicles;
