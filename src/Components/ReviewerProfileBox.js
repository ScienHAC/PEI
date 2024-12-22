import React from 'react'

const ReviewerProfileBox = ({ email, paperId }) => {
    return (
        <div
            style={{
                position: 'fixed',
                maxWidth: '320px',
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                zIndex: 10,
                maxHeight: '200px',
                overflowY: 'auto',
                left: '-30px',
            }}
        >
            <div>
                <h3>Reviewer Profile</h3>
                <p><strong>Email:</strong> {email}</p>
                <p> {paperId}</p>
            </div>
        </div>
    )
}

export default ReviewerProfileBox
