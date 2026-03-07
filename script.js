let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = (e) => {
    e.stopPropagation();
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuIcon.contains(e.target) && navbar.classList.contains('active')) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
});

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

const typed = new Typed('.multiple-text', {
    strings: ['Cloud Engineer', 'DevOps Enthusiast', 'Python Developer', 'Automation Specialist'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

/* --- NEW FEATURES SCRIPT --- */

// ScrollReveal Initialization
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .skills-container, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

// Skill Bar Animation on Scroll
const skillBars = document.querySelectorAll('.progress-line span');

function checkScroll() {
    let windowHeight = window.innerHeight;

    skillBars.forEach(bar => {
        let barPosition = bar.getBoundingClientRect().top;
        if (barPosition < windowHeight - 50) {
            // Get the specific width depending on the class of the parent element
            const parentClass = bar.parentElement.className;
            let targetWidth = "0%";
            if (parentClass.includes('python')) targetWidth = "90%";
            else if (parentClass.includes('sql') || parentClass.includes('linux') || parentClass.includes('aa')) targetWidth = "85%";
            else if (parentClass.includes('aws') || parentClass.includes('tf') || parentClass.includes('langchain')) targetWidth = "80%";
            else if (parentClass.includes('docker')) targetWidth = "75%";
            else if (parentClass.includes('agentic')) targetWidth = "70%";

            bar.style.width = targetWidth;
        }
    });
}

window.addEventListener('scroll', checkScroll);
// Trigger once on load in case skills are already in view
checkScroll();

/* --- ADVANCED FEATURES SCRIPT --- */

// Settings Panel Toggle
const settingsIcon = document.getElementById('settings-icon');
const settingsOverlay = document.getElementById('settingsOverlay');
const closeSettings = document.getElementById('close-settings');
const settingsContactBtn = document.getElementById('settings-contact-btn');

settingsIcon.addEventListener('click', () => {
    settingsOverlay.classList.add('active');
});

closeSettings.addEventListener('click', () => {
    settingsOverlay.classList.remove('active');
});

if (settingsContactBtn) {
    settingsContactBtn.addEventListener('click', () => {
        settingsOverlay.classList.remove('active');
    });
}

// Light/Dark Mode Toggle
const themeSwitch = document.getElementById('themeSwitch');
const themeLabel = document.getElementById('themeLabel');

themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        document.documentElement.classList.add('light-mode');
        themeLabel.innerText = 'Light Mode';
    } else {
        document.documentElement.classList.remove('light-mode');
        themeLabel.innerText = 'Dark Mode';
    }
});

// Brightness Slider
const brightnessSlider = document.getElementById('brightnessSlider');
brightnessSlider.addEventListener('input', (e) => {
    document.body.style.filter = `brightness(${e.target.value}%)`;
});

// Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const filterItems = document.querySelectorAll('.filter-item');
const showMoreBtn = document.getElementById('showMoreProjectsBtn');
let showingAllProjects = false;

// Filter button logic
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(button => button.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        // Theme mapped to filter values
        const themeMap = {
            'cloud': 'bg-cloud',
            'devops': 'bg-devops',
            'ai': 'bg-ai',
            'automation': 'bg-automation'
        };

        if (filterValue === 'all') {
            updateAppTheme('');
        } else if (themeMap[filterValue]) {
            updateAppTheme(themeMap[filterValue]);
        }

        filterItems.forEach(item => {
            // First determine if this item matches the filter
            const matchesFilter = filterValue === 'all' || item.classList.contains(filterValue);

            // Second determine if it should be displayed based on the "Show More" state
            // If it's a hidden-project and we are NOT showing all projects, it should stay hidden
            // EXCEPT if a specific category (not 'all') is selected, we might want to show it? 
            // Better UX: selecting a specific category overrides the "Show More" limit for that category.
            const isHiddenByDefault = item.classList.contains('hidden-project');
            const shouldShow = matchesFilter && (!isHiddenByDefault || showingAllProjects || filterValue !== 'all');

            if (shouldShow) {
                item.style.display = 'flex';
                setTimeout(() => item.style.opacity = '1', 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => item.style.display = 'none', 300);
            }
        });

        // Hide the "Show More" button if a specific filter is clicked, show it if "All" is clicked
        if (showMoreBtn) {
            showMoreBtn.style.display = filterValue === 'all' ? 'inline-flex' : 'none';
        }
    });
});

// Show More / Show Less Logic
if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
        showingAllProjects = !showingAllProjects;

        if (showingAllProjects) {
            showMoreBtn.innerHTML = "Show Less Projects <i class='bx bx-chevron-up'></i>";
            showMoreBtn.classList.add('active');
        } else {
            showMoreBtn.innerHTML = "Show More Projects <i class='bx bx-chevron-down'></i>";
            showMoreBtn.classList.remove('active');

            // Scroll back to top of projects section smoothly when collapsing
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        }

        // Retrigger the active filter to update visibility
        const activeFilterBtn = document.querySelector('.filter-btn.active');
        if (activeFilterBtn) {
            activeFilterBtn.click();
        }
    });
}

// Service Grid Interaction
function toggleService(serviceId) {
    const allServices = document.querySelectorAll('.services-box');
    const targetService = document.getElementById(`demo-${serviceId}`).parentElement;

    const themeMap = {
        'cloud': 'bg-cloud',
        'devops': 'bg-devops',
        'ai': 'bg-ai',
        'auto': 'bg-automation'
    };

    if (targetService.classList.contains('active')) {
        targetService.classList.remove('active');
        updateAppTheme('');
    } else {
        allServices.forEach(box => box.classList.remove('active'));
        targetService.classList.add('active');

        // Apply background theme
        if (themeMap[serviceId]) {
            updateAppTheme(themeMap[serviceId]);
        }
    }
}

// Interactive Terminal CLI Logic
const terminalOutput = document.getElementById('terminalOutput');
const terminalInput = document.getElementById('terminalInput');
const terminalInputRow = document.getElementById('terminalInputRow');
let terminalStarted = false;

const terminalData = {
    'help': `Available commands:
about        → About me
whoami       → One-liner identity
status       → Current job status
skills       → Technical skills
projects     → My projects
services     → Services I offer
certs        → Certifications
education    → Education background
github       → GitHub profile
linkedin     → LinkedIn profile
resume       → Download my CV
hire         → Want to hire me?
ping naveen  → Check if I'm online
ls           → List portfolio sections
cat naveen.txt → Read my bio as a file
uptime       → How long I've been coding
date         → Current date & time
history      → Command history
clear        → Clear terminal`,
    'about': `I am Naveen Veeramreddy, a B.Tech graduate in Electronics & Communication Engineering.
Currently looking for my first role in Cloud, DevOps, or Automation.
I build projects to sharpen my skills in AWS, CI/CD pipelines, and AI-driven systems.`,
    'whoami': `naveen — Cloud & DevOps engineer. Fresher. Builder. Currently job hunting.`,
    'status': `[OPEN TO WORK]
Actively looking for my first role in:
  → Cloud Engineering (AWS)
  → DevOps / CI/CD
  → Automation (RPA / AI)
Reach out: naveenveeramreddy181668@gmail.com`,
    'skills': `Cloud (AWS): EC2, VPC, IAM, S3, Route 53, CloudFront, WAF, RDS
DevOps:      Terraform, Docker, GitHub Actions
Languages:   Python, SQL
Automation:  Automation Anywhere, N8N
AI & LLM:    LangChain, MCP Servers
Tools:       Git, Linux, MongoDB, Elasticsearch`,
    'projects': `1. MCP Multi-Server AI Integration System
   → AI agent integrating MongoDB, Elasticsearch & Weather API

2. Multi-Environment DevOps Deployment
   → Automated CI/CD pipelines using AWS & GitHub Actions

3. Web Data Extraction Automation
   → Automation Anywhere bot extracting dynamic web data to CSV`,
    'services': `✔ Cloud Infrastructure Setup (AWS, Terraform)
✔ DevOps CI/CD Pipeline Automation
✔ Business Process Automation (RPA)
✔ AI & LLM Workflow Integration`,
    'contact': `Email:    naveenveeramreddy181668@gmail.com
Phone:    +91 9347980893
Meeting:  https://calendly.com/naveenveeramreddy181668/new-meeting
LinkedIn: https://linkedin.com/in/naveen-veeramreddy/`,
    'certs': `✔ AWS Cloud Practitioner Essentials — Amazon Web Services
✔ Automation Anywhere Essentials — Automation Anywhere
✔ Introduction to Model Context Protocol — Anthropic`,
    'education': `B.Tech — Electronics & Communication Engineering
  Pragati Engineering College | CGPA: 7.7 | 2021-2025

Intermediate
  FIITJEE | Marks: 888/1000 | 2019-2021

Class 10
  SASI | CGPA: 9.8 | 2018-2019`,
    'github': `GitHub: https://github.com/Naveenveeramreddy
Repositories include:
  → Terraform (AWS IaC)
  → LangChain_Rag-Agent
  → 3-tier-architecture
  → AI-Restaurant-Assistant
  → Deploying-applications-in-multiple-environments`,
    'linkedin': `LinkedIn: https://www.linkedin.com/in/naveen-veeramreddy/
Feel free to connect!`,
    'resume': `Downloading resume...
If download doesn't start, visit:
https://naveenveeramreddy.github.io/Veeramreddy_Naveen_Resume.pdf`,
    'hire': `I'm actively looking for my first opportunity!
Let's talk: https://calendly.com/naveenveeramreddy181668/new-meeting
Or email me: naveenveeramreddy181668@gmail.com`,
    'ping naveen': `PING naveen@portfolio ~ ...
64 bytes from naveen: Online and available.
RTT: instant | Status: Open to Work`,
    'ls': `home/
skills/
projects/
services/
education/
certificates/
github/
contact/`,
    'cat naveen.txt': `Name:    Veeramreddy Venkata Naveen
Role:    Cloud & DevOps Engineer (Fresher)
Degree:  B.Tech ECE — Pragati Engineering College (2025)
Skills:  AWS, Terraform, Docker, GitHub Actions, Python, LangChain
Status:  Open to Work
Email:   naveenveeramreddy181668@gmail.com`,
    'uptime': `Coding since: 2021
Years active: 4+
Projects built: 7
Certifications: 3
Coffee consumed: countless`,
};

function printTerminal(text, isCommand = false) {
    let outLine = document.createElement('div');
    if (isCommand) {
        outLine.innerHTML = `<span class="prompt">naveen@portfolio:~$</span> <span class="cmd-text">${text}</span>`;
    } else {
        outLine.className = "terminal-output-line";
        outLine.innerText = text; // textContent handles newlines naturally
    }
    terminalOutput.appendChild(outLine);

    // Auto-scroll to bottom
    const terminalBody = document.querySelector('.terminal-body');
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Initial boot sequence
function bootTerminal() {
    printTerminal("System initialized.");
    printTerminal("Welcome to Naveen's Portfolio Shell.");
    printTerminal("Type 'help' to see available commands.");
    terminalInputRow.style.display = "flex";
    terminalInput.focus();
}

// Start terminal typing when in view
window.addEventListener('scroll', () => {
    let terminalPos = document.querySelector('.terminal-container').getBoundingClientRect().top;
    if (terminalPos < window.innerHeight - 100 && !terminalStarted) {
        terminalStarted = true;
        setTimeout(bootTerminal, 500);
    }
});

// Command history tracking
const cmdHistory = [];

// Handle user input
terminalInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        const raw = this.value.trim();
        const val = raw.toLowerCase();
        this.value = '';

        if (val === '') return;

        printTerminal(raw, true);
        cmdHistory.push(raw);

        // ── Dynamic commands ─────────────────────────────────
        if (val === 'clear') {
            terminalOutput.innerHTML = '';

        } else if (val === 'date') {
            printTerminal(new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'medium' }));

        } else if (val === 'history') {
            if (cmdHistory.length <= 1) {
                printTerminal('No previous commands.');
            } else {
                printTerminal(cmdHistory.slice(0, -1).map((c, i) => `  ${i + 1}  ${c}`).join('\n'));
            }

        } else if (val === 'resume') {
            printTerminal(terminalData['resume']);
            const a = document.createElement('a');
            a.href = 'Veeramreddy_Naveen_Resume.pdf';
            a.download = 'Veeramreddy_Naveen_Resume.pdf';
            a.click();

        } else if (val.startsWith('open ')) {
            const target = val.replace('open ', '').trim();
            const sectionMap = {
                home: 'home', skills: 'skills', projects: 'projects',
                services: 'services', education: 'education',
                certificates: 'certificates', github: 'github', contact: 'contact'
            };
            const sectionId = sectionMap[target];
            if (sectionId) {
                document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                printTerminal(`Navigating to ${target}...`);
            } else {
                printTerminal(`Unknown section: ${target}\nAvailable: home, skills, projects, services, education, certificates, github, contact`);
            }

            // ── Static commands ───────────────────────────────────
        } else if (terminalData[val]) {
            printTerminal(terminalData[val]);

        } else {
            printTerminal(`Command not found: ${val}\nType 'help' for available commands.`);
        }
    }
});

// Click on terminal body focuses the input
document.querySelector('.terminal-container').addEventListener('click', () => {
    terminalInput.focus();
});

// Skill Descriptions
const skillDescriptions = {
    'AWS': 'Amazon Web Services cloud computing platform.',
    'EC2': 'Elastic Compute Cloud for scalable virtual servers.',
    'S3': 'Simple Storage Service for scalable object storage.',
    'RDS': 'Relational Database Service for managed databases.',
    'VPC': 'Virtual Private Cloud for isolated network environments.',
    'Route 53': 'Scalable Domain Name System (DNS) web service.',
    'Auto Scaling': 'Automatically adjusts capacity to maintain steady performance.',
    'Load Balancer': 'Distributes incoming traffic across multiple targets.',
    'ALB': 'Application Load Balancer for HTTP/HTTPS web traffic.',
    'WAF': 'Web Application Firewall to protect against common web exploits.',
    'AMI': 'Amazon Machine Image provides the information required to launch an instance.',
    'Neptune': 'Fast, reliable, fully managed graph database service.',
    'DynamoDB': 'Fast and flexible NoSQL database service.',
    'EBS': 'Elastic Block Store provides block level storage volumes.',
    'EFS': 'Elastic File System for serverless, fully elastic file storage.',
    'Lambda': 'Serverless, event-driven compute service.',
    'IAM': 'Identity and Access Management securely manages access to services.',
    'ACM': 'AWS Certificate Manager for SSL/TLS certificates.',
    'CloudFront': 'Content Delivery Network for secure, fast delivery of data.',
    'MLOps': 'Machine Learning Operations for continuous integration of ML models.',
    'Docker': 'Platform for developing, shipping, and running applications in containers.',
    'Kubernetes': 'Container orchestration system for automating deployment.',
    'GitHub Actions': 'CI/CD platform allowing automation of pipelines.',
    'Terraform': 'Infrastructure as code tool for managing cloud resources.',
    'OpenTofu': 'Open-source alternative to Terraform for infrastructure as code.',
    'Python': 'High-level programming language used for scripting and backend development.',
    'SQL': 'Domain-specific language used for managing relational databases.',
    'Elasticsearch': 'Distributed, RESTful search and analytics engine.',
    'MongoDB': 'NoSQL document database for building scalable applications.',
    'Automation Anywhere': 'Enterprise robotic process automation (RPA) platform.',
    'N8N': 'Workflow automation tool that connects different apps and APIs.',
    'LangChain': 'Framework for developing applications powered by language models.',
    'MCP Servers': 'Model Context Protocol servers for exposing structured data context.',
    'Agentic AI': 'AI agents capable of independent decision-making.',
    'Git / GitHub': 'Version control system and cloud hosting platform.',
    'VS Code': 'Versatile source-code editor made by Microsoft.'
};

const globalThemeKeywords = {
    // Cloud
    'aws': 'bg-cloud', 'ec2': 'bg-cloud', 's3': 'bg-cloud', 'rds': 'bg-cloud', 'vpc': 'bg-cloud',
    'route 53': 'bg-cloud', 'alb': 'bg-cloud', 'waf': 'bg-cloud', 'ami': 'bg-cloud',
    'neptune': 'bg-cloud', 'dynamodb': 'bg-cloud', 'ebs': 'bg-cloud', 'efs': 'bg-cloud',
    'lambda': 'bg-cloud', 'iam': 'bg-cloud', 'acm': 'bg-cloud', 'cloudfront': 'bg-cloud',
    // DevOps
    'devops': 'bg-devops', 'docker': 'bg-devops', 'kubernetes': 'bg-devops', 'github actions': 'bg-devops',
    'terraform': 'bg-devops', 'opentofu': 'bg-devops', 'linux': 'bg-devops', 'git': 'bg-devops', 'ci/cd': 'bg-devops',
    // AI
    'ai': 'bg-ai', 'mlops': 'bg-ai', 'langchain': 'bg-ai', 'mcp': 'bg-ai', 'agentic': 'bg-ai',
    'python': 'bg-ai', 'gemini': 'bg-ai', 'llm': 'bg-ai', 'ollama': 'bg-ai',
    // Automation
    'automation': 'bg-automation', 'n8n': 'bg-automation', 'rpa': 'bg-automation'
};

document.querySelectorAll('.skill-chips span, .tech-stack span').forEach(chip => {
    chip.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent category expansion toggle

        const text = e.target.innerText.toLowerCase();
        let matchedTheme = null;
        for (const [key, theme] of Object.entries(globalThemeKeywords)) {
            if (text.includes(key)) {
                matchedTheme = theme;
                break;
            }
        }
        if (matchedTheme) {
            updateAppTheme(matchedTheme);
        }

        const category = e.target.closest('.skill-category');
        if (category) {
            const chipsContainer = category.querySelector('.skill-chips');
            let existingDetail = category.querySelector('.skill-detail');
            const skillName = e.target.innerText.trim();

            if (existingDetail) { // Toggle logic
                const wasSameNode = existingDetail.dataset.skill === skillName;
                existingDetail.remove();
                if (wasSameNode) {
                    // Revert background correctly if toggled off
                    let catTheme = 'bg-tools';
                    if (category.classList.contains('cloud')) catTheme = 'bg-cloud';
                    else if (category.classList.contains('devops')) catTheme = 'bg-devops';
                    else if (category.classList.contains('ai')) catTheme = 'bg-ai';
                    else if (category.classList.contains('auto')) catTheme = 'bg-automation';
                    updateAppTheme(catTheme);
                    return;
                }
            }

            let detail = document.createElement('div');
            detail.className = 'skill-detail';
            detail.dataset.skill = skillName;
            detail.innerText = skillDescriptions[skillName] || `Experience with ${skillName}.`;
            chipsContainer.insertAdjacentElement('afterend', detail);
        }
    });
});

// Skills Expansion and Dynamic Backgrounds
function expandSkill(category, element) {
    const allSkills = document.querySelectorAll('.skill-category');

    if (element.classList.contains('expanded')) {
        element.classList.remove('expanded');
        updateAppTheme(''); // revert background
        // remove tooltip if any
        let detail = element.querySelector('.skill-detail');
        if (detail) detail.remove();
        return;
    }

    allSkills.forEach(skill => {
        skill.classList.remove('expanded');
        let detail = skill.querySelector('.skill-detail');
        if (detail) detail.remove();
    });
    element.classList.add('expanded');

    // Set background
    updateAppTheme('bg-' + category);
}

function filterProjectsAndScroll(filter, event) {
    if (event) event.stopPropagation();

    // Find the filter button
    const btn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
    if (btn) {
        btn.click();
    } else {
        // Fallback to all if category doesn't have a specific filter yet
        const allBtn = document.querySelector(`.filter-btn[data-filter="all"]`);
        if (allBtn) allBtn.click();
    }

    // Scroll to projects section
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Reset background when reaching home
window.addEventListener('scroll', () => {
    let top = window.scrollY;
    // If user scrolled back near the top, reset the background and collapse skills
    if (top < 400 && document.body.className.includes('bg-')) {
        updateAppTheme('');
        document.querySelectorAll('.skill-category').forEach(skill => skill.classList.remove('expanded'));
    }
});

// --- Dynamic Background Icons Physics System ---
const bgContainer = document.getElementById('bgAnimationContainer');
const dynamicIconMap = {
    'cloud': ['bx-cloud', 'bx-server', 'bx-data', 'bx-upload', 'bx-wifi'],
    'devops': ['bx-git-branch', 'bx-terminal', 'bxl-docker', 'bx-code-block', 'bx-cog'],
    'ai': ['bx-brain', 'bx-network-chart', 'bx-bot', 'bx-microchip', 'bx-line-chart'],
    'automation': ['bx-cog', 'bx-task', 'bx-sync', 'bx-time-five', 'bx-analyse'],
    'all': ['bx-cloud', 'bx-server', 'bx-git-branch', 'bx-terminal', 'bx-brain', 'bx-cog', 'bx-bot', 'bx-code-block', 'bx-data', 'bx-task']
};

let particles = [];
let animFrameId = null;
let mouseX = -9999, mouseY = -9999;
const PARTICLE_COUNT = 22;
const REPEL_RADIUS = 140;
const REPEL_FORCE = 5;
const BASE_SPEED = 0.15;

// Mouse / touch tracking
document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
document.addEventListener('touchmove', e => {
    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
}, { passive: true });
document.addEventListener('click', e => {
    // Extra push on click
    mouseX = e.clientX;
    mouseY = e.clientY;
    particles.forEach(p => applyRepulsion(p, e.clientX, e.clientY, REPEL_FORCE * 4));
});

function applyRepulsion(p, mx, my, force) {
    const dx = p.x - mx;
    const dy = p.y - my;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < REPEL_RADIUS && dist > 0) {
        const strength = (1 - dist / REPEL_RADIUS) * force;
        p.vx += (dx / dist) * strength;
        p.vy += (dy / dist) * strength;
    }
}

function createParticle(icons, el) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    return {
        el,
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(BASE_SPEED + Math.random() * 1.2),  // flow upward
        size: Math.random() * 6 + 4  // 4rem to 10rem
    };
}

function updateAppTheme(themeClass) {
    document.body.className = themeClass;
    // If clearing theme, revert to default 'all' icons not empty
    setDynamicBackground(themeClass || 'bg-all');
}

function setDynamicBackground(themeClass) {
    // Stop existing animation
    if (animFrameId) cancelAnimationFrame(animFrameId);
    if (bgContainer) bgContainer.innerHTML = '';
    particles = [];

    if (!themeClass || !themeClass.startsWith('bg-')) return;

    const themeStr = themeClass.replace('bg-', '');
    const icons = dynamicIconMap[themeStr];
    if (!icons || !bgContainer) return;

    // Create the particle pool
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const iconClass = icons[i % icons.length];
        const el = document.createElement('i');
        el.className = `bx ${iconClass} floating-icon`;
        el.style.position = 'absolute';
        el.style.transition = 'none';
        el.style.animation = 'none'; // override CSS animation, JS controls position
        bgContainer.appendChild(el);
        const p = createParticle(icons, el);
        el.style.fontSize = `${p.size}rem`;
        el.style.left = `${p.x}px`;
        el.style.top = `${p.y}px`;
        particles.push(p);
    }

    animateBg();
}

function animateBg() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const friction = 0.92;

    particles.forEach(p => {
        // Apply mouse repulsion each frame
        applyRepulsion(p, mouseX, mouseY, REPEL_FORCE * 0.3);

        // Apply friction to velocity drift
        p.vx *= friction;
        p.vy = p.vy * friction + (-(BASE_SPEED + 0.2)); // always drift upward

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.y < -p.size * 16) p.y = h + p.size * 8;
        if (p.x < -p.size * 16) p.x = w + p.size * 8;
        if (p.x > w + p.size * 16) p.x = -p.size * 8;

        // Apply to DOM
        p.el.style.left = `${p.x}px`;
        p.el.style.top = `${p.y}px`;
    });

    animFrameId = requestAnimationFrame(animateBg);
}

// Auto-start symbols on page load across the whole portfolio
setDynamicBackground('bg-all');

/* =========================================================
   AI CHATBOT WIDGET — Powered by Google Gemini
   ========================================================= */

(function () {
    // ── Groq Config ───────────────────────────────────────
    const GROQ_API_KEY = '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';
    const GROQ_MODEL = 'llama-3.1-8b-instant';
    const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

    // System Prompt — Naveen's digital twin persona
    const SYSTEM_PROMPT = `You are an AI assistant and digital twin built to represent Naveen Veeramreddy. You chat like a real human — friendly, natural, and conversational. Always speak from Naveen's perspective using "I", "my", "me".

AI IDENTITY RULE:
- If someone directly asks "are you an AI?", "is this a bot?", "am I talking to a real person?", answer honestly.
  Example: "Yes, I'm an AI assistant built to represent Naveen. But I can tell you everything about him — just ask!"
- Do NOT randomly volunteer that you are an AI. Only say it if directly asked.
- Always continue the conversation naturally after disclosing.

CURSING / ABUSIVE MESSAGE RULE:
- If a user sends a curse word, insult, or abusive message, do NOT respond with hostility or lecture them.
- Instead, respond calmly and with genuine empathy. Ask if something went wrong or if you said something to upset them.
  Example: "Hey, did I say something wrong? Just let me know and I'll do my best to help."
  Example: "Seems like something's bothering you. Is everything okay?"
- Keep the tone warm, not defensive.

CONVERSATION BEHAVIOR RULES:

1. Keep responses short and natural. Do not give long paragraphs unless the user asks for details.

2. If a user greets with "hi", "hello", or similar, reply briefly.
   Example — User: "hi" → Reply: "Hello. How can I help you?"

3. If a user says they are looking for a job or asks "I want a job":
   Respond briefly. Say you are also a fresher looking for your first opportunity. Do NOT send any meeting link.
   Example: "I'm currently a fresher and looking for my first opportunity in Cloud, DevOps, or Automation."

4. Only share the meeting link if someone clearly shows interest in hiring me, offering a role, or discussing an opportunity.

5. If someone says they want to hire me or discuss an opportunity, ask them for these details before sending the link:
   - Name
   - Company name
   - Job role
   - Contact email
   Example: "Thank you for the opportunity. Could you please share your name, company name, role, and contact email so we can schedule a discussion?"

6. After they provide all four details (name, company, role, email), do TWO things:
   a) Respond with: "Thank you for sharing the details. I'll get in touch soon. You can also schedule a meeting here: https://calendly.com/naveenveeramreddy181668/new-meeting"
   b) At the very end of your response, on a NEW LINE, append exactly this marker with the REAL values the user gave you:
   [FORM_SUBMISSION:{"name":"ACTUAL_NAME","company":"ACTUAL_COMPANY","role":"ACTUAL_ROLE","email":"ACTUAL_EMAIL"}]

   CRITICAL RULES FOR THE MARKER:
   - ONLY emit the marker AFTER the user has given you their real name, company, role, and email in their message.
   - DO NOT emit the marker when you are ASKING for the details. If you are asking a question, do NOT include the marker at all.
   - Replace ACTUAL_NAME, ACTUAL_COMPANY, ACTUAL_ROLE, ACTUAL_EMAIL with the real values from the user's message.
   - WRONG (do not do this): Emitting the marker when you first ask for details.
   - CORRECT: Only emit the marker in the reply AFTER the user has responded with their real information.

7. Never add unnecessary explanations. Always give only the required information.

8. Do not introduce yourself unless the user explicitly asks about you.

9. Do not use emojis unless truly needed.

10. NEVER say you are an AI, a bot, or an assistant. Always use "I", "my", "me".

YOUR IDENTITY:
- Full Name: Veeramreddy Venkata Naveen
- Status: Recent B.Tech graduate, actively looking for my first job opportunity
- Target Roles: Cloud Engineer, DevOps Engineer, Automation Engineer
- Education: B.Tech Electronics & Communication Engineering, Pragati Engineering College, CGPA: 7.7 (2021-2025)
- Intermediate: FIITJEE, Marks: 888/1000 (2019-2021)
- Class 10: SASI, CGPA: 9.8 (2018-2019)
- Email: naveenveeramreddy181668@gmail.com
- Phone: +91 9347980893
- LinkedIn: https://www.linkedin.com/in/naveen-veeramreddy/
- GitHub: https://github.com/Naveenveeramreddy
- Schedule Meeting: https://calendly.com/naveenveeramreddy181668/new-meeting

MY SKILLS:
- Cloud (AWS): EC2, VPC, IAM, S3, Route 53, CloudFront, WAF, RDS
- DevOps: Terraform, Docker, GitHub Actions
- Languages: Python, SQL
- Automation: Automation Anywhere, N8N
- AI & LLM: LangChain, MCP Servers

MY PROJECTS:
1. MCP Multi-Server AI Integration System — AI agent integrating MongoDB, Elasticsearch & Weather API for intelligent workflows.
2. Multi-Environment DevOps Deployment — Automated CI/CD pipelines using AWS & GitHub Actions.
3. Web Data Extraction Automation — Automation Anywhere bot extracting dynamic web data to CSV.

MY CERTIFICATIONS:
- AWS Cloud Practitioner Essentials — Amazon Web Services
- Automation Anywhere Essentials — Automation Anywhere
- Introduction to Model Context Protocol — Anthropic

ABOUT EXPERIENCE:
I am a fresher with strong project-based knowledge and hands-on practice. I do not have professional work experience yet, but I have built real projects that demonstrate my skills in cloud, DevOps, and automation.

PORTFOLIO NAVIGATION RULES:
When a user asks about a specific section of my portfolio, include a [NAVIGATE:section] marker at the very end of your reply (on a new line).

For GENERAL section navigation:
- User asks about skills in general, tech stack overview → [NAVIGATE:skills]
- User asks about projects in general, what I built → [NAVIGATE:projects]
- User asks about services, what I offer, freelance → [NAVIGATE:services]
- User asks about education, background, college → [NAVIGATE:education]
- User asks about certifications, achievements, awards → [NAVIGATE:certificates]
- User asks about GitHub, activity, code, terminal → [NAVIGATE:github]
- User asks about contact, email, phone, reach out → [NAVIGATE:contact]

For SPECIFIC SKILL navigation (use skill:category format):
- User asks about AWS, EC2, VPC, S3, IAM, RDS, Route53, CloudFront, WAF, cloud → [NAVIGATE:skill:cloud]
- User asks about Docker, Kubernetes, Terraform, GitHub Actions, CI/CD, DevOps, pipelines → [NAVIGATE:skill:devops]
- User asks about Automation Anywhere, N8N, RPA, bots, automation → [NAVIGATE:skill:automation]
- User asks about LangChain, MCP, AI, LLM, Agentic AI, machine learning → [NAVIGATE:skill:ai]
- User asks about Python, SQL, databases, MongoDB, Elasticsearch → [NAVIGATE:skill:code]

When a specific skill is mentioned, ALWAYS use the skill:category format instead of the general [NAVIGATE:skills].
Do NOT include any [NAVIGATE:] marker for greetings, job-related conversations, or general questions.
Only ONE [NAVIGATE:] marker per reply. It must be on its own line at the very end.

IMPORTANT: Only share information listed above. Do not make anything up. If asked something unrelated to tech or my background, politely redirect.`;

    // ── DOM Elements ──────────────────────────────────────
    const toggle = document.getElementById('chatbotToggle');
    const chatWindow = document.getElementById('chatbotWindow');
    const closeBtn = document.getElementById('chatbotClose');
    const messagesEl = document.getElementById('chatbotMessages');
    const inputEl = document.getElementById('chatbotInput');
    const sendBtn = document.getElementById('chatbotSend');
    const badge = document.getElementById('chatbotBadge');
    const toggleIcon = document.getElementById('chatbotToggleIcon');
    let isOpen = false;
    let greeted = false;
    let isBusy = false;

    // Multi-turn conversation history (OpenAI format)
    const conversationHistory = [];

    // ── Groq API Call ─────────────────────────────────────
    async function askGroq(userMessage) {
        conversationHistory.push({ role: 'user', content: userMessage });

        const payload = {
            model: GROQ_MODEL,
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...conversationHistory
            ],
            temperature: 0.75,
            max_tokens: 450
        };

        const res = await fetch(GROQ_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.error?.message || `HTTP ${res.status}`);
        }

        const data = await res.json();
        const botText = data.choices?.[0]?.message?.content
            || "Sorry, I couldn't generate a response right now. Please try again.";

        conversationHistory.push({ role: 'assistant', content: botText });
        return botText;
    }

    // ── Message Rendering ─────────────────────────────────
    function addMessage(text, sender = 'bot') {
        const msg = document.createElement('div');
        msg.className = `chat-msg ${sender}`;

        // Lightly format markdown bold/italic and preserve newlines
        const formatted = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');

        if (sender === 'bot') {
            msg.innerHTML = `
                <div class="chat-msg-avatar"><i class='bx bx-bot'></i></div>
                <div class="chat-msg-bubble">${formatted}</div>`;
        } else {
            msg.innerHTML = `<div class="chat-msg-bubble">${text}</div>`;
        }

        messagesEl.appendChild(msg);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function showTyping() {
        const row = document.createElement('div');
        row.className = 'chat-msg bot';
        row.id = 'typingRow';
        row.innerHTML = `
            <div class="chat-msg-avatar"><i class='bx bx-bot'></i></div>
            <div class="typing-indicator">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>`;
        messagesEl.appendChild(row);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function removeTyping() {
        const el = document.getElementById('typingRow');
        if (el) el.remove();
    }

    function setInputDisabled(disabled) {
        inputEl.disabled = disabled;
        sendBtn.disabled = disabled;
        inputEl.placeholder = disabled ? 'Naveen is typing...' : 'Ask me anything...';
        isBusy = disabled;
    }

    // ── Send Message Flow ─────────────────────────────────
    async function sendMessage(text) {
        text = (text || '').trim();
        if (!text || isBusy) return;

        addMessage(text, 'user');
        inputEl.value = '';
        setInputDisabled(true);
        showTyping();

        try {
            const reply = await askGroq(text);
            removeTyping();

            // ── Auto-submit contact form if FORM_SUBMISSION marker detected ──
            const markerMatch = reply.match(/\[FORM_SUBMISSION:(\{.*?\})\]/s);
            const cleanReply = reply.replace(/\[FORM_SUBMISSION:\{.*?\}\]/s, '').trim();

            // ── Portfolio Navigation from Chatbot ────────────────────────────
            // Matches both [NAVIGATE:section] and [NAVIGATE:skill:category]
            const navMatch = cleanReply.match(/\[NAVIGATE:([a-z]+)(?::([a-z]+))?\]/i);
            const displayReply = cleanReply.replace(/\[NAVIGATE:[a-z:]+\]/gi, '').trim();

            addMessage(displayReply, 'bot');

            if (navMatch) {
                const navType = navMatch[1].toLowerCase();   // e.g. 'skills', 'projects', 'skill'
                const navSub = navMatch[2]?.toLowerCase();  // e.g. 'cloud', 'devops', 'ai'

                setTimeout(() => {
                    if (navType === 'skill' && navSub) {
                        // ── Specific skill: expand skill card + filter projects ──
                        const skillsSection = document.getElementById('skills');
                        if (skillsSection) skillsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

                        setTimeout(() => {
                            // Find the skill category card that matches, click to expand it
                            const allSkillCards = document.querySelectorAll('.skill-category');
                            allSkillCards.forEach(card => {
                                const onclickAttr = card.getAttribute('onclick') || '';
                                if (onclickAttr.includes(`'${navSub}'`)) {
                                    // Collapse any expanded ones first
                                    document.querySelectorAll('.skill-category.expanded').forEach(e => e.classList.remove('expanded'));
                                    card.classList.add('expanded');
                                    // Glow the expanded card
                                    card.style.boxShadow = '0 0 30px rgba(0,255,157,0.4)';
                                    setTimeout(() => { card.style.boxShadow = ''; }, 2500);
                                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    updateAppTheme('bg-' + navSub);
                                }
                            });

                            // After 1.5s, filter projects and scroll to them
                            setTimeout(() => {
                                const filterMap = { code: 'all' }; // 'code' has no specific filter, use all
                                const filterVal = filterMap[navSub] || navSub;
                                const filterBtn = document.querySelector(`.filter-btn[data-filter="${filterVal}"]`);
                                if (filterBtn) filterBtn.click();
                                const projectsSection = document.getElementById('projects');
                                if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }, 1500);

                        }, 600);

                    } else {
                        // ── General section navigation ──
                        const section = document.getElementById(navType);
                        if (section) {
                            section.scrollIntoView({ behavior: 'smooth', block: 'start' });

                            if (navType === 'projects') {
                                const showMoreBtn = document.getElementById('showMoreProjectsBtn');
                                if (showMoreBtn && !showingAllProjects) showMoreBtn.click();
                            }
                            if (navType === 'skills') {
                                document.querySelectorAll('.skill-category').forEach(el => {
                                    el.style.transition = 'border-color 0.5s ease';
                                    el.style.borderColor = 'var(--main-color)';
                                    setTimeout(() => { el.style.borderColor = ''; }, 2000);
                                });
                            }
                            if (navType === 'certificates') {
                                document.querySelectorAll('.education-content .content').forEach(el => {
                                    el.style.transition = 'box-shadow 0.5s ease';
                                    el.style.boxShadow = '0 0 12px rgba(0,255,157,0.4)';
                                    setTimeout(() => { el.style.boxShadow = ''; }, 2500);
                                });
                            }
                        }
                    }
                }, 400);
            }

            if (markerMatch) {
                try {
                    const details = JSON.parse(markerMatch[1]);

                    // Guard: reject if any field still has placeholder/empty values
                    const isPlaceholder = (v) => !v || v.startsWith('<') || v.includes('ACTUAL_') || v.trim() === '';
                    if (isPlaceholder(details.name) || isPlaceholder(details.email) ||
                        isPlaceholder(details.company) || isPlaceholder(details.role)) {
                        console.warn('Form submission skipped — placeholder values detected.');
                    } else {
                        const formData = new FormData();
                        formData.append('access_key', '49b9eb07-81b5-4048-8cef-cb150d661e48');
                        formData.append('name', details.name);
                        formData.append('email', details.email);
                        formData.append('subject', `Job Opportunity from ${details.company}`);
                        formData.append('message',
                            `Hi Naveen,\n\nA recruiter reached out via your portfolio chatbot.\n\nName: ${details.name}\nCompany: ${details.company}\nRole: ${details.role}\nEmail: ${details.email}\n\nThey are interested in discussing an opportunity with you.`);

                        const subRes = await fetch('https://api.web3forms.com/submit', {
                            method: 'POST',
                            body: formData
                        });
                        if (subRes.ok) {
                            setTimeout(() => {
                                addMessage('Your details have been sent to Naveen. He will reach out to you soon.', 'bot');
                            }, 600);
                        }
                    }
                } catch (parseErr) {
                    console.warn('Form auto-submit parse error:', parseErr);
                }
            }
        } catch (err) {
            removeTyping();
            addMessage(`Something went wrong. Please try again in a moment.`, 'bot');
            conversationHistory.pop();
        } finally {
            setInputDisabled(false);
            inputEl.focus();
        }
    }

    // ── Open / Close ──────────────────────────────────────
    function openChat() {
        chatWindow.classList.add('open');
        toggle.classList.add('open');
        toggleIcon.className = 'bx bx-x';
        badge.classList.add('hidden');
        isOpen = true;

        if (!greeted) {
            greeted = true;
            setTimeout(() => {
                addMessage(`Hi! How can I help you?`);
            }, 300);
        } else {
            inputEl.focus();
        }
    }

    function closeChat() {
        chatWindow.classList.remove('open');
        toggle.classList.remove('open');
        toggleIcon.className = 'bx bx-bot';
        isOpen = false;
    }

    // ── Event Listeners ───────────────────────────────────
    toggle.addEventListener('click', () => isOpen ? closeChat() : openChat());
    closeBtn.addEventListener('click', closeChat);

    sendBtn.addEventListener('click', () => sendMessage(inputEl.value));

    inputEl.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(inputEl.value);
        }
    });


})();
