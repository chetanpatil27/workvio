export const STAFF_TABS = {
    ALL: 0,
    ACTIVE: 1,
} as const;

export const STAFF_TAB_LABELS = {
    [STAFF_TABS.ALL]: 'All Staff',
    [STAFF_TABS.ACTIVE]: 'Active',
} as const;

export const GENDER_COLORS = {
    male: 'primary',
    female: 'secondary',
    default: 'default',
} as const;

export const AVATAR_COLORS = [
    "#1976d2",
    "#1565c0",
    "#0d47a1",
    "#42a5f5",
    "#1e88e5",
    "#2196f3",
] as const;
