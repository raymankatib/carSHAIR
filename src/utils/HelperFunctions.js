import { imagesList } from '../Config/variables';

export function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomCarImage() {
	const randomNum = Math.floor(Math.random() * imagesList.length);
	return imagesList[randomNum];
}

export function addDummyData(array, year, type) {
	const data = array.map((item, i) => {
		item.price = getRandomNumber(120, 800);
		item.rate = getRandomNumber(1, 5);
		item.milage = getRandomNumber(200, 50000);
		item.madeYear = year ? year : getRandomNumber(1999, 2022);
		item.image = randomCarImage();
		if (!item.Model_Name) item.Model_Name = '';
		if (!item.VehicleTypeName) item.VehicleTypeName = type ? type : 'Car or Truck';
		return item;
	});
	return data;
}
