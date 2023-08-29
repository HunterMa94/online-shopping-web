import React, { useState } from 'react'

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import {
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Checkbox,
    Collapse
} from "@mui/material"

export default function CollapseCheckBox(props) {
    const [open, setOpen] = useState(props.initState);
    const [checked, setChecked] = useState([]);

    const handleCollapseOpen = () => setOpen(!open);

    const renderList = () => {
        if (props.list) {
            return (
                props.list.map((value) => (
                    <ListItem key={value._id}>
                        <ListItemText primary={value.name} />
                        <ListItemSecondaryAction>
                            <Checkbox
                                color='primary'
                                onChange={() => handleToggle(value._id)}
                                checked={checked.indexOf(value._id) !== -1}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                ))
            )
        }
    }

    const handleToggle = (id) => {
        const currentIndex = checked.indexOf(id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(id)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked);

        props.handleFilters(newChecked);
    }

    return (
        <div className='collapse_items_wrapper'>
            <List>
                <ListItem onClick={handleCollapseOpen}>
                    <ListItemText
                        primary={props.title}
                        className="collapse_title"
                    />
                    {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </ListItem>
                <Collapse in={open} timeout="auto">
                    <List component='div' disablePadding>
                        {renderList()}
                    </List>
                </Collapse>
            </List>
        </div>
    )
}
