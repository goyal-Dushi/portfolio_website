interface Skill { name: string; imgSrc: string; }
interface Course { id: number; name: string; imgSrc: string; }
interface Extra { id: number; name: string; imgSrc: string; }
interface Tech { src: string; title: string; }
interface Project { id: number; problem?: string; heading: string; date: string; description: string; imgSrc: string; tech: Tech[]; linkTo: string; }

export async function initDataLoader() {
    try {
        await Promise.all([
            loadSkills(),
            loadProjects(),
            loadCourses(),
            loadExtras()
        ]);
    } catch (error) {
        console.error("Data loading failed", error);
    }
}

async function loadSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;

    try {
        const res = await fetch('/api/data/skills').then((res) => res.json());
        const skills: Skill[] = res.skills || res;

        if (!Array.isArray(skills)) {
            console.error('Skills data is not an array:', skills);
            return;
        }

        container.innerHTML = skills.map(skill => `
            <div class="skill-item-wrapper">
                <div class="skill-badge glow-effect">
                    <div class="icon-wrapper">
                        <img loading="lazy" src="${skill.imgSrc}"  alt="${skill.name}">
                    </div>
                </div>
                <span>${skill.name}</span>
            </div>
        `).join('');
    } catch (e) { console.error(e); }
}


async function loadProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    try {
        const res = await fetch('/api/data/projects').then((res) => res.json());
        const projects: Project[] = (res.projects || res).reverse();

        if (!Array.isArray(projects)) {
            console.error('Projects data is not an array:', projects);
            return;
        }

        grid.innerHTML = projects.map(proj => `
            <div class="project-card">
                <div class="card-image">
                    <img loading="lazy" src="${proj.imgSrc}" alt="${proj.heading}" loading="lazy">
                </div>
                <h3>${proj.heading}</h3>
                <p class="project-date">${proj.date}</p>
                
                ${proj.problem ? `
                <div class="project-problem">
                    <strong>Problem:</strong>
                    <span class="problem-text">${proj.problem}</span>
                    <span class="read-more-btn">... Read More</span>
                </div>
                ` : ''}

                <div class="project-solution">
                    ${proj?.problem?.length ? '<strong>Solution:</strong>' : ''}
                    <span class="problem-text">${proj.description}</span>
                    ${proj.description.length > 100 ? (
                '<span class="read-more-btn">... Read More</span>'
            ) : ''}
                </div>
                
                <div class="tech-stack">
                    ${proj.tech.map(t => `
                        <div class="tech-badge" title="${t.title}">
                            <img src="${t.src}" alt="${t.title}">
                        </div>
                    `).join('')}
                </div>

                <a href="${proj.linkTo}" target="_blank" class="details-btn">View Project</a>
            </div>
        `).join('');

        // Attach listeners for "Read More"
        grid.querySelectorAll('.read-more-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const problemText = target.previousElementSibling as HTMLElement;
                const isExpanded = problemText.classList.toggle('expanded');
                target.innerText = isExpanded ? ' Show Less' : '... Read More';
            });
        });
    } catch (e) { console.error(e); }
}

async function loadCourses() {
    const grid = document.getElementById('courses-grid');
    if (!grid) return;

    try {
        const res = await fetch('/api/data/courses').then((res) => res.json());
        const courses: Course[] = res.courseData || res; // Handle both wrapped and direct array

        if (!Array.isArray(courses)) {
            console.error('Courses data is not an array:', courses);
            return;
        }

        if (courses.length === 0) {
            grid.innerHTML = '<p style="text-align:center; width:100%;">No certifications loaded.</p>';
            return;
        }

        grid.innerHTML = courses.map(course => `
            <div class="project-card" onclick="openModal('course', ${course.id})">
                <div class="card-image">
                    <img loading="lazy" src="${course.imgSrc}" alt="${course.name}" loading="lazy">
                </div>
                <h3>${course.name}</h3>
                <button class="details-btn">View Details</button>
            </div>
        `).join('');
    } catch (e) { console.error(e); }
}

async function loadExtras() {
    const grid = document.getElementById('extras-grid');
    if (!grid) return;

    try {
        const res = await fetch('/api/data/extras').then((res) => res.json());
        const extras: Extra[] = res.extras || res;

        if (!Array.isArray(extras)) {
            console.error('Extras data is not an array:', extras);
            return;
        }

        grid.innerHTML = extras.map(extra => `
            <div class="project-card">
                <div class="card-image">
                    <img loading="lazy" decoding="async" src="${extra.imgSrc}" alt="${extra.name}" loading="lazy">
                </div>
                <h3>${extra.name}</h3>
                <button class="details-btn mobile-hidden" onclick="event.stopPropagation(); openModal('extra', ${extra.id})">View</button>
            </div>
        `).join('');
    } catch (e) { console.error(e); }
}
