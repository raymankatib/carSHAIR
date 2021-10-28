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
	SimpleGrid
} from '@chakra-ui/react';
import { TriangleDownIcon } from '@chakra-ui/icons';

import { carMakeList, carTypeList } from '../Config/variables';

const AccordionComponent = () => {
	function handleChangeVehicleMake(value) {
		console.log(value);
	}
	function handleChangeVehicleType(value) {
		console.log(value);
	}

	return (
		<Accordion defaultIndex={[0]} allowMultiple>
			<AccordionItem>
				<h2>
					<AccordionButton>
						<Box flex="1" textAlign="left">
							Make
						</Box>
						<TriangleDownIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					<RadioGroup defaultValue="1" onChange={handleChangeVehicleMake}>
						<Stack spacing={4} direction="row">
							<SimpleGrid columns={3} spacing="10px">
								{carMakeList.map((carMake) => (
									<Radio value={carMake} cursor="pointer">
										{carMake}
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
							Type
						</Box>
						<TriangleDownIcon />
					</AccordionButton>
				</h2>
				<AccordionPanel pb={4}>
					<RadioGroup defaultValue="1" onChange={handleChangeVehicleType}>
						<Stack spacing={4} direction="row">
							<SimpleGrid columns={3} spacing="10px">
								{carTypeList.map((carType) => (
									<Radio value={carType} cursor="pointer">
										{carType}
									</Radio>
								))}
							</SimpleGrid>
						</Stack>
					</RadioGroup>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AccordionComponent);
