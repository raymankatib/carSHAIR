import React from 'react';
import { connect } from 'react-redux';
import {
	Box,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	RadioGroup,
	Stack,
	Radio,
	SimpleGrid,
	Select
} from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';
import RangeSliderComponent from './RangeSliderComponent';

import { carMakeList, carTypeList, yearRange } from '../Config/variables';

const AccordionComponent = ({
	vehicleMake,
	vehicleType,
	setVehicleMake,
	setVehicleType,
	yearValue,
	setYearValue,
	priceRangeValues
}) => {
	function handleChangeVehicleMake(e) {
		const selectedValue = e.target.value;
		setVehicleMake(selectedValue);
	}
	function handleChangeVehicleType(value) {
		setVehicleType(value);
	}
	function handleChangeYear(e) {
		const selectedYear = Number(e.target.value);

		setYearValue(selectedYear);
	}

	return (
		<Accordion defaultIndex={[0]} allowMultiple>
			<Select defaultValue={vehicleMake} mb="5px" placeholder="Make" onChange={handleChangeVehicleMake}>
				{carMakeList.map((carMake, i) => (
					<option key={i} value={carMake}>
						{carMake}
					</option>
				))}
			</Select>

			<Select defaultValue={yearValue} mb="5px" placeholder="Year" onChange={handleChangeYear}>
				{yearRange.map((year, i) => (
					<option key={i} value={year}>
						{year}
					</option>
				))}
			</Select>

			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box flex="1" textAlign="left">
							Type
						</Box>
						<TriangleDownIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					<RadioGroup defaultValue={vehicleType} onChange={handleChangeVehicleType}>
						<Stack spacing={4} direction="row">
							<SimpleGrid columns={3} spacing="10px">
								{carTypeList.map((carType, i) => (
									<Radio key={i} value={carType} cursor="pointer">
										{carType}
									</Radio>
								))}
							</SimpleGrid>
						</Stack>
					</RadioGroup>
				</AccordionPanel>
			</AccordionItem>

			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box flex="1" textAlign="left">
							{priceRangeValues ? `Price ${priceRangeValues[0]}$ - ${priceRangeValues[1]}$` : 'Price'}
						</Box>
						<TriangleDownIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					<RangeSliderComponent />
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
};

const mapStateToProps = ({ vehicles: { vehicleMake, vehicleType, yearValue, priceRangeValues } }) => ({
	vehicleMake: vehicleMake,
	vehicleType: vehicleType,
	yearValue: yearValue,
	priceRangeValues: priceRangeValues
});

const mapDispatchToProps = ({ vehicles: { setVehicleMakeAction, setVehicleTypeAction, setYearValueAction } }) => ({
	setVehicleMake: setVehicleMakeAction,
	setVehicleType: setVehicleTypeAction,
	setYearValue: setYearValueAction
});

export default connect(mapStateToProps, mapDispatchToProps)(AccordionComponent);
