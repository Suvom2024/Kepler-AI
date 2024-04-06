import React, { useState , useEffect  } from 'react';

const sections = [
  // Existing Data Analysis Agent section
  {
    imgUrl: "https://i.ibb.co/wSCpkjn/data-analyst.webp",
    content: `
      <h1 class="text-5xl font-extrabold text-indigo-700 mb-8">Hello! I am your Data Analysis Agent</h1>
      <h2 class="text-3xl font-bold text-gray-800 mb-6">What can I do for you?</h2>
      <p class="text-gray-700 mb-6">
        As an adept in the realm of data, I excel at <strong>gathering</strong>, <strong>processing</strong>, and <strong>analyzing</strong> vast datasets from a multitude of sources.
        My capabilities extend to unveiling pivotal insights and patterns that are instrumental in guiding strategic business decisions.
      </p>
      <h2 class="text-3xl font-bold text-gray-800 mb-2">How can I help your business?</h2>
      <p class="text-gray-700 mb-6">
        I am not just a tool but a strategic partner that empowers businesses to:
        <ul class="list-disc list-inside">
          <li><strong>Optimize operational efficiencies</strong> by identifying bottlenecks and suggesting improvements,</li>
          <li><strong>Drive revenue growth</strong> through the discovery of new market opportunities and customer insights,</li>
          <li><strong>Enhance risk management</strong> by predicting potential pitfalls and proposing preventive measures,</li>
          <li><strong>Strengthen competitive advantage</strong> by leveraging data-driven strategies that outpace industry trends.</li>
        </ul>
      </p>
    `,
  },
  // Document Summarizer Agent section
  {
    imgUrl: "https://i.ibb.co/KrmB7Cm/doc-summ.webp",
    content: `
      <h1 class="text-5xl font-extrabold text-indigo-700 mb-8">Hello! I am your Document Document Agent</h1>
      <h2 class="text-3xl font-bold text-gray-800 mb-6">What can I do for you?</h2>
      <p class="text-gray-700 mb-6">
        I specialize in <strong>distilling</strong> key information from lengthy documents, making it easier for you to grasp the essence without getting lost in the details. My expertise lies in <strong>summarizing</strong> complex texts, <strong>highlighting</strong> important points, and <strong>generating</strong> concise overviews.
      </p>
      <h2 class="text-3xl font-bold text-gray-800 mb-2">How can I assist you?</h2>
      <p class="text-gray-700 mb-6">
        Whether you're dealing with academic papers, legal documents, or business reports, I can:
        <ul class="list-disc list-inside">
          <li><strong>Provide quick summaries</strong> to save you time and effort,</li>
          <li><strong>Answer specific questions</strong> based on the document's content,</li>
          <li><strong>Identify key themes and ideas</strong> to enhance your understanding,</li>
          <li><strong>Offer insights</strong> to support your research or decision-making process.</li>
        </ul>
      </p>
    `,
  },
  // Database Agent section
  {
    imgUrl: "https://i.ibb.co/Qn4RdLM/db-agent.webp",
    content: `
      <h1 class="text-5xl font-extrabold text-indigo-700 mb-8">Hello! I am your Database Agent</h1>
<h2 class="text-3xl font-bold text-gray-800 mb-6">What can I do for you?</h2>
<p class="text-gray-700 mb-6">
  As your digital database assistant, I am skilled in <strong>querying</strong> and <strong>managing</strong> data across various database systems. I can help you <strong>retrieve</strong>, <strong>organize</strong>, and <strong>analyze</strong> data efficiently, ensuring that you have the information you need at your fingertips.
</p>
<h2 class="text-3xl font-bold text-gray-800 mb-2">How can I help your data needs?</h2>
<p class="text-gray-700 mb-6">
  My services include:
  <ul class="list-disc list-inside">
    <li><strong>Executing complex queries</strong> to extract specific data,</li>
    <li><strong>Assisting with database design</strong> and optimization,</li>
    <li><strong>Providing insights</strong> from data analysis,</li>
    <li><strong>Automating</strong> data retrieval and reporting tasks,</li>
    <li><strong>Ensuring data integrity</strong> and security through best practices,</li>
    <li><strong>Customizing data models</strong> to fit your unique business requirements,</li>
    <li><strong>Integrating</strong> data from multiple sources for a unified view,</li>
    `,
  },
  // Health Agent section
  {
    imgUrl: "https://i.ibb.co/vq22kF3/doc-agent.webp",
    content: `
    <h1 class="text-5xl font-extrabold text-indigo-700 mb-8">Hello! I am your Health Agent</h1>
    <h2 class="text-3xl font-bold text-gray-800 mb-6">What can I do for you?</h2>
    <p class="text-gray-700 mb-6">
      As a virtual health assistant, I excel in <strong>analyzing</strong> medical reports and providing <strong>health-related insights</strong>. My expertise lies in interpreting complex medical data and offering recommendations for maintaining or improving your well-being.
    </p>
    <h2 class="text-3xl font-bold text-gray-800 mb-2">How can I support your health?</h2>
    <p class="text-gray-700 mb-6">
      I can assist you in various ways, including:
      <ul class="list-disc list-inside">
        <li><strong>Offering guidance</strong> on preventive care to help you avoid future health issues,</li>
        <li><strong>Helping you understand</strong> your medications and their potential side effects,</li>
        <li><strong>Supporting mental health</strong> by providing resources and techniques for stress management and emotional well-being,</li>
        <li><strong>Coordinating with healthcare professionals</strong> to ensure a comprehensive approach to your health care.</li>
      </ul>
    </p>
    `,
  },
  // Real Estate Agent section
  {
    imgUrl: "https://i.ibb.co/ssWDgM3/real-estate.webp",
    content: `
    <h1 class="text-5xl font-extrabold text-indigo-700 mb-8">Hello! I am your Real Estate Agent</h1>
    <h2 class="text-3xl font-bold text-gray-800 mb-6">What can I do for you?</h2>
    <p class="text-gray-700 mb-6">
      As your virtual real estate assistant, I specialize in <strong>finding properties</strong> that match your specific requirements. Whether you're looking for a new home, commercial space, or investment property, I can help you navigate the real estate market with ease.
    </p>
    <h2 class="text-3xl font-bold text-gray-800 mb-2">How can I assist in your search?</h2>
    <p class="text-gray-700 mb-6">
      <ul class="list-disc list-inside">
        <li><strong>Identifying properties</strong> that meet your criteria, from location to budget and beyond,</li>
        <li><strong>Providing detailed information</strong> and insights about each property, including its history, condition, and potential,</li>
        <li><strong>Assisting with price negotiations</strong> and transaction processes, ensuring you get the best deal possible,</li>
        <li><strong>Offering market analysis</strong> to ensure you make informed decisions based on the latest real estate trends,</li>    
    `,
  },
  // Tourism Agent section
  {
    imgUrl: "https://i.ibb.co/1zgkhxn/tour-help.webp",
    content: `
    <h1 class="text-5xl font-extrabold text-indigo-700 mb-8">Hello! I am your Tourism Agent</h1>
    <h2 class="text-3xl font-bold text-gray-800 mb-6">What can I do for you?</h2>
    <p class="text-gray-700 mb-6">
      As your personal travel assistant, I am here to help you find the perfect tour based on your budget and preferences. From planning your itinerary to providing tips on local attractions, I ensure that your travel experience is smooth and enjoyable.
    </p>
    <h2 class="text-3xl font-bold text-gray-800 mb-2">How can I enhance your travel experience?</h2>
    <p class="text-gray-700 mb-6">
      <ul class="list-disc list-inside">
        <li><strong>Recommending destinations</strong> that align with your interests,</li>
        <li><strong>Planning your travel itinerary</strong> to maximize your experience,</li>
        <li><strong>Providing insights</strong> on local customs and attractions,</li>
        <li><strong>Offering travel tips</strong> to ensure a safe and enjoyable trip,</li>
        <li><strong>Arranging accommodations</strong> that suit your preferences and budget,</li>
        <li><strong>Organizing transportation</strong> for a seamless travel experience,</li>
        <li><strong>Guiding you</strong> through visa and travel document requirements,</li>
      </ul>
    </p>
    
    `,
  },
  // Lawyer Agent section
  {
    imgUrl: "https://i.ibb.co/PjG7VSL/lawyer.webp",
    content: `
    <h1 class="text-5xl font-extrabold text-indigo-700 mb-8">Hello! I am your Lawyer Agent</h1>
    <h2 class="text-3xl font-bold text-gray-800 mb-6">What can I do for you?</h2>
    <p class="text-gray-700 mb-6">
      As your digital legal assistant, I specialize in <strong>summarizing</strong> lengthy case files, helping you build <strong>arguments</strong> and understand legal <strong>judgments</strong>. My expertise lies in analyzing complex legal documents and providing concise summaries to aid in your legal endeavors.
    </p>
    <h2 class="text-3xl font-bold text-gray-800 mb-2">Need Help your legal matters?</h2>
    <p class="text-gray-700 mb-6">
      I can help you in various legal aspects, including:
      <ul class="list-disc list-inside">
        <li><strong>Summarizing case files</strong> to highlight key points,</li>
        <li><strong>Assisting in legal research</strong> and analysis,</li>
        <li><strong>Providing insights</strong> on legal precedents and interpretations,</li>
        <li><strong>Offering support</strong> in drafting legal documents and arguments,</li>
        <li><strong>Guiding you through the litigation process</strong>, including preparing for court hearings and trials,</li>
        <li><strong>Advising on compliance</strong> with relevant laws and regulations to minimize legal risks,</li>
      </ul>
    </p>
    
    `,
  },
];

const Initial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Fade in the content
    setOpacity(1);
    const slideInterval = setInterval(() => {
      // Fade out before changing the content
      setOpacity(0);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sections.length);
        // Fade in the new content
        setOpacity(1);
      }, 1000); // Match this delay with the fade-out transition duration
    }, 8000); // Adjust this for the duration each slide is visible

    return () => clearInterval(slideInterval);
  }, [currentIndex]);

  return (
    <div className="p-4 flex flex-col items-center"> {/* p-8 to p-4 for less padding on all sides */}
  <div className="flex flex-col lg:flex-row justify-between items-center w-full"> {/* md:flex-row to lg:flex-row for larger breakpoint */}
    <div className="w-full lg:w-1/2 p-2"> {/* Change md:flex-1 to lg:w-1/2 for a more specific width */}
      <div className="bg-white p-2 rounded-lg shadow-lg max-w-full overflow-hidden">
        <img
          src={sections[currentIndex].imgUrl}
          alt="Section Image"
          className={`transition-opacity duration-1000 ease-in-out ${opacity ? 'opacity-100' : 'opacity-0'}`}
          style={{ width: '100%', height: 'auto', objectFit: 'contain' }} // Inline styles can be kept for specific image control
        />
      </div>
    </div>
    <div className="w-full lg:w-1/2 p-2 mt-4 lg:mt-0"> {/* Added mt-4 for spacing on mobile, removed on lg screens */}
      <div className={`bg-white/90 backdrop-blur-md p-6 lg:p-12 rounded-2xl shadow-2xl transition-opacity duration-1000 ease-in-out ${opacity ? 'opacity-100' : 'opacity-0'}`}
        dangerouslySetInnerHTML={{ __html: sections[currentIndex].content }}
        style={{ opacity: opacity }}
      ></div>
    </div>
  </div>
</div>
  );
};

export default Initial;