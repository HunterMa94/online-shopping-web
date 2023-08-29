import React from 'react'
import DashboardLayout from 'hoc/DashboardLayout'
import SiteVars from './SiteVars'

export default function Site() {
    return (
        <DashboardLayout title="Manage site">
            <SiteVars />
        </DashboardLayout>
    )
}
