import React from 'react';

export const AddSeriesButton = (props) => {
    const style = {
        backgroundColor: 'lightgreen',
        position: 'fixed',
        right: '5%',
        bottom: '5%',
        width: '96px',
        height: '96px',
        border: '2px darkgreen solid',
        borderRadius: '50%',
    };
    return (
        <div
            style={style}
            onClick={props.onAddSeries}
        />
    );
};