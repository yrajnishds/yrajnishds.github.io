(function() {
    if (typeof window.MAINTENANCE_CONFIG === 'undefined') return;

    const config = window.MAINTENANCE_CONFIG;
    const currentPath = window.location.pathname;
    
    let isMaintenanceActive = false;
    let maintenanceMessage = "";

    if (config.globalMaintenance) {
        isMaintenanceActive = true;
        maintenanceMessage = config.globalMessage;
    } else {
        // Check page-specific maintenance
        for (const [path, pageConfig] of Object.entries(config.pages)) {
            if (currentPath.includes(path) && pageConfig.active) {
                isMaintenanceActive = true;
                maintenanceMessage = pageConfig.message;
                break;
            }
        }
    }

    if (isMaintenanceActive) {
        // Prevent FOUC of the main content
        const style = document.createElement('style');
        style.id = 'maintenance-hide';
        style.innerHTML = 'main { display: none !important; }';
        document.documentElement.appendChild(style);

        document.addEventListener('DOMContentLoaded', () => {
            const mainEl = document.querySelector('main');
            if (mainEl) {
                mainEl.innerHTML = `
                    <section class="section card-panel" style="min-height: 70vh; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; margin-top: 80px; padding: 1rem; border: none; box-shadow: none; background: transparent;">
                        <div class="orb orb-1" style="width: 40vw; max-width: 400px; height: 40vw; max-height: 400px; background: var(--accent-teal); top: -10%; right: -10%; position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.15; z-index: 0; animation: float 10s infinite ease-in-out alternate;"></div>
                        <div class="orb orb-2" style="width: 50vw; max-width: 500px; height: 50vw; max-height: 500px; background: var(--accent-purple); bottom: -15%; left: -15%; position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.15; z-index: 0; animation: float 10s infinite ease-in-out alternate; animation-delay: -5s;"></div>
                        
                        <div class="maintenance-container card-panel" style="position: relative; z-index: 1; padding: clamp(2rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3rem); max-width: 600px; width: 100%; text-align: center; animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;">
                            
                            <div class="icon-wrapper" style="width: clamp(60px, 10vw, 80px); height: clamp(60px, 10vw, 80px); margin: 0 auto 1.5rem auto; background: rgba(183, 148, 244, 0.1); border: 1px solid rgba(183, 148, 244, 0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--accent-purple); animation: pulse 2s infinite;">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="M4.93 19.07l2.83-2.83"></path><path d="M16.24 7.76l2.83-2.83"></path>
                                </svg>
                            </div>
                            
                            <h1 class="text-gradient" style="font-size: clamp(2rem, 6vw, 2.8rem); margin-bottom: 1rem;">Under Maintenance</h1>
                            <p id="maintenance-msg" style="font-size: clamp(1rem, 3vw, 1.15rem); color: var(--text-secondary); line-height: 1.7; margin-bottom: 2rem;">${maintenanceMessage}</p>
                            
                            <button class="btn btn-primary" onclick="window.location.reload()" style="display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 2rem; width: 100%; max-width: 250px;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                                </svg>
                                Refresh Page
                            </button>
                            
                            <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;">
                                <a href="https://linkedin.com/in/yrajnishds" target="_blank" class="m-social-btn linkedin" title="LinkedIn">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                </a>
                                <a href="mailto:yrajnishds@gmail.com" class="m-social-btn email" title="Primary Email">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                </a>
                                <a href="https://discord.com/users/yrajnishds" target="_blank" class="m-social-btn discord" title="Discord">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                </a>
                            </div>
                            
                            <div class="loader-bar" style="width: 100%; height: 4px; background: var(--surface-border); border-radius: 4px; margin-top: 1.5rem; overflow: hidden; position: relative;">
                                <div class="loader-fill" style="position: absolute; top: 0; left: 0; height: 100%; width: 30%; background: linear-gradient(90deg, var(--accent-teal), var(--accent-purple)); border-radius: 4px; animation: loading 2s infinite ease-in-out;"></div>
                            </div>
                        </div>
                    </section>
                    <style>
                        @keyframes float { 0% { transform: translate(0, 0); } 100% { transform: translate(30px, 50px); } }
                        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(183, 148, 244, 0.4); } 70% { box-shadow: 0 0 0 15px rgba(183, 148, 244, 0); } 100% { box-shadow: 0 0 0 0 rgba(183, 148, 244, 0); } }
                        @keyframes loading { 0% { left: -30%; width: 30%; } 50% { width: 40%; } 100% { left: 100%; width: 30%; } }
                        .m-social-btn { width: clamp(40px, 8vw, 45px); height: clamp(40px, 8vw, 45px); border-radius: 50%; background: var(--surface-color); display: flex; align-items: center; justify-content: center; color: var(--text-primary); text-decoration: none; border: 1px solid var(--surface-border); transition: all 0.3s ease; }
                        .m-social-btn:hover { transform: translateY(-3px); background: var(--surface-hover); box-shadow: var(--shadow-glass); }
                        .m-social-btn.linkedin:hover { border-color: #0077B5; color: #0077B5; }
                        .m-social-btn.email:hover { border-color: #EA4335; color: #EA4335; }
                        .m-social-btn.discord:hover { border-color: #5865F2; color: #5865F2; }
                    </style>
                `;
            }

            // Remove the hiding style
            const styleEl = document.getElementById('maintenance-hide');
            if (styleEl) styleEl.remove();

            // Update URL to indicate maintenance without breaking refresh (404)
            const newUrl = new URL(window.location.href);
            if (newUrl.searchParams.get('mode') !== 'maintenance') {
                newUrl.searchParams.set('mode', 'maintenance');
                window.history.replaceState(null, '', newUrl.toString());
            }
        });
    } else {
        // Maintenance is disabled. If the URL still has the maintenance flag, remove it.
        const currentUrl = new URL(window.location.href);
        let changed = false;
        
        if (currentUrl.searchParams.get('mode') === 'maintenance') {
            currentUrl.searchParams.delete('mode');
            changed = true;
        }
        
        // Cleanup for the old pathname modification if it somehow got cached or redirected
        if (currentUrl.pathname.endsWith('/maintenance')) {
            currentUrl.pathname = currentUrl.pathname.replace('/maintenance', '/');
            changed = true;
        }

        if (changed) {
            window.history.replaceState(null, '', currentUrl.toString());
        }
    }
})();
