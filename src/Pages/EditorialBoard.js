import React, { useMemo } from 'react';
import '../CSS/EditorialBoard.css';
// We can still keep JSON for local members (Editors); additional board members inline for now
import data from '../assets/editorialBoard.json';

// Utility: group members by role preserving desired display order
// Build three buckets explicitly as requested: Editor-in-Chief, Editors, Editorial Board
const buildThreeColumnData = (json) => {
    const editorInChief = json.filter(m=>/Editor-in-Chief/i.test(m.role));
    const editors = json.filter(m=>/Editor$/i.test(m.role));
    // Additional international / advisory members (hard-coded from user list) -----------------
    const intl = [
        { name:'Prof. (Dr.) Jenq-Haur Wang', affiliation:'National Taiwan University, Taiwan (Computer Science)', email:'jhwang@ntut.edu.tw' },
        { name:'Prof. (Dr.) Chuan-Ming Liu', affiliation:'National Taipei University of Technology, Taiwan (Computer Science)', email:'cmliu@ntut.edu.tw' },
        { name:'Prof. (Dr.) Maria Jose Escalona', affiliation:'University of Seville, Spain (Software Engineering)', email:'andreas.hinderks@iwt2.org' },
        { name:'Prof. (Dr.) Michael Bosnjak', affiliation:'University of Trier, Germany (Psychology)', email:'bosnjak@uni-trier.de' },
        { name:'Prof. (Dr.) Hasan Koten', affiliation:'Istanbul Medeniyet University, Turkey (Mechanical Engineering)', email:'hasan.koten@medeniyet.edu.tr' },
        { name:'Dr. Umesh Kumar', affiliation:'Air Radiators Pty Ltd, Lara, Australia (Mechanical Engineering)', email:'Farooq_ahmad2@rediffmail.com' },
        { name:'Prof. (Dr.) Ágota Drégelyi-Kiss', affiliation:'Óbuda University, Hungary (Mechanical Engineering)', email:'dregelyi.agota@bgk.uni-obuda.hu' },
        { name:'Mr. Farooque Ahmad', affiliation:'Jazan University, Saudi Arabia (Mechanical Engineering)', email:'farooq_ahmad2@rediffmail.com' }
    ];
    return [
        { title:'Editor-in-Chief', members:editorInChief },
        { title:'Editors', members:editors },
        { title:'Editorial Board', members:intl }
    ];
};


const EditorialBoard = () => {
    const sections = useMemo(()=> buildThreeColumnData(data), []);

    return (
        <div className="editorial-board-wrapper">
            <header className="eb-header">
                <h1>Editorial Board</h1>
                <p className="eb-subtitle">Leadership and advisory members guiding the quality and vision of the journal.</p>
            </header>
            <div className="eb-three-col">
                {sections.map(section => (
                    <section key={section.title} className="eb-col">
                        <h2 className="eb-section-title">{section.title}</h2>
                        <ul className="eb-simple-list">
                            {section.members.map(m => (
                                <li key={m.id || m.email || m.name} className="eb-simple-item">
                                    <div className="eb-simple-info">
                                        <strong className="eb-simple-name">{m.name}</strong>
                                        <span className="eb-simple-affil">{m.affiliation}</span>
                                        {m.email && <a href={`mailto:${m.email}`} className="eb-simple-email">{m.email}</a>}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default EditorialBoard;
