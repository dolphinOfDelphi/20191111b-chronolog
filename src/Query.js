import React from 'react';
import {field, tagField} from './App';

export const Query = (props) => {
    const queryStyle = {
        display: 'flex',
    };
    return (
        <div style={queryStyle}>
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
    const searchBarStyle = {
        flex: '1 1 50%',
    };
    return (
        <div style={searchBarStyle}>
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
    const tagBarStyle = {
        flex: '1 1 50%',
        paddingLeft: '1rem',
    };
    return (
        <div style={
            tagBarStyle}>
            <input
                style={tagField}
                type='text'
                value={props.searchTags}
                onChange={props.onChangeSearchTags}
            />
        </div>
    );
};