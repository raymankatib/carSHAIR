import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@chakra-ui/react';

const ClearFilter = ({ clearFilter, filterdDataResponse, message }) => {
	const handleClearFilter = () => {
		clearFilter();
	};

	return (
		<>
			<Button
				onClick={handleClearFilter}
				isDisabled={!filterdDataResponse || (filterdDataResponse && filterdDataResponse.length === 0 && !message)}
				background="#ff7675"
				color="white"
				ml="5px"
				title="clear"
			>
				Clear filter
			</Button>
		</>
	);
};

const mapStateToProps = ({ vehicles: { filterdDataResponse, message } }) => ({
	filterdDataResponse: filterdDataResponse,
	message: message
});

const mapDispatchToProps = ({ vehicles: { clearFilterAction } }) => ({
	clearFilter: clearFilterAction
});

export default connect(mapStateToProps, mapDispatchToProps)(ClearFilter);
