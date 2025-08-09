import { Staff } from '@/store/slices/staff';
import { AVATAR_COLORS } from '../constants/staff-filters';

export const getAvatarColor = (name: string): string => {
    const index = name.charCodeAt(0) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
};

export const getGenderColor = (gender: string): 'primary' | 'secondary' | 'default' => {
    const normalizedGender = gender.toLowerCase();
    if (normalizedGender === 'male') return 'primary';
    if (normalizedGender === 'female') return 'secondary';
    return 'default';
};

export const filterStaffBySearch = (staff: Staff[], searchTerm: string): Staff[] => {
    if (!searchTerm.trim()) return staff;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return staff.filter((member) =>
        member.name.toLowerCase().includes(lowerSearchTerm) ||
        member.email.toLowerCase().includes(lowerSearchTerm) ||
        member.mobile.includes(searchTerm) ||
        (member.department && member.department.toLowerCase().includes(lowerSearchTerm))
    );
};

export const filterStaffByTab = (staff: Staff[], selectedTab: number): Staff[] => {
    if (selectedTab === 1) {
        // Active tab - exclude former employees
        return staff.filter((member) => member.department !== "Former Employee");
    }
    // All staff
    return staff;
};

export const getStaffStats = (staff: Staff[]) => {
    return {
        total: staff.length,
        male: staff.filter((s) => s.gender.toLowerCase() === "male").length,
        female: staff.filter((s) => s.gender.toLowerCase() === "female").length,
        departments: new Set(staff.map((s) => s.department || "Unknown")).size,
    };
};
