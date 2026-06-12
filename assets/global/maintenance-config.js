window.MAINTENANCE_CONFIG = {
    // Set to true to put the entire site under maintenance
    globalMaintenance: false,
    globalMessage: "We are currently performing scheduled maintenance. We'll be back shortly.",
    
    // Page-specific maintenance configuration
    pages: {
        "/projects": {
            active: true,
            message: "Project showcases are currently being updated."
        },
        "/research": {
            active: true,
            message: "Research section is currently under maintenance."
        },
        "/cv": {
            active: false,
            message: "CV section is currently under maintenance."
        },
        "/connect": {
            active: false,
            message: "Connect section is currently under maintenance."
        }
    }
};
