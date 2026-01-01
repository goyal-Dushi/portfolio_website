interface Skill { name: string; imgSrc: string; }
interface Course { id: number; name: string; imgSrc: string; }
interface Extra { id: number; name: string; imgSrc: string; }
interface Tech { src: string; title: string; }
interface Project { id: number; heading: string; date: string; description: string; imgSrc: string; tech: Tech[]; linkTo: string; }

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
        const res = await fetch('/api/data/skills');
        const skills: Skill[] = await res.json();
        
        if (!Array.isArray(skills)) {
             console.error('Skills data is not an array:', skills);
             return;
        }
        
        container.innerHTML = skills.map(skill => `
            <div class="skill-item-wrapper">
                <div class="skill-badge glow-effect">
                    <div class="icon-wrapper">
                        <img src="${skill.imgSrc}" alt="${skill.name}">
                    </div>
                </div>
                <span>${skill.name}</span>
            </div>
        `).join('');
    } catch(e) { console.error(e); }
}

async function loadProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    try {
        const res = await fetch('/api/data/projects');
        const json = await res.json();
        const projects: Project[] = json.projects || json;

        if (!Array.isArray(projects)) {
             console.error('Projects data is not an array:', projects);
             return;
        }

        grid.innerHTML = projects.map(proj => `
            <div class="project-card">
                <div class="card-image">
                    <img src="${proj.imgSrc}" alt="${proj.heading}" loading="lazy">
                </div>
                <h3>${proj.heading}</h3>
                <p class="project-date" style="font-size:0.9rem; color:var(--secondary-color); margin-bottom:0.5rem;">${proj.date}</p>
                <p class="project-desc" style="font-size:0.9rem; margin-bottom:1rem; opacity:0.9; flex-grow:1;">${proj.description}</p>
                
                <div class="tech-stack" style="display:flex; justify-content:center; gap:10px; margin-bottom:1rem;">
                    ${proj.tech.map(t => `
                        <div class="tech-badge" title="${t.title}" style="width:30px; height:30px; border-radius:50%; background:rgba(255,255,255,0.1); padding:4px; display:flex; align-items:center; justify-content:center; cursor:help;">
                            <img src="${t.src}" alt="${t.title}" style="width:100%; height:100%; object-fit:contain;">
                        </div>
                    `).join('')}
                </div>

                <a href="${proj.linkTo}" target="_blank" class="details-btn">View Project</a>
            </div>
        `).join('');
    } catch(e) { console.error(e); }
}

async function loadCourses() {
    const grid = document.getElementById('courses-grid');
    if (!grid) return;

    try {
        const res = await fetch('/api/data/courses');
        const data = await res.json();
        const courses: Course[] = data.courseData || data; // Handle both wrapped and direct array

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
                    <img src="${course.imgSrc}" alt="${course.name}" loading="lazy">
                </div>
                <h3>${course.name}</h3>
                <button class="details-btn">View Details</button>
            </div>
        `).join('');
    } catch(e) { console.error(e); }
}

async function loadExtras() {
    const grid = document.getElementById('extras-grid');
    if (!grid) return;

    try {
        const res = await fetch('/api/data/extras');
        const extras: Extra[] = await res.json();

        if (!Array.isArray(extras)) {
             console.error('Extras data is not an array:', extras);
             return;
        }

        grid.innerHTML = extras.map(extra => `
            <div class="project-card">
                <div class="card-image">
                    <img src="${extra.imgSrc}" alt="${extra.name}" loading="lazy">
                </div>
                <h3>${extra.name}</h3>
                <button class="details-btn mobile-hidden" onclick="event.stopPropagation(); openModal('extra', ${extra.id})">View</button>
            </div>
        `).join('');
    } catch(e) { console.error(e); }
}
