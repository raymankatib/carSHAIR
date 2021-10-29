import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import { SimpleGrid } from '@chakra-ui/react';
import { connect } from 'react-redux';

import VehicleCard from './VehicleCard';

// Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function PaginationComponent({ itemsPerPage, renderedList, message, filterdDataResponse, vehiclesList }) {
	itemsPerPage = 12;
	// We start with an empty list of items.
	const [currentItems, setCurrentItems] = useState(null);
	const [pageCount, setPageCount] = useState(0);

	const [itemOffset, setItemOffset] = useState(0);

	// const [displayedItems, setDisplayedItems] = useState(currentItems);

	// useEffect(() => {
	// 	if (filterdDataResponse && filterdDataResponse.length === 0) {
	// 		setDisplayedItems(vehiclesList);
	// 	}
	// }, []);

	useEffect(() => {
		// Fetch items from another resources.
		console.log(renderedList && renderedList);
		if (renderedList) {
			const endOffset = itemOffset + itemsPerPage;
			console.log(`Loading items from ${itemOffset} to ${endOffset}`);
			setCurrentItems(renderedList.slice(itemOffset, endOffset));
			setPageCount(Math.ceil(renderedList.length / itemsPerPage));
		}
	}, [itemOffset, itemsPerPage, JSON.stringify(renderedList)]);

	// Invoke when user click to request another page.
	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % items.length;
		console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
		setItemOffset(newOffset);
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	};

	return (
		<>
			<SimpleGrid mt="50px" columns={[1, 2, 3, 4]} spacing="40px">
				{!message
					? currentItems && currentItems.map((vehicle, i) => <VehicleCard key={i} vehicle={vehicle} />)
					: message}
			</SimpleGrid>
			<ReactPaginate
				breakLabel="..."
				nextLabel="next"
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={pageCount}
				previousLabel="previous"
				renderOnZeroPageCount={null}
				itemsPerPage={4}
				containerClassName="pagination"
				activeClassName="active"
			/>
		</>
	);
}

const mapStateToProps = ({ vehicles: { filterdDataResponse, vehiclesList } }) => ({
	filterdDataResponse: filterdDataResponse,
	vehiclesList: vehiclesList
});

const mapDispatchToProps = ({ vehicles: { getAllVehiclesAction } }) => ({
	getAllVehicles: getAllVehiclesAction
});

export default connect(mapStateToProps, mapDispatchToProps)(PaginationComponent);
