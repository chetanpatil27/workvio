# ContextMenu Component

A reusable context menu component that provides consistent functionality and UI across the application.

## Features

- ✅ Consistent styling and behavior
- ✅ Icon support with proper alignment
- ✅ Color variants (inherit, primary, secondary, error, warning, info, success)
- ✅ Disabled state support
- ✅ Divider support between menu items
- ✅ Customizable positioning
- ✅ Automatic click handling and menu closing

## Usage

### Basic Example

```tsx
import ContextMenu, { MenuAction } from "@/components/common/context-menu";
import { Edit, Delete, Visibility } from "@mui/icons-material";

const ExampleMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const menuActions: MenuAction[] = [
    {
      id: "view",
      label: "View Details",
      icon: <Visibility />,
      onClick: () => console.log("View clicked"),
    },
    {
      id: "edit",
      label: "Edit",
      icon: <Edit />,
      onClick: () => console.log("Edit clicked"),
    },
    {
      id: "delete",
      label: "Delete",
      icon: <Delete />,
      onClick: () => console.log("Delete clicked"),
      color: "error",
      divider: true, // Add divider before this item
    },
  ];

  return (
    <ContextMenu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
      actions={menuActions}
    />
  );
};
```

### Advanced Example with Conditional Actions

```tsx
const ConditionalMenu = ({ itemStatus }: { itemStatus: string }) => {
  const menuActions: MenuAction[] = [
    {
      id: "view",
      label: "View Details",
      icon: <Visibility />,
      onClick: handleView,
    },
    {
      id: "edit",
      label: "Edit",
      icon: <Edit />,
      onClick: handleEdit,
      disabled: itemStatus === "locked", // Conditional disable
    },
  ];

  // Add conditional actions
  if (itemStatus === "draft") {
    menuActions.push({
      id: "publish",
      label: "Publish",
      icon: <Publish />,
      onClick: handlePublish,
      color: "success",
    });
  }

  if (itemStatus === "published") {
    menuActions.push({
      id: "unpublish",
      label: "Unpublish",
      icon: <Unpublish />,
      onClick: handleUnpublish,
      color: "warning",
    });
  }

  // Always add delete at the end
  menuActions.push({
    id: "delete",
    label: "Delete",
    icon: <Delete />,
    onClick: handleDelete,
    color: "error",
    divider: true,
  });

  return (
    <ContextMenu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      actions={menuActions}
    />
  );
};
```

## MenuAction Interface

```typescript
interface MenuAction {
  id: string; // Unique identifier
  label: string; // Display text
  icon: React.ReactNode; // Icon component
  onClick: () => void; // Click handler
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "info"
    | "success";
  disabled?: boolean; // Disable the menu item
  divider?: boolean; // Add divider after this item
}
```

## Props

| Prop              | Type                  | Default                                  | Description                       |
| ----------------- | --------------------- | ---------------------------------------- | --------------------------------- |
| `anchorEl`        | `HTMLElement \| null` | -                                        | Element to anchor the menu to     |
| `open`            | `boolean`             | -                                        | Whether the menu is open          |
| `onClose`         | `() => void`          | -                                        | Function to call when menu closes |
| `actions`         | `MenuAction[]`        | -                                        | Array of menu actions             |
| `anchorOrigin`    | `Object`              | `{vertical: 'top', horizontal: 'right'}` | Menu anchor origin                |
| `transformOrigin` | `Object`              | `{vertical: 'top', horizontal: 'right'}` | Menu transform origin             |

## Color Variants

- `inherit` - Default text color
- `primary` - Primary theme color
- `secondary` - Secondary theme color
- `error` - Error/danger color (red)
- `warning` - Warning color (orange)
- `info` - Info color (blue)
- `success` - Success color (green)

## Updated Components

All the following components have been updated to use the common ContextMenu:

### ✅ **Updated Menu Components:**

1. **ProjectMenu** (`src/app/(main)/projects/components/project-menu.tsx`)

   - View Details, Edit Project, Archive, Delete
   - Added divider before delete action

2. **SprintMenu** (`src/app/(main)/sprints/components/sprint-menu.tsx`)

   - View Details, Edit Sprint, Start/Complete Sprint, Delete
   - Conditional actions based on sprint status
   - Smart disable logic

3. **DesignationMenu** (`src/app/(main)/designations/components/designation-menu.tsx`)

   - View Details, Edit Designation, Activate/Deactivate, Delete
   - Dynamic label and icon based on active status

4. **TeamMenu** (`src/app/(main)/teams/components/team-menu.tsx`)

   - View Details, Edit Team, Manage Members, Delete Team
   - Custom anchor positioning

5. **Staff Page** (`src/app/(main)/staff/page.tsx`)
   - Converted inline Menu to ContextMenu
   - View Details, Edit, Delete actions

### 🎯 **Consistency Achieved:**

- All menus now use the same styling and behavior
- Consistent color coding (error for delete, success for positive actions)
- Uniform spacing, hover effects, and transitions
- Type-safe menu actions with proper interfaces

## Best Practices

1. **Consistent Actions**: Use common action names (View Details, Edit, Delete)
2. **Color Usage**: Use `error` for destructive actions, `success` for positive actions
3. **Dividers**: Add dividers before destructive actions or to group related actions
4. **Conditional Logic**: Hide or disable actions based on item state
5. **Icon Consistency**: Use Material-UI icons consistently across menus
