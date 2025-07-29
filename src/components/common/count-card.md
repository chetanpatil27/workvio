# CountCard Component

A reusable count/stats card component for displaying metrics across the Workvio project management platform.

## Features

- **Consistent Design**: 6px border radius, standardized hover effects, and Material-UI theming
- **Customizable Icons**: Support for any React icon component with customizable colors and backgrounds
- **Interactive Options**: Optional click handlers and hover effects
- **Responsive Design**: Works across mobile, tablet, and desktop layouts
- **TypeScript Support**: Fully typed with comprehensive prop interfaces

## Props

| Prop          | Type               | Default                     | Description                                         |
| ------------- | ------------------ | --------------------------- | --------------------------------------------------- |
| `value`       | `number \| string` | **Required**                | The main value/count to display                     |
| `label`       | `string`           | **Required**                | The label/title for the count                       |
| `icon`        | `React.ReactNode`  | **Required**                | The icon component to display                       |
| `iconBgColor` | `string`           | `'rgba(25, 118, 210, 0.1)'` | Background color for the icon container             |
| `iconColor`   | `string`           | `'primary.main'`            | Color for the icon (Material-UI theme color or hex) |
| `sx`          | `SxProps<Theme>`   | `{}`                        | Custom styling for the card                         |
| `onClick`     | `() => void`       | `undefined`                 | Click handler for the card                          |
| `interactive` | `boolean`          | `false`                     | Whether the card should show hover effects          |

## Usage Examples

### Basic Count Card

```tsx
import CountCard from "@/components/common/count-card";
import { FolderIcon } from "@mui/icons-material";

<CountCard value={25} label="Total Projects" icon={<FolderIcon />} />;
```

### Interactive Count Card with Custom Colors

```tsx
<CountCard
  value={8}
  label="Active Sprints"
  icon={<PlayArrowIcon />}
  iconBgColor="rgba(76, 175, 80, 0.1)"
  iconColor="success.main"
  interactive={true}
  onClick={() => router.push("/sprints?filter=active")}
/>
```

### Custom Styled Count Card

```tsx
<CountCard
  value="12%"
  label="Completion Rate"
  icon={<TrendingUpIcon />}
  iconBgColor="rgba(255, 193, 7, 0.1)"
  iconColor="#ffc107"
  sx={{
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    "& .MuiTypography-root": {
      color: "white",
    },
  }}
/>
```

### Grid Layout Example

```tsx
<Box
  sx={{
    display: "grid",
    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)" },
    gap: 2.5,
    mb: 3,
  }}
>
  <CountCard
    value={projects.length}
    label="Total Projects"
    icon={<FolderIcon />}
  />
  <CountCard value={activeProjects} label="Active" icon={<PlayArrowIcon />} />
  <CountCard value={pendingProjects} label="Pending" icon={<ScheduleIcon />} />
  <CountCard
    value={completedProjects}
    label="Completed"
    icon={<CheckCircleIcon />}
  />
</Box>
```

## Color Schemes

### Predefined Color Combinations

```tsx
// Primary Blue
iconBgColor="rgba(25, 118, 210, 0.1)" iconColor="primary.main"

// Success Green
iconBgColor="rgba(76, 175, 80, 0.1)" iconColor="success.main"

// Warning Orange
iconBgColor="rgba(255, 152, 0, 0.1)" iconColor="warning.main"

// Secondary Purple
iconBgColor="rgba(103, 58, 183, 0.1)" iconColor="secondary.main"

// Error Red
iconBgColor="rgba(244, 67, 54, 0.1)" iconColor="error.main"
```

## Integration Notes

- Used across Projects, Sprints, and Staff pages for consistent metric display
- Automatically applies 6px border radius matching the project design system
- Supports both Material-UI theme colors and custom hex colors
- Icon sizing is automatically set to 1.5rem for consistency
- Hover effects include subtle shadow and transform animations

## File Location

`/src/components/common/count-card.tsx`
