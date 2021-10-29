import React from 'react';
import { connect } from 'react-redux';
import {
	Box,
	IconButton,
	Icon,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	useDisclosure,
	ModalFooter,
	Button
} from '@chakra-ui/react';
import { MdFilterList } from 'react-icons/md';
import AccordionComponent from './AccordionComponent';
import ClearFilter from './ClearFilter';

const FilterMenu = ({ submitFilterValues }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleApplyFilter = () => {
		submitFilterValues();
		onClose();
	};

	return (
		<>
			<Box onClick={onOpen}>
				<IconButton ml="5px" icon={<Icon as={MdFilterList} w={6} h={6} />} />
			</Box>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Advance filter</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<AccordionComponent />
					</ModalBody>

					<ModalFooter>
						<Button ml="10px" colorScheme="red" mr={3} onClick={onClose}>
							Close
						</Button>
						<Button onClick={handleApplyFilter} colorScheme="teal">
							Apply
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = ({ vehicles: { submitFilterValuesAction } }) => ({
	submitFilterValues: submitFilterValuesAction
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterMenu);
