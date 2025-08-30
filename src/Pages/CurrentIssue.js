import React from 'react';
import Maintenance from '../Components/Maintenance';

// Original CurrentIssue data fetching logic commented out temporarily while issues are curated.
// Business logic preserved above (see git history) to re-enable once publication resumes.

const CurrentIssue = () => (
    <Maintenance
        title="Current Issue"
    message="Currently under maintenance... will be updated soon. The current issue is being prepared and finalized."
        note="Please check back soon for newly published articles." />
);

export default CurrentIssue;
