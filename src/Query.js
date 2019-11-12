import React from 'react';
import {field, tagField} from './App';

export const Query = (props) => {
    const style = {
        display: 'flex',
    };
    return (
        <div style={style}>
            <SearchBar
                searchWords={props.searchWords}
                onChangeSearchWords={props.onChangeSearchWords}
            />
            <TagBar
                searchTags={props.searchTags}
                onChangeSearchTags={props.onChangeSearchTags}
            />
        </div>
    );
};
const SearchBar = (props) => {
    const style = {
        flex: '1 1 50%',
    };
    return (
        <div style={style}>
            <input
                style={field}
                type='text'
                value={props.searchWords}
                onChange={props.onChangeSearchWords}
            />
        </div>
    );
};
const TagBar = (props) => {
    const style = {
        flex: '1 1 50%',
        paddingLeft: '1rem',
    };
    return (
        <div style={style}>
            <input
                style={tagField}
                type='text'
                value={props.searchTags}
                onChange={props.onChangeSearchTags}
            />
        </div>
    );
};