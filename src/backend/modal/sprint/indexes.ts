// Sprint model indexes for performance optimization
export const sprintIndexes = [
    // Single field indexes
    { project: 1 },
    { status: 1 },
    { isActive: 1 },
    { startDate: 1 },
    { endDate: 1 },
    { tickets: 1 },

    // Compound indexes for common queries
    { project: 1, status: 1 },
    { project: 1, isActive: 1 },
    { status: 1, isActive: 1 },
    { project: 1, startDate: -1 },
    { project: 1, endDate: -1 },
    { isActive: 1, startDate: 1, endDate: 1 },

    // Text search index
    { name: 'text', description: 'text' },

    // Date range queries
    { startDate: 1, endDate: 1 },
    { project: 1, startDate: 1, endDate: 1 },

    // Sprint timeline queries
    { project: 1, status: 1, startDate: -1 }
];
