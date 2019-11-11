import React from 'react';

export const PostButton = (props) => {
    return (
        <div
            style={{
                backgroundColor: 'lightgreen',
                position: 'absolute',
                right: '5%',
                bottom: '5%',
                width: '96px',
                height: '96px',
                borderRadius: '50%',
            }}
            onClick={props.onAddSeries}
        />
    );
};