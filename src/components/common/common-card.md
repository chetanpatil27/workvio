# CommonCard Component

A reusable card component that provides consistent styling and behavior across the entire application. It can be used for projects, sprints, tickets, staff, teams, and any other content that needs card-style presentation.

## Features

- **Consistent Styling**: Unified border, background, and radius across all cards
- **Multiple Variants**: Outlined, elevated, and flat styles
- **Interactive States**: Hover effects and click handling
- **Flexible Padding**: Multiple padding options (none, small, medium, large)
- **Responsive**: Works across all screen sizes
- **Accessible**: Proper focus and keyboard navigation support

## API

### Props

| Prop             | Type                                       | Default      | Description                                          |
| ---------------- | ------------------------------------------ | ------------ | ---------------------------------------------------- |
| `children`       | `React.ReactNode`                          | -            | Content to display inside the card                   |
| `interactive`    | `boolean`                                  | `false`      | Whether to show hover effects                        |
| `elevated`       | `boolean`                                  | `false`      | Whether to use elevated shadow styling               |
| `padding`        | `'none' \| 'small' \| 'medium' \| 'large'` | `'medium'`   | Padding variant                                      |
| `cardVariant`    | `'outlined' \| 'elevated' \| 'flat'`       | `'outlined'` | Visual style variant                                 |
| `hoverIntensity` | `'subtle' \| 'normal' \| 'strong'`         | `'normal'`   | Hover effect intensity                               |
| `onClick`        | `() => void`                               | -            | Click handler (automatically makes card interactive) |
| `sx`             | `SxProps<Theme>`                           | `{}`         | Custom Material-UI styles                            |

### Variants

#### Outlined (Default)

- Border with divider color
- No shadow by default
- Clean, minimal appearance

#### Elevated

- No border
- Drop shadow for depth
- Modern, floating appearance

#### Flat

- No border or shadow
- Completely flat appearance
- Minimal visual separation

### Padding Options

- **None**: No padding (0)
- **Small**: 1.5 spacing units
- **Medium**: 2.5 spacing units (default)
- **Large**: 3 spacing units

### Hover Intensity Options

- **Subtle**: Minimal elevation change (1px transform, light shadow)
- **Normal**: Standard elevation change (2px transform, medium shadow) - default
- **Strong**: Pronounced elevation change (4px transform, strong shadow)

## Usage Examples

### Basic Card

```tsx
import { CommonCard } from "@/components/common";

<CommonCard>
  <Typography variant="h6">Basic Card</Typography>
  <Typography variant="body2">Simple content inside a card</Typography>
</CommonCard>;
```

### Interactive Project Card

```tsx
<CommonCard
  interactive
  cardVariant="elevated"
  onClick={() => navigateToProject(project.id)}
>
  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    <Avatar src={project.logo} />
    <Box>
      <Typography variant="h6">{project.name}</Typography>
      <Typography variant="body2" color="text.secondary">
        {project.description}
      </Typography>
    </Box>
  </Box>
</CommonCard>
```

### Staff Member Card

```tsx
<CommonCard
  cardVariant="outlined"
  padding="large"
  interactive
  onClick={() => viewStaffDetails(staff.id)}
>
  <Box sx={{ textAlign: "center" }}>
    <Avatar sx={{ width: 60, height: 60, mx: "auto", mb: 2 }}>
      {staff.name[0]}
    </Avatar>
    <Typography variant="h6">{staff.name}</Typography>
    <Typography variant="body2" color="text.secondary">
      {staff.designation}
    </Typography>
    <Chip
      label={staff.status}
      color={staff.status === "active" ? "success" : "default"}
      size="small"
      sx={{ mt: 1 }}
    />
  </Box>
</CommonCard>
```

### Sprint Status Card

```tsx
<CommonCard
  cardVariant="flat"
  padding="small"
  sx={{ bgcolor: "primary.light", color: "primary.contrastText" }}
>
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Typography variant="body2" fontWeight="medium">
      Current Sprint
    </Typography>
    <Chip label="In Progress" size="small" color="primary" />
  </Box>
</CommonCard>
```

### Ticket Card in Kanban

```tsx
<CommonCard
  interactive
  padding="medium"
  cardVariant="outlined"
  onClick={() => openTicketDetails(ticket.id)}
  sx={{ mb: 2 }}
>
  <Box>
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
      <Typography variant="body2" color="text.secondary">
        {ticket.id}
      </Typography>
      <Chip
        label={ticket.priority}
        size="small"
        color={getPriorityColor(ticket.priority)}
      />
    </Box>
    <Typography variant="subtitle2" sx={{ mb: 1, lineHeight: 1.4 }}>
      {ticket.title}
    </Typography>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ width: 24, height: 24 }} src={ticket.assignee.avatar} />
      <Typography variant="caption" color="text.secondary">
        {ticket.storyPoints} pts
      </Typography>
    </Box>
  </Box>
</CommonCard>
```

### Custom Styled Card

```tsx
<CommonCard
  cardVariant="elevated"
  elevated
  sx={{
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    "&:hover": {
      transform: "scale(1.02)",
    },
  }}
>
  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
    Premium Feature
  </Typography>
  <Typography variant="body2">
    Access advanced analytics and reporting
  </Typography>
</CommonCard>
```

## Integration with Existing Components

You can easily replace existing card implementations:

### Before (Custom Card)

```tsx
<Card sx={{ p: 3, border: "1px solid", borderColor: "divider" }}>
  {/* content */}
</Card>
```

### After (CommonCard)

```tsx
<CommonCard padding="large">{/* same content */}</CommonCard>
```

## Theme Integration

The component automatically respects your Material-UI theme:

- Colors from theme palette
- Spacing from theme spacing
- Typography from theme typography
- Responsive breakpoints

## Accessibility

- Proper keyboard navigation when interactive
- Screen reader friendly
- Focus indicators
- Semantic HTML structure
