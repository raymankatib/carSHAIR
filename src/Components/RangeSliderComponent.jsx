import React from 'react';
import { connect } from 'react-redux';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export const RangeSliderComponent = ({ setPriceRangeValues, priceRangeValues }) => {
	function handleSliderChanges(values) {
		return setPriceRangeValues(values);
	}
	return (
		<>
			<Range
				min={120}
				max={800}
				step={1}
				defaultValue={priceRangeValues || [120, 800]}
				onChange={handleSliderChanges}
			/>
		</>
	);
};

const mapStateToProps = ({ vehicles: { priceRangeValues } }) => ({
	priceRangeValues: priceRangeValues
});

const mapDispatchToProps = ({ vehicles: { setPriceRangeValuesAction } }) => ({
	setPriceRangeValues: setPriceRangeValuesAction
});

export default connect(mapStateToProps, mapDispatchToProps)(RangeSliderComponent);
