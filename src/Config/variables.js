import _ from 'lodash';
export const imagesList = [
	'https://cdn.luxe.digital/media/2020/12/16175821/most-expensive-cars-2021-Maserati-MC20-luxe-digital%402x.jpg',
	'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2022-chevrolet-corvette-z06-1607016574.jpg?crop=0.737xw:0.738xh;0.181xw,0.218xh&resize=640:*',
	'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/carbon-fiber-shelby-mustang-1600685276.jpg?crop=0.9988636363636364xw:1xh;center,top&resize=480:*',
	'https://images.hgmsites.net/hug/2015-mercedes-benz-c-class_100474442_h.jpg',
	'https://media.autoexpress.co.uk/image/private/s--_tzUzh7f--/v1576263406/autoexpress/2019/12/01_5.jpg'
];

export const colors = {
	mainGreen: '#319795'
};

export const carMakeList = ['TESLA', 'MAZDA', 'JAGUAR', 'MASERATI', 'TOYOTA', 'BMW'];

export const carTypeList = ['CAR', 'TRUCK'];

const max = new Date().getUTCFullYear() + 1; // added +1 to get 2022 cars
const min = max - 23;
export const yearRange = _.range(min, max + 1);
