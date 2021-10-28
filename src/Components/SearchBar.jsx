import { useRef } from 'react';
import { Input } from '@chakra-ui/react';
import { connect } from 'react-redux';

const SearchBar = ({ setUserSerachValue }) => {
	const userSearchRef = useRef();

	function handleChangeInput() {
		const userInput = userSearchRef.current.value.toUpperCase();
		setUserSerachValue(userInput);
	}

	return <Input ref={userSearchRef} onChange={handleChangeInput} variant="filled" placeholder="Search for vehicles" />;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = ({ vehicles: { setUserSerachValueAction } }) => ({
	setUserSerachValue: setUserSerachValueAction
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
