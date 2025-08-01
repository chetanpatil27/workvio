# Migration Guide: Using Global Menu Provider

This guide shows how to migrate existing menu components to use the global MenuProvider system, which ensures only one menu can be open at a time.

## ✅ Benefits of Global Menu Management

- **Single Menu State**: Only one menu can be open at a time
- **Automatic Closing**: Opening a new menu automatically closes any existing open menu
- **Better UX**: No need to click outside to close menus before opening new ones
- **Consistent Behavior**: All menus behave the same way across the application

## 🔄 Migration Steps

### 1. **Update Component Imports**

**Before:**

```tsx
import { useState } from "react";

// Individual menu state
const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
```

**After:**

```tsx
import { useMenuHandler } from "@/components/providers/menu-provider";

// Global menu state
const itemMenu = useMenuHandler("item-menu-unique-id");
const selectedItem = itemMenu.selectedData as ItemType | null;
```

### 2. **Replace Menu Event Handlers**

**Before:**

```tsx
const handleMenuClick = (
  event: React.MouseEvent<HTMLElement>,
  item: ItemType
) => {
  event.stopPropagation();
  setAnchorEl(event.currentTarget);
  setSelectedItem(item);
};

const handleMenuClose = () => {
  setAnchorEl(null);
  setSelectedItem(null);
};
```

**After:**

```tsx
// No need for separate handlers - use the ones from useMenuHandler
// Just update action handlers to close menu:
const handleViewDetails = () => {
  if (selectedItem) {
    router.push(`/items/${selectedItem.id}`);
  }
  itemMenu.handleMenuClose(); // Close menu after action
};
```

### 3. **Update Menu Button Click**

**Before:**

```tsx
<IconButton onClick={(e) => handleMenuClick(e, item)}>
  <MoreIcon />
</IconButton>
```

**After:**

```tsx
<IconButton onClick={(e) => itemMenu.handleMenuClick(e, item)}>
  <MoreIcon />
</IconButton>
```

### 4. **Update ContextMenu Props**

**Before:**

```tsx
<ContextMenu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleMenuClose}
  actions={menuActions}
/>
```

**After:**

```tsx
<ContextMenu
  anchorEl={itemMenu.anchorEl}
  open={itemMenu.isOpen}
  onClose={itemMenu.handleMenuClose}
  actions={menuActions}
/>
```

## 📋 Complete Example: Staff Page Migration

### Before (Old Way):

```tsx
export default function StaffPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    staff: Staff
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedStaff(staff);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedStaff(null);
  };

  const handleViewDetails = () => {
    if (selectedStaff) {
      router.push(`/staff/${selectedStaff.id}`);
    }
    handleMenuClose();
  };

  return (
    <>
      {/* Menu Button */}
      <IconButton onClick={(e) => handleMenuClick(e, member)}>
        <MoreIcon />
      </IconButton>

      {/* Context Menu */}
      <ContextMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        actions={staffMenuActions}
      />
    </>
  );
}
```

### After (New Way):

```tsx
import { useMenuHandler } from "@/components/providers/menu-provider";

export default function StaffPage() {
  // Global menu state
  const staffMenu = useMenuHandler("staff-menu");
  const selectedStaff = staffMenu.selectedData as Staff | null;

  const handleViewDetails = () => {
    if (selectedStaff) {
      router.push(`/staff/${selectedStaff.id}`);
    }
    staffMenu.handleMenuClose();
  };

  return (
    <>
      {/* Menu Button */}
      <IconButton onClick={(e) => staffMenu.handleMenuClick(e, member)}>
        <MoreIcon />
      </IconButton>

      {/* Context Menu */}
      <ContextMenu
        anchorEl={staffMenu.anchorEl}
        open={staffMenu.isOpen}
        onClose={staffMenu.handleMenuClose}
        actions={staffMenuActions}
      />
    </>
  );
}
```

## 🎯 Key Points

1. **Unique Menu IDs**: Use unique IDs for each menu type (e.g., 'staff-menu', 'project-menu')
2. **Data Passing**: Pass the selected item as data in `handleMenuClick(event, itemData)`
3. **Type Safety**: Cast `selectedData` to the appropriate type: `selectedData as ItemType | null`
4. **Menu Closing**: Always call `menuHandler.handleMenuClose()` after menu actions
5. **Provider Setup**: Ensure `MenuProvider` wraps your components in the layout

## 🚀 Components Updated

- ✅ **Staff Page** - Uses global menu state
- 🔄 **Project Menu** - Needs migration
- 🔄 **Sprint Menu** - Needs migration
- 🔄 **Designation Menu** - Needs migration
- 🔄 **Team Menu** - Needs migration

## 🎉 Result

After migration, users can:

- Click any menu button to open that menu
- Click another menu button to close the current menu and open the new one
- No need to click outside to close menus first
- Consistent behavior across all menus in the application
