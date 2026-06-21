// ============================================
// TRUSTHUB - Citizen Dashboard
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ---------- Tab Navigation ----------
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const tabContents = {
        dashboard: document.getElementById('tab-dashboard'),
        documents: document.getElementById('tab-documents'),
        verifications: document.getElementById('tab-verifications'),
        sharing: document.getElementById('tab-sharing'),
        trust: document.getElementById('tab-trust')
    };
    
    const pageTitles = {
        dashboard: ['My Dashboard', 'Manage your verified identity'],
        documents: ['My Documents', 'Upload and manage your verified documents'],
        verifications: ['Verification History', 'Track your verification requests'],
        sharing: ['Data Sharing', 'Control who has access to your data'],
        trust: ['Trust Score', 'Your verified trust score and reputation']
    };
    
    function switchTab(tabId) {
        sidebarItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.tab === tabId) {
                item.classList.add('active');
            }
        });
        
        Object.keys(tabContents).forEach(key => {
            if (tabContents[key]) {
                tabContents[key].classList.add('hidden');
            }
        });
        if (tabContents[tabId]) {
            tabContents[tabId].classList.remove('hidden');
        }
        
        const title = pageTitles[tabId] || ['Page', ''];
        document.getElementById('pageTitle').textContent = title[0];
        document.getElementById('pageSubtitle').textContent = title[1];
    }
    
    sidebarItems.forEach(item => {
        item.addEventListener('click', function() {
            const tab = this.dataset.tab;
            if (tab) switchTab(tab);
        });
    });

    // ---------- Document Upload ----------
    const uploadZone = document.querySelector('.border-dashed');
    if (uploadZone) {
        uploadZone.addEventListener('click', function(e) {
            if (e.target.closest('button')) return;
            // Simulate file upload
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.pdf,.jpg,.png,.jpeg';
            input.multiple = true;
            input.onchange = function(e) {
                const files = this.files;
                if (files.length > 0) {
                    alert(`📎 ${files.length} document(s) uploaded successfully!\nThey will be reviewed by our verification team.`);
                    // Add to document list
                    const docList = document.querySelector('#tab-documents .divide-y');
                    if (docList) {
                        const newDoc = document.createElement('div');
                        newDoc.className = 'px-6 py-4 flex items-center justify-between';
                        newDoc.innerHTML = `
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600"><i class="fas fa-file"></i></div>
                                <div>
                                    <p class="font-medium text-slate-800">${files[0].name}</p>
                                    <p class="text-xs text-slate-400">Pending verification • Just now</p>
                                </div>
                            </div>
                            <span class="badge badge-warning"><i class="fas fa-spinner fa-spin mr-1"></i> Pending</span>
                        `;
                        docList.prepend(newDoc);
                    }
                }
            };
            input.click();
        });
    }

    // ---------- Share/Revoke Access ----------
    document.querySelectorAll('#tab-sharing button:contains("Revoke")').forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Revoke access for this institution?')) {
                this.closest('.border').style.opacity = '0.4';
                this.textContent = 'Revoked';
                this.classList.add('bg-slate-200', 'text-slate-500');
                this.classList.remove('text-red-600', 'hover:text-red-700');
                alert('🔒 Access revoked successfully.');
            }
        });
    });

    // ---------- Document Verification Status ----------
    document.querySelectorAll('#tab-documents .badge-warning').forEach(badge => {
        // Simulate verification after 5 seconds (demo)
        setTimeout(() => {
            if (badge.textContent.includes('Pending')) {
                badge.className = 'badge badge-success';
                badge.innerHTML = '<i class="fas fa-check-circle mr-1"></i> Verified';
                const parent = badge.closest('.flex');
                if (parent) {
                    const statusText = parent.querySelector('.text-xs.text-slate-400');
                    if (statusText) {
                        statusText.textContent = 'Verified • Just now';
                    }
                }
            }
        }, 3000 + Math.random() * 4000);
    });

    // ---------- Trust Score Animation ----------
    const trustScore = document.querySelector('.text-6xl');
    if (trustScore) {
        const target = parseInt(trustScore.textContent);
        let current = 0;
        const interval = setInterval(() => {
            if (current >= target) {
                clearInterval(interval);
                return;
            }
            current += Math.ceil(target / 50);
            trustScore.textContent = Math.min(current, target) + '%';
        }, 40);
    }

    // ---------- Console ----------
    console.log('👤 TrustHub Citizen Dashboard loaded!');
    console.log('📄 Upload documents to build your verified identity');
    console.log('🔒 Your data is secure and under your control');
});