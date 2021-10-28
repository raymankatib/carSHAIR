import { Input } from '@chakra-ui/react';
import { connect } from 'react-redux';

const SearchBar = () => {
	return <Input variant="filled" placeholder="Search for vehicles" />;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
