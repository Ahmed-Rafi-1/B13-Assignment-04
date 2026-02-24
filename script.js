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

function renderAllJobs() {
    allCardSection.innerHTML = '';

    if (allJobs.length === 0) {
        allCardSection.innerHTML = createEmptyMessage();
    } else {
        allJobs.forEach(job => {
            let statusText = 'Not Applied';
            if (interviewList.some(j => j.id === job.id)) statusText = 'interview';
            if (rejectedList.some(j => j.id === job.id)) statusText = 'rejected';
            allCardSection.appendChild(createCardHTML(job, statusText));
        });
    }
}

function renderFiltered(type) {
    filterSection.innerHTML = '';
    let list = (type === 'interview') ? interviewList : rejectedList;

    if (list.length === 0) {
        filterSection.innerHTML = createEmptyMessage();
    } else {
        list.forEach(job => {
            filterSection.appendChild(createCardHTML(job, type));
        });
    }
}

function createEmptyMessage() {
    return `
        <div class="h-[400px] w-full flex flex-col justify-center items-center gap-5 bg-white px-10 py-[60px] rounded-lg border border-solid border-[#f1f2f4]">
            <div class="w-[100px] h-[100px] flex justify-center items-center relative">
                <img src="./jobs.png" alt="No Jobs" class="w-[80px] h-[80px]">
            </div>
            <div class="flex flex-col gap-1">
                <span class="font-semibold text-2xl text-center text-[#002c5c]">No jobs available</span>
                <span class="font-normal text-[16px] leading-[22px] text-center text-slate-500">Check back soon for new job opportunities</span>
            </div>
        </div>`;
}

function createCardHTML(job, status) {
    const div = document.createElement('div');

    div.className = 'card flex flex-row justify-between items-start w-full bg-white border border-solid border-[#f1f2f4] p-8 rounded-lg shadow-sm mb-6';
    div.setAttribute('data-id', job.id);
    
    let statusTextColor = "text-[#64748b]"; 
    if(status === 'interview') statusTextColor = "text-emerald-500 font-bold";
    if(status === 'rejected') statusTextColor = "text-red-500 font-bold";
    if(status.toLowerCase() === 'not applied') statusTextColor = "text-[#002c5c] font-medium";

    div.innerHTML = `
        <div class="space-y-6">
            <div>
                <p class="text-4xl font-bold text-[#002c5c]">${job.pos}</p>
                <p class="text-xl text-slate-500">${job.company}</p>
            </div>

            <div class="flex gap-2">
                <p class="bg-gray-200 px-5 py-1 rounded-sm text-sm font-medium uppercase">${job.loc}</p>
                <p class="bg-gray-200 px-5 py-1 rounded-sm text-sm font-medium uppercase">${job.type}</p>
                <p class="bg-gray-200 px-5 py-1 rounded-sm text-sm font-medium uppercase">${job.sal}</p>
            </div>

            <div class="w-[113px] h-9 flex justify-center items-center bg-[#eef4ff] rounded">
                <p class="${statusTextColor} capitalize text-sm">${status}</p>
            </div>

            <p class="description text-[#323b49] max-w-2xl leading-relaxed">${job.desc}</p>

            <div class="flex gap-5">
                <button class="interview-btn bg-white text-green-800 px-6 py-2 font-semibold rounded border  hover:bg-green-300 transition-colors cursor-pointer">Interview</button>
                <button class="rejected-btn bg-white text-red-800 px-6 py-2 font-semibold rounded border hover:bg-red-300 transition-colors cursor-pointer">Rejected</button>
            </div>
        </div>

        <div class="flex ml-4">
            <button class="btn-delet bg-white text-red-600 px-6 py-2 font-bold rounded border border-red-200 hover:bg-red-50 transition-all cursor-pointer">
                Delete
            </button>
        </div>`;
    return div;
}