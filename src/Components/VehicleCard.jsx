import React from 'react';
import { Box, Badge, Image } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const VehicleCard = ({ vehicle }) => {
	if (vehicle && vehicle.inPriceRange === false) return '';
	return (
		<Box
			_hover={{
				boxShadow: '0 5px 10px 0 #dfe6e9'
			}}
			maxW="sm"
			borderWidth="1px"
			borderRadius="lg"
			overflow="hidden"
			cursor="pointer"
		>
			<Image src={vehicle.image} alt={'property.imageAlt'} />
			<Box p="6">
				<Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
					{vehicle.Make_Name}
				</Box>
				<Box d="flex">
					{vehicle.Model_Name && (
						<Box
							mr="5px"
							color="gray.500"
							fontWeight="semibold"
							letterSpacing="wide"
							fontSize="xs"
							textTransform="uppercase"
						>
							{vehicle.Model_Name}
						</Box>
					)}

					{vehicle.VehicleTypeName && (
						<Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase">
							Type: {vehicle.VehicleTypeName}
						</Box>
					)}
				</Box>
				<Box d="flex">
					<Box mr="5px">
						{vehicle.madeYear}
						<Box as="span" color="gray.600" fontSize="sm">
							/ Year
						</Box>
					</Box>
					<Box mr="5px">
						{vehicle.milage}
						<Box as="span" color="gray.600" fontSize="sm">
							/ km
						</Box>
					</Box>
					<Box mr="5px">
						{vehicle.price}$
						<Box as="span" color="gray.600" fontSize="sm">
							/ day
						</Box>
					</Box>
				</Box>

				<Box display="flex" mt="2" alignItems="center">
					{Array(5)
						.fill('')
						.map((_, i) => (
							<StarIcon key={i} color={i < vehicle.rate ? 'teal.500' : 'gray.300'} />
						))}
					<Box as="span" ml="2" color="gray.600" fontSize="sm">
						reviews
					</Box>
					<Badge cursor="pointer" ml="auto" borderRadius="full" px="15px" colorScheme="teal">
						Book
					</Badge>
				</Box>
			</Box>
		</Box>
	);
};

export default VehicleCard;
