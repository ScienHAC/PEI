import React from 'react';
import Maintenance from '../Components/Maintenance';

// Original interactive Archives implementation has been commented out temporarily
// to suspend archival browsing while the journal is not accepting / displaying papers.
// All business logic retained above for future restoration (see git history).

const Archives = () => (
    <Maintenance
        title="Archives"
    message="Currently under maintenance and curation... will be updated soon. Access will be restored shortly."
        note="Thank you for your understanding and interest in our previously published issues." />
);

export default Archives;
