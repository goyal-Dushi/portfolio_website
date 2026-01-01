export interface ModalData {
    name: string;
    imgSrc: string;
    issuedBy?: string;
    badges?: string[];
    tasksLearned?: string[];
    source?: string;
}

export function initModals() {
    const modal = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.modal-close');

    if (!modal || !modalBody) return;

    // Expose openModal globally
    (window as any).openModal = async (type: string, id: number) => {
        let data: ModalData | undefined;

        try {
            if (type === 'course') {
                const res = await fetch('/api/data/courses');
                const json = await res.json();
                // Fix: Access courseData if it exists
                const list = json.courseData || json;
                data = list.find((i: any) => i.id === id);
            } else if (type === 'extra') {
                const res = await fetch('/api/data/extras');
                const json = await res.json();
                // Fix: Access extraData/extras if it exists, matching dataLoader pattern if it changes
                const list = json.extraData || json.extras || json; 
                data = list.find((i: any) => i.id === id);
            }
        } catch (e) {
            console.error("Failed to fetch modal data", e);
        }

        if (data) {
            renderModalContent(modalBody, data, type);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    };

    // Close Events
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    function closeModal() {
        modal?.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Global Zoom State
let zoomLevel = 1;

function renderModalContent(container: HTMLElement, data: ModalData, type: string) {
    zoomLevel = 1; // Reset zoom
    
    // Zoom Controls HTML (Mobile Hidden via CSS class 'desktop-only-flex')
    const zoomControls = `
        <div class="zoom-controls desktop-only-flex" style="position: absolute; top: 10px; right: 10px; z-index: 20; display:flex; gap:5px;">
            <button onclick="event.stopPropagation(); changeZoom(0.2)" style="background:rgba(0,0,0,0.6); border:1px solid var(--glass-border); color:white; font-size:1.2rem; width:35px; height:35px; border-radius:50%; cursor:pointer; display:flex; justify-content:center; align-items:center;">+</button>
            <button onclick="event.stopPropagation(); changeZoom(-0.2)" style="background:rgba(0,0,0,0.6); border:1px solid var(--glass-border); color:white; font-size:1.2rem; width:35px; height:35px; border-radius:50%; cursor:pointer; display:flex; justify-content:center; align-items:center;">-</button>
        </div>
    `;
    
    // Expose changeZoom globally
    (window as any).changeZoom = (delta: number) => {
        const img = document.getElementById('modal-img');
        const viewport = document.querySelector('.zoom-viewport') as HTMLElement;
        
        if(img && viewport) {
            zoomLevel += delta;
            
            // Constraints
            if(zoomLevel < 1) zoomLevel = 1; 
            if(zoomLevel > 3) zoomLevel = 3;
            
            if (zoomLevel === 1) {
                // Reset to default fit
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.maxWidth = '100%';
                img.style.maxHeight = '100%';
                img.style.objectFit = 'contain';
                
                // Re-enable Flex centering for perfect fit
                viewport.style.display = 'flex';
                viewport.style.justifyContent = 'center';
                viewport.style.alignItems = 'center';
            } else {
                // Apply Zoom
                img.style.width = `${zoomLevel * 100}%`;
                img.style.height = 'auto'; 
                img.style.maxWidth = 'none'; 
                img.style.maxHeight = 'none'; 
                img.style.objectFit = 'contain';
                
                // Disable Flex centering to allow natural scroll expansion
                viewport.style.display = 'block';
                viewport.style.justifyContent = 'unset';
                viewport.style.alignItems = 'unset';
            }
        }
    };

    // Image Wrapper
    const imageHtml = `
        <div class="modal-image-container" style="position:relative; width:100%; height:400px; background:#000; overflow:hidden; border-radius:8px; margin-bottom:1rem;">
            ${zoomControls}
            <div class="zoom-viewport" style="width:100%; height:100%; overflow:auto; display:flex; justify-content:center; align-items:center;">
                <img id="modal-img" src="${data.imgSrc}" alt="${data.name}" style="width:100%; height:100%; object-fit:contain; transition: width 0.2s ease;">
            </div>
        </div>
    `;

    // Content based on Type
    let detailsHtml = '';
    if (type !== 'extra') {
         // Use Badges for "Skills Gained"
         // Use Tasks for "Description" list
         detailsHtml = `
            <div class="modal-details">
                <h3 style="margin-bottom:0.5rem; color:var(--primary-color)">Skills Gained:</h3>
                <div class="modal-badges" style="margin-bottom:1rem;">
                    ${data.badges?.map(b => `<span class="badge" style="display:inline-block; background:rgba(255,255,255,0.1); padding:4px 10px; border-radius:12px; margin-right:5px; margin-bottom:5px; font-size:0.85rem;">${b}</span>`).join('') || ''}
                </div>

                <h3 style="margin-bottom:0.5rem; color:var(--primary-color)">Description:</h3>
                <ul class="skills-list" style="padding-left:1.2rem; margin-bottom:1.5rem;">
                    ${(data.tasksLearned || (data as any).tasks || []).map((t: string) => `<li>${t}</li>`).join('')}
                </ul>
                
                ${data.source ? `
                <div class="modal-actions">
                    <a href="${data.source}" target="_blank" class="view-cert-btn">View Certificate</a>
                </div>` : ''}
            </div>
         `;
    }

    container.innerHTML = `
        <div class="modal-inner">
            <h2 class="modal-title">${data.name}</h2>
            ${imageHtml}
            ${detailsHtml}
        </div>
    `;
}
