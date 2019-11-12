import React from 'react';
import {clickable, field, tagField} from './App';

const lining = '2px #ccc solid';
const sidebarPercentWidth = 30;
const sidebar = {
    flex: `1 1 ${sidebarPercentWidth}%`,
};
const content = {
    flex: `4 4 ${100 - sidebarPercentWidth}%`,
    alignSelf: 'stretch',
    borderLeft: lining,
    paddingLeft: '1rem',
};

export const SeriesList = (props) => {
    return (
        <ul>
            {props.seriesArray.map((series, index) =>
                <Series
                    key={(Date.now() + index).toString(36)}
                    series={series}
                    onDeleteSeries={props.onDeleteSeries(series)}
                    onAddEntry={props.onAddEntry(series)}
                    saveEntry={props.saveEntry(series)}
                    deleteEntry={props.deleteEntry(series)}
                />)}
        </ul>
    );
};
const Series = (props) => {
    const style = {
        display: 'flex',
        margin: '1rem 0',
    };
    return (
        <li style={style}>
            <ul>
                {props.series.entries.map((entry, index) =>
                    <Entry
                        key={(Date.now() + index).toString(36)}
                        entry={entry}
                        saveEntry={props.saveEntry(entry)}
                        deleteEntry={props.deleteEntry}
                    />)}
                {
                    (props.series.entries.length > 0)
                        ? <li
                            style={{display: 'flex'}}
                        >
                            <div style={sidebar}/>
                            <AddEntryButton
                                onAddEntry={props.onAddEntry}
                            />
                        </li>
                        :
                        <li
                            style={{display: 'flex'}}
                        >
                            <DeleteSeriesButton onDeleteSeries={props.onDeleteSeries}/>
                            <AddEntryButton
                                onAddEntry={props.onAddEntry}
                            />
                        </li>
                }
            </ul>
        </li>
    );
};
const AddEntryButton = (props) => {
    const style = {
        ...clickable,
        ...content,
        backgroundColor: 'lightgreen',
    };
    return <div
        style={style}
        onClick={props.onAddEntry}
    />;
};
const DeleteSeriesButton = (props) => {
    const style = {
        ...clickable,
        ...sidebar,
        backgroundColor: 'lightcoral',
    };
    return (
        <div
            style={style}
            onClick={props.onDeleteSeries}
        />
    );
};
const Entry = (props) => {
    const [editing, setEditing] = React.useState(false);
    const [gist, setGist] = React.useState(props.entry.gist);
    const [note, setNote] = React.useState(props.entry.note);
    const [tags, setTags] = React.useState(props.entry.tags);

    const onChangeGist = (e) => setGist(e.target.value);
    const onChangeNote = (e) => setNote(e.target.value);
    const onChangeTags = (e) => setTags(e.target.value);

    const onToggle = () => {
        if (editing) {
            if (gist.length > 0
                || note.length > 0
                || tags.length > 0)
                props.saveEntry(gist, note, tags);
            else props.deleteEntry();
        }
        setEditing(!editing);
    };

    const style = {
        display: 'flex',
        alignItems: 'flex-start',
    };
    return (
        <li style={style}>
            <TimeStamp
                entry={props.entry}
                editing={editing}
                onClick={onToggle}
            />
            {editing
                ? <Editor
                    entry={props.entry}
                    gist={gist}
                    onChangeGist={onChangeGist}
                    note={note}
                    onChangeNote={onChangeNote}
                    tags={tags}
                    onChangeTags={onChangeTags}
                    onToggle={onToggle}
                />
                : <Info
                    gist={gist}
                    note={note}
                    tags={tags}
                />
            }
        </li>
    );
};
const TimeStamp = (props) => {
    const style = {
        ...clickable,
        ...sidebar,
        backgroundColor: props.editing ? 'lightblue' : 'white',
        padding: '0 1rem',
        fontSize: '100%',
    };
    return (
        <div
            style={style}
            onClick={props.onClick}
        >
            {props.entry.createdAt} ({props.entry.updatedAt})
        </div>
    );
};
const Editor = (props) => {
    const onKeyDown = (e) => {
        if (e.key === 'Enter') props.onToggle();
    };
    const resizeTextarea = (e) => {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };
    const style = {
        ...content,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        fontSize: '125%',
    };
    return (
        <div style={style}>
            <input
                style={{...field, fontWeight: 'bold'}}
                type='text'
                value={props.gist}
                onChange={props.onChangeGist}
                onKeyDown={onKeyDown}
            />
            <textarea
                style={{
                    ...field,
                    fontStyle: 'italic',
                    whiteSpace: 'pre-wrap',
                }}
                value={props.note}
                onChange={props.onChangeNote}
                onKeyUp={resizeTextarea}
                onFocus={resizeTextarea}
            />
            <input
                style={tagField}
                type='text'
                value={props.tags}
                onChange={props.onChangeTags}
                onKeyDown={onKeyDown}
            />
        </div>
    );
};
const Info = (props) => {
    const [isExpanded, setIsExpanded] = React.useState(false);

    const onToggle = () => setIsExpanded(!isExpanded);

    const style = {
        ...clickable,
        ...content,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        fontSize: '125%',
    };
    return (
        <div
            style={style}
            onClick={onToggle}
        >
            {isExpanded
                ? <div style={{backgroundColor: 'yellow', fontWeight: 'bold'}}>{props.gist}</div>
                : <div style={{fontWeight: 'bold'}}>{props.gist}</div>}
            {isExpanded
            && <div style={{fontStyle: 'italic', whiteSpace: 'pre-wrap'}}>
                {props.note}
            </div>}
            {isExpanded
            && <div>
                {props.tags}
            </div>}
        </div>
    );
};