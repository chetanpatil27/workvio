# Staff Page Restructuring

This document outlines the restructuring of the staff page to follow the same pattern as the sprint page with proper code splitting.

## Directory Structure

The staff page has been restructured to match the sprint page pattern:

```
src/app/app/staff/
├── components/
│   ├── index.ts                     # Component exports
│   ├── staff-header.tsx            # Header with stats and actions
│   ├── staff-search-filters.tsx    # Search bar and tabs
│   ├── staff-list.tsx              # Staff grid/list component
│   ├── staff-card.tsx              # Individual staff card
│   ├── staff-dialog.tsx            # Staff create/edit dialog (existing)
│   └── staff-menu.tsx              # Context menu actions
├── constants/
│   ├── index.ts                     # Constants exports
│   └── staff-filters.ts            # Tab constants and color mappings
├── hooks/
│   ├── index.ts                     # Hook exports
│   ├── use-staff.ts                # Staff state management (existing)
│   └── use-staff-dialog.ts         # Staff dialog state (existing)
├── utils/
│   ├── index.ts                     # Utility exports
│   └── staff-helpers.ts            # Helper functions for filtering and styling
├── page.tsx                        # Main staff page (refactored)
└── [id]/                          # Individual staff detail page
```

## Key Changes

### 1. Component Splitting

- **StaffHeader**: Header section with title, description, action buttons, and stats cards
- **StaffSearchFilters**: Search bar and tab navigation
- **StaffList**: Grid layout for staff cards with empty state handling
- **StaffCard**: Individual staff member card component with embedded context menu
- **StaffMenu**: Context menu component embedded within cards (like sprint pattern)

### 2. Context Menu Implementation

- **Sprint Pattern**: Context menu is embedded directly within each card component
- **Removed Global Menu Provider**: No longer uses the global menu provider pattern
- **Direct Callbacks**: Menu actions are passed as direct callback props
- **Conditional Menu Items**: Menu items are disabled based on staff department (e.g., Former Employee)

### 3. Utility Functions

- `getAvatarColor()`: Generate consistent avatar colors
- `getGenderColor()`: Get gender-based chip colors
- `filterStaffBySearch()`: Search filtering logic
- `filterStaffByTab()`: Tab-based filtering
- `getStaffStats()`: Calculate staff statistics

### 3. Constants

- `STAFF_TABS`: Tab index constants
- `STAFF_TAB_LABELS`: Tab label mappings
- `GENDER_COLORS`: Gender color mappings
- `AVATAR_COLORS`: Avatar color array

### 4. Performance Improvements

- Added `useMemo` for filtered staff calculation
- Memoized stats calculation
- Optimized re-renders with proper dependency arrays
- Removed global menu provider for better performance

### 5. Code Organization

- Separated concerns into logical components
- Proper TypeScript typing throughout
- Consistent export patterns following sprint page structure
- Clean imports and exports with index files

## Benefits

1. **Maintainability**: Code is now split into logical, focused components
2. **Reusability**: Components can be reused in other parts of the application
3. **Performance**: Memoization prevents unnecessary re-calculations
4. **Consistency**: Follows the same pattern as the sprint page
5. **Type Safety**: Proper TypeScript usage throughout
6. **Testing**: Smaller components are easier to unit test

## Usage

The main page now imports and uses the split components:

```tsx
import {
  StaffHeader,
  StaffSearchFilters,
  StaffList,
  StaffDialog,
} from "./components";
import { useStaffDialog } from "./hooks";
import { filterStaffBySearch, filterStaffByTab, getStaffStats } from "./utils";
import { STAFF_TABS } from "./constants";
```

### Context Menu Pattern

The staff components now follow the same context menu pattern as sprints:

```tsx
// Each StaffCard includes an embedded StaffMenu
<StaffCard
  member={member}
  onCardClick={() => onStaffClick(member.id)}
  onView={() => onView(member)}
  onEdit={() => onEdit(member)}
  onDelete={() => onDelete(member)}
/>

// StaffMenu is embedded within StaffCard
<StaffMenu
  onView={onView}
  onEdit={onEdit}
  onDelete={onDelete}
  staffDepartment={member.department}
/>
```

This structure makes the code more modular, maintainable, and follows React best practices for component organization.
