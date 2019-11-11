import React from 'react';
import './App.css';
import {Query} from './Query';
import {PostButton} from './PostButton';

const createSeries = (entries = []) => ({entries});
const createEntry =
    (
        createdAt = new Date().toLocaleString('en-GB'),
        updatedAt = new Date().toLocaleString('en-GB'),
        gist = '',
        note = '',
        tags = '',
    ) => ({createdAt, updatedAt, gist, note, tags});
const updateEntry = (entry, gist, note, tags) => {
    const newEntry = {...entry};
    newEntry.updatedAt = new Date().toLocaleString('en-GB');
    newEntry.gist = gist;
    newEntry.note = note;
    newEntry.tags = tags;
    return newEntry;
};

const clickable = {
    minHeight: '48px',
};
export const field = {
    ...clickable,
    padding: '0 1rem',
    borderBottom: '2px rgba(0,0,0,0.1) solid',
};
export const tagField = {
    ...clickable,
    padding: '0 1rem',
    border: '2px rgba(0,0,0,0.1) solid',
    borderRadius: '10px',
};

const App = () => {
    const [searchWords, setSearchWords] = React.useState('');
    const [searchTags, setSearchTags] = React.useState('');

    const [seriesArray, setSeriesArray] = React.useState(JSON.parse(localStorage.getItem('seriesArray')) || []);

    const onChangeSearchWords = (e) => setSearchWords(e.target.value);
    const onChangeSearchTags = (e) => setSearchTags(e.target.value);
    const querySeriesArray = () => {
        let results = [...seriesArray];
        if (searchWords) {
            results = results.filter(series => series.entries.some(
                entry => entry.createdAt.includes(searchWords)
                    || entry.updatedAt.includes(searchWords)
                    || entry.gist.includes(searchWords)
                    || entry.note.includes(searchWords),
            ));
        }
        if (searchTags) {
            const tagsArray = searchTags.split(' ');
            results = results.filter(series => series.entries.some(
                entry => entry.tags.split(' ').some(tag => tagsArray.indexOf(tag) > -1),
            ));
        }

        return results;
    };

    const update = () => {
        localStorage.setItem('seriesArray', JSON.stringify(seriesArray));
        console.log(seriesArray);
    };

    const onAddSeries = () => {
        const newSeriesArray = [...seriesArray, createSeries()];
        setSeriesArray(newSeriesArray);
        update();
    };
    const onDeleteSeries = series => () => {
        const newSeriesArray = [...seriesArray];
        newSeriesArray.splice(newSeriesArray.indexOf(series), 1);
        setSeriesArray(newSeriesArray);
        update();
    };
    const onAddEntry = series => () => {
        const newSeriesArray = [...seriesArray];
        const newSeries = newSeriesArray[newSeriesArray.indexOf(series)];
        newSeries.entries = [...newSeries.entries, createEntry()];
        setSeriesArray(newSeriesArray);
        update();
    };

    const saveEntry = series => entry => (gist, note, tags) => {
        const newSeriesArray = [...seriesArray];
        const newSeries = newSeriesArray[newSeriesArray.indexOf(series)];
        newSeries.entries[newSeries.entries.indexOf(entry)] = updateEntry(entry, gist, note, tags);
        setSeriesArray(newSeriesArray);
        update();
    };
    const deleteEntry = series => entry => {
        const newSeriesArray = [...seriesArray];
        const newSeries = newSeriesArray[newSeriesArray.indexOf(series)];
        newSeries.entries.splice(newSeries.entries.indexOf(entry), 1);
        setSeriesArray(newSeriesArray);
        update();
    };

    const appStyle = {
        maxWidth: '45rem',
        margin: '0 auto',
        padding: '1rem',
    };
    return (
        <div style={appStyle}>
            <Query
                searchWords={searchWords}
                onChangeSearchWords={onChangeSearchWords}
                searchTags={searchTags}
                onChangeSearchTags={onChangeSearchTags}
            />
            {/*<SeriesList/>*/}
            <PostButton
                onAddSeries={onAddSeries}
            />
        </div>
    );
};

export default App;
