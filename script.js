// jobs data
let allJobs = [
    { id: 1, company: "Mobile First Corp", pos: "React Native Developer", loc: "Remote", type: "Full-time", sal: "$130,000 - $175,000", desc: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide." },
    { id: 2, company: "WebFlow Agency", pos: "Web Designer & Developer", loc: "Los Angeles, CA", type: "Part-time", sal: "$80,000 - $120,000", desc: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends." },
    { id: 3, company: "DataViz Solutions", pos: "Data Visualization Specialist", loc: "Boston, MA", type: "Full-time", sal: "$125,000 - $165,000", desc: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking." },
    { id: 4, company: "CloudFirst Inc", pos: "Backend Developer", loc: "Seattle, WA", type: "Full-time", sal: "$140,000 - $190,000", desc: "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure." },
    { id: 5, company: "Innovation Labs", pos: "UI/UX Engineer", loc: "Austin, TX", type: "Full-time", sal: "$110,000 - $150,000", desc: "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required." },
    { id: 6, company: "MegaCorp Solutions", pos: "JavaScript Developer", loc: "New York, NY", type: "Full-time", sal: "$130,000 - $170,000", desc: "Build enterprise applications with JavaScript and modern frameworks. Competitive compensation and professional development." },
    { id: 7, company: "StartupXYZ", pos: "Full Stack Engineer", loc: "Remote", type: "Full-time", sal: "$120,000 - $160,000", desc: "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required." },
    { id: 8, company: "TechCorp Industries", pos: "Senior Frontend Developer", loc: "San Francisco, CA", type: "Full-time", sal: "$130,000 - $175,000", desc: "Looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript." }
];

let interviewList = [];
let rejectedList = [];
let currentStatus = 'all-filter-btn';

const total = document.getElementById('total');
const interviewCount = document.getElementById('interviewCount');
const rejectedCount = document.getElementById('rejectedCount');
const tabCount = document.getElementById('tabCount');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCardSection = document.getElementById('allCards');
const filterSection = document.getElementById('filtered-section');
const mainContainer = document.querySelector('main');

renderAllJobs();
calculateCount();

function calculateCount() {
    total.innerText = allJobs.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    if (currentStatus === 'all-filter-btn') tabCount.innerText = allJobs.length;
    else if (currentStatus === 'interview-filter-btn') tabCount.innerText = interviewList.length;
    else if (currentStatus === 'rejected-filter-btn') tabCount.innerText = rejectedList.length;
}

function toggleStyle(id) {
    // reset all button
    [allFilterBtn, interviewFilterBtn, rejectedFilterBtn].forEach(btn => {
        btn.classList.add('bg-white', 'text-[#64748b]', 'shadow');
        btn.classList.remove('bg-[#3b82f6]', 'text-white', 'px-8');
    });

    // current clicked button
    const selected = document.getElementById(id);
    currentStatus = id;

    selected.classList.remove('bg-white', 'text-[#64748b]', 'shadow');
    selected.classList.add('bg-[#3b82f6]', 'text-white', 'px-8');

    if (id === 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderFiltered('interview');
    } else if (id === 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
        renderAllJobs();
    } else if (id === 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderFiltered('rejected');
    }

    calculateCount();
}

mainContainer.addEventListener('click', function (event) {
    const card = event.target.closest('.card');
    if (!card) return;

    const jobId = parseInt(card.getAttribute('data-id'));
    const jobData = allJobs.find(j => j.id === jobId);

    // when click interview
    if (event.target.classList.contains('interview-btn')) {
        if (!interviewList.some(j => j.id === jobId)) {
            interviewList.push(jobData);
            rejectedList = rejectedList.filter(j => j.id !== jobId);
        }
    } 
    // when click reject
    else if (event.target.classList.contains('rejected-btn')) {
        if (!rejectedList.some(j => j.id === jobId)) {
            rejectedList.push(jobData);
            interviewList = interviewList.filter(j => j.id !== jobId);
        }
    } 
    // when click delete
    else if (event.target.classList.contains('btn-delete')) {
        allJobs = allJobs.filter(j => j.id !== jobId);
        interviewList = interviewList.filter(j => j.id !== jobId);
        rejectedList = rejectedList.filter(j => j.id !== jobId);
    }

    // Refresh Current View
    if (currentStatus === 'all-filter-btn') renderAllJobs();
    else toggleStyle(currentStatus);
    calculateCount();
});

