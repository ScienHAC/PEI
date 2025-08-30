import React from 'react';
import Maintenance from '../Components/Maintenance';

// Original dynamic VolumePage implementation commented out for maintenance period.
// Business logic preserved above (see git history) for future restoration.

const VolumePage = () => (
    <Maintenance
        title="Volume Details"
    message="Currently under maintenance... volume-specific content will be updated soon while archival data is reorganized."
        note="Navigation to individual volumes will resume once curation is complete." />
);

export default VolumePage;
