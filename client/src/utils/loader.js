import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader({ full }) {
    return (
        <div className={`root_loader ${full ? "full" : ""}`}>
            <CircularProgress />
        </div>
    )
}
