import React from 'react';
import { RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb } from '@chakra-ui/react';
import { connect } from 'react-redux';

export const RangeSliderComponent = ({ setPriceRangeValues, priceRangeValues }) => {
	function handleSliderChanges(values) {
		return setPriceRangeValues(values);
	}
	return (
		<RangeSlider
			min={120}
			max={800}
			aria-label={''}
			defaultValue={priceRangeValues || [120, 800]}
			onChangeEnd={handleSliderChanges}
			colorScheme="teal"
		>
			<RangeSliderThumb index={0} />
			<RangeSliderThumb index={1} />
			<RangeSliderTrack>
				<RangeSliderFilledTrack />
			</RangeSliderTrack>
		</RangeSlider>
	);
};

const mapStateToProps = ({ vehicles: { priceRangeValues } }) => ({
	priceRangeValues: priceRangeValues
});

const mapDispatchToProps = ({ vehicles: { setPriceRangeValuesAction } }) => ({
	setPriceRangeValues: setPriceRangeValuesAction
});

export default connect(mapStateToProps, mapDispatchToProps)(RangeSliderComponent);
