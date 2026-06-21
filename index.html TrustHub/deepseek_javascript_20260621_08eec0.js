// ============================================
// TRUSTHUB - Admin Dashboard
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ---------- Tab Navigation ----------
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const tabContents = {
        dashboard: document.getElementById('tab-dashboard'),
        flags: document.getElementById('tab-flags'),
        verifications: document.getElementById('tab-verifications'),
        investigations: document.getElementById('tab-investigations'),
        users: document.getElementById('tab-users'),
        roles: document.getElementById('tab-roles'),
        documents: document.getElementById('tab-documents'),
        subscriptions: document.getElementById('tab-subscriptions')
    };
    
    const pageTitles = {
        dashboard: ['Dashboard', 'Real-time overview of platform trust & safety'],
        flags: ['Flags & Reports', 'Manage all active flags and reports'],
        verifications: ['Verification Queue', 'Manually verify documents by contacting sources'],
        investigations: ['Investigations', 'Active case management'],
        users: ['All Users', 'Manage all users across the platform'],
        roles: ['Role Management', 'Define custom roles and permissions'],
        documents: ['Document Library', 'Manage all documents across the platform'],
        subscriptions: ['Subscriptions', 'Manage all subscriptions and billing']
    };
    
    function switchTab(tabId) {
        // Update sidebar
        sidebarItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.tab === tabId) {
                item.classList.add('active');
            }
        });
        
        // Update content
        Object.keys(tabContents).forEach(key => {
            if (tabContents[key]) {
                tabContents[key].classList.add('hidden');
            }
        });
        if (tabContents[tabId]) {
            tabContents[tabId].classList.remove('hidden');
        }
        
        // Update title
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

    // ---------- Modal Controls ----------
    function openModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
        }
    }
    
    function closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('hidden');
            modal.style.display = 'none';
        }
    }
    
    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.add('hidden');
                this.style.display = 'none';
            }
        });
    });
    
    // View flag buttons
    document.querySelectorAll('.view-flag-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            openModal('flagModal');
        });
    });
    
    // New report button
    const newReportBtn = document.getElementById('newReportBtn');
    if (newReportBtn) {
        newReportBtn.addEventListener('click', function() {
            openModal('reportModal');
        });
    }

    // ---------- Resolve Flag ----------
    document.querySelectorAll('.text-emerald-600:contains("Resolve")').forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Mark this flag as resolved?')) {
                this.closest('tr').style.opacity = '0.5';
                alert('✅ Flag resolved successfully!');
            }
        });
    });

    // ---------- Suspend Account ----------
    document.querySelectorAll('.text-rose-600:contains("Suspend")').forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('⚠️ Are you sure you want to suspend this account?')) {
                alert('🚫 Account suspended successfully!');
            }
        });
    });

    // ---------- Verification Actions ----------
    document.querySelectorAll('#tab-verifications button:contains("Verify")').forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Verify this document?')) {
                this.closest('.border').style.borderColor = '#059669';
                this.closest('.border').querySelector('.badge').textContent = 'Verified';
                alert('✅ Document verified successfully!');
            }
        });
    });
    
    document.querySelectorAll('#tab-verifications button:contains("Reject")').forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Reject this document?')) {
                this.closest('.border').style.borderColor = '#dc2626';
                alert('❌ Document rejected.');
            }
        });
    });

    // ---------- Export ----------
    document.querySelectorAll('button:contains("Export")').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('📊 Report exported successfully!');
        });
    });

    // ---------- Auto-refresh Stats (demo) ----------
    let statsRefresh = setInterval(() => {
        const statNumbers = document.querySelectorAll('.stat-card .text-2xl');
        statNumbers.forEach(el => {
            if (el.textContent.includes('2,341')) {
                // Simulate small changes
                const current = parseInt(el.textContent.replace(/,/g, ''));
                const change = Math.floor(Math.random() * 3) + 1;
                el.textContent = (current + change).toLocaleString();
            }
        });
    }, 30000); // Refresh every 30 seconds

    // ---------- Console ----------
    console.log('🔐 TrustHub Admin Dashboard loaded!');
    console.log('📊 Real-time monitoring active');
    console.log('💡 Click "View" on any flag to see details');
});