import React from 'react'

const ReviewerProfileBox = ({ email, paperId }) => {
    return (
        <div>
            <h1>{email}{paperId}</h1>
        </div>
    )
}

export default ReviewerProfileBox
