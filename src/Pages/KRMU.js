import React from 'react';

const KRMU = () => {
  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px', fontFamily:'Roboto, sans-serif', lineHeight:1.65 }}>
      <div style={{ position:'relative', borderRadius:18, overflow:'hidden', marginBottom:50 }}>
        <div style={{ background:'linear-gradient(120deg,#084c61 0%,#0d6f77 45%,#128294 95%)', backgroundAttachment:'fixed', padding:'70px 30px', textAlign:'center' }}>
          <img src="/krmu.png" alt="KRMU Logo" style={{ width:120, height:'auto', marginBottom:25, filter:'drop-shadow(0 4px 8px rgba(0,0,0,0.25))' }} />
          <h1 style={{ fontSize:'2.4rem', fontWeight:700, color:'#fff', margin:'0 0 14px' }}>K.R. Mangalam University (KRMU)</h1>
          <p style={{ maxWidth:820, margin:'0 auto', color:'#f1f6f7', fontSize:'1.05rem', lineHeight:1.55 }}>
            Interdisciplinary teaching, ethical research practice, and innovation culture supporting societal advancement.
          </p>
        </div>
      </div>
      <article style={{ background:'#fff', border:'1px solid #e2e8ea', borderRadius:12, padding:'32px 36px', boxShadow:'0 4px 16px rgba(0,0,0,0.04)' }}>
        <p><strong>Established in 2013</strong> under the Haryana Private University Act, K.R. Mangalam University (KRMU) is a distinguished private university situated in Gurugram, Haryana. The university has rapidly emerged as a pioneer institution in interdisciplinary education, integrating rigorous academic training with innovative research and practical application to prepare students for societal contribution and nation-building.</p>
        <p>KRMU is committed to advancing ambitious students' educational journeys by fostering a culture of intellectual discovery and innovation. The university nurtures critical thinking, creativity, and deep learning through a multidisciplinary approach, balancing theoretical knowledge with industry exposure and research-driven methodologies.</p>
        <p>The academic framework at KRMU encompasses a wide array of undergraduate, postgraduate, doctoral, and diploma programs across diverse disciplines. The university maintains a strong emphasis on co-curricular activities that promote holistic development, including cultural clubs, student-centric bodies, and sports initiatives that enhance leadership and community engagement.</p>
        <p><strong>Research and innovation</strong> form the cornerstone of KRMU's mission. The institution is home to a vibrant research ecosystem, engaging faculty and over 5,000 students in projects aligned with global sustainable development goals. The Research and Development Cell fosters interdisciplinary collaboration, facilitating partnerships with industry, government, and international institutions. KRMU supports innovation through dedicated centers like the K.R. Mangalam Entrepreneurship and Innovation Center, offering incubation programs, prototyping labs, and tailored academic programs to empower future entrepreneurial leaders.</p>
        <p>The university's modern campus situated on Sohna Road in Gurugram offers state-of-the-art infrastructure including advanced laboratories, conference and seminar facilities, sports complexes, and secure residential hostels. With strong global partnerships and a focus on ethical, inclusive, and quality education, KRMU continues to contribute to academic excellence and social progress.</p>
        <p style={{ marginTop:30 }}><em>For more information about K.R. Mangalam University and its academic and research initiatives, visit <a href="https://www.krmangalam.edu.in" target="_blank" rel="noopener noreferrer" style={{ color:'#0a5a70', fontWeight:600 }}>www.krmangalam.edu.in</a>.</em></p>
      </article>
    </div>
  );
};

export default KRMU;
