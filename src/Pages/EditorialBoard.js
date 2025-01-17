import React from 'react';

const EditorialBoard = () => {
    const containerStyle = {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '20px auto',
    };

    const headerStyle = {
        fontFamily: 'Roboto Slab, serif',
        fontSize: '2.5rem',
        color: '#333',
        textAlign: 'center',
        marginBottom: '20px',
    };

    const sectionHeaderStyle = {
        fontSize: '1.8rem',
        color: '#555',
        margin: '20px 0 10px',
    };

    const listStyle = {
        listStyleType: 'none',
        padding: '0',
    };

    const listItemStyle = {
        fontSize: '1.2rem',
        color: '#555',
        padding: '8px 0',
        borderBottom: '1px solid #ddd',
    };

    const linkStyle = {
        color: '#007bff',
        textDecoration: 'none',
    };

    const editorInChief = [
        { name: 'Dr. Pankaj Agarwal', title: 'Editor-in-Chief', affiliation: 'KR Mangalam University, Gurugram, India', email: 'dean.soet@krmangalam.edu.in' },
    ];

    const editors = [
        { name: 'Dr Shweta Bansal', title: 'Editor', affiliation: 'KR Mangalam University, Gurugram, India', email: 'shweta.bansal@krmangalam.edu.in' },
        { name: 'Dr Aman Jatain', title: 'Editor', affiliation: 'KR Mangalam University, Gurugram, India', email: 'aman.jatain@krmangalam.edu.in' },
        { name: 'Dr Rupesh Kumar Tipu', title: 'Editor', affiliation: 'KR Mangalam University, Gurugram, India', email: 'rupesh.kumar@krmangalam.edu.in' },
        { name: 'Dr. Digvijay Singh', title: 'Editor', affiliation: 'KR Mangalam University, Gurugram, India', email: 'digvijay.singh@krmangalam.edu.in' },
        { name: 'Dr Imran Siraj', title: 'Editor', affiliation: 'KR Mangalam University, Gurugram, India', email: 'imran.siraj@krmangalam.edu.in' },
    ];

    const editorialBoard = [
        { name: 'Prof. (Dr.) Jenq-Haur Wang', affiliation: 'National Taiwan University, Taiwan (Computer Science)', email: 'jhwang@ntut.edu.tw' },
        { name: 'Prof. (Dr.) Chuan-Ming Liu', affiliation: 'National Taipei University of Technology, Taiwan (Computer Science)', email: 'cmliu@ntut.edu.tw' },
        { name: 'Prof. (Dr.) Maria Jose Escalona', affiliation: 'University of Seville, Spain (Software Engineering)', email: 'andreas.hinderks@iwt2.org' },
        { name: 'Prof. (Dr.) Michael Bosnjak', affiliation: 'University of Trier, Germany (Psychology)', email: 'bosnjak@uni-trierde' },
        { name: 'Prof. (Dr.) Hasan Koten', affiliation: 'Istanbul Medeniyet University, Turkey (Mechanical Engineering)', email: 'hasan.koten@medeniyet.edu.tr' },
        { name: 'Dr. Umesh Kumar', affiliation: 'Air Radiators Pty Ltd, Lara, Australia (Mechanical Engineering)', email: 'Farooq_ahmad2@rediffmail.com' },
        { name: 'Prof. (Dr.) Ágota Drégelyi-Kiss', affiliation: 'Óbuda University, Hungary (Mechanical Engineering)', email: '' },
        { name: 'Mr. Farooque Ahmad', affiliation: 'Jazan University, Saudi Arabia (Mechanical Engineering)', email: '' },
    ];

    const renderMembers = (members) => (
        members.map((member, index) => (
            <li key={index} style={listItemStyle}>
                <strong>{member.name}</strong>
                <br />
                {member.affiliation}
                <br />
                {member.email && (
                    <a href={`mailto:${member.email}`} style={linkStyle}>{member.email}</a>
                )}
            </li>
        ))
    );

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Editorial Board</h1>
            <h2 style={sectionHeaderStyle}>Editor-in-Chief</h2>
            <ul style={listStyle}>{renderMembers(editorInChief)}</ul>

            <h2 style={sectionHeaderStyle}>Editors</h2>
            <ul style={listStyle}>{renderMembers(editors)}</ul>

            <h2 style={sectionHeaderStyle}>Editorial Board</h2>
            <ul style={listStyle}>{renderMembers(editorialBoard)}</ul>
        </div>
    );
};

export default EditorialBoard;
