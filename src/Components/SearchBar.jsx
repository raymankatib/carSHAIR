import { useRef } from 'react';
import { Input } from '@chakra-ui/react';
import { connect } from 'react-redux';

const SearchBar = ({ setUserSerachValue, filterdDataResponse }) => {
	const userSearchRef = useRef();

	function handleChangeInput() {
		const userInput = userSearchRef.current.value.toUpperCase();
		setUserSerachValue(userInput);
	}

	return (
		<Input
			isDisabled={filterdDataResponse && filterdDataResponse.length > 0}
			ref={userSearchRef}
			onChange={handleChangeInput}
			variant="filled"
			placeholder="Search for vehicles"
		/>
	);
};

const mapStateToProps = ({ vehicles: { filterdDataResponse } }) => ({ filterdDataResponse: filterdDataResponse });

const mapDispatchToProps = ({ vehicles: { setUserSerachValueAction } }) => ({
	setUserSerachValue: setUserSerachValueAction
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
