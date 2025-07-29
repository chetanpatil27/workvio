# Enhanced Button Component - Color Combinations & Smart Styling

## Automatic Color Combinations

The Button component now automatically handles color combinations based on the `color` prop:

### Filled Variants (Smart Text Colors)

```tsx
// Success: Green background + White text
<Button color="success" variant="filled">Save Changes</Button>

// Danger: Red background + White text
<Button color="danger" variant="filled">Delete Item</Button>

// Warning: Orange background + White text
<Button color="warning" variant="filled">Warning Action</Button>

// Info: Blue background + White text
<Button color="info" variant="filled">Information</Button>

// Primary: Blue background + White text (default)
<Button color="primary" variant="filled">Primary Action</Button>
```

### Outlined Variants (Smart Border & Text Colors)

```tsx
// Success: Green border + Green text -> Hover: Light green bg
<Button color="success" variant="outlined">Save Changes</Button>

// Danger: Red border + Red text -> Hover: Light red bg
<Button color="danger" variant="outlined">Delete Item</Button>

// Warning: Orange border + Orange text -> Hover: Light orange bg
<Button color="warning" variant="outlined">Warning Action</Button>
```

## Color Combinations Reference

| Color     | Background | Text Color | Hover Background | Hover Text |
| --------- | ---------- | ---------- | ---------------- | ---------- |
| `primary` | Blue       | White      | Darker Blue      | White      |
| `success` | Green      | White      | Darker Green     | White      |
| `danger`  | Red        | White      | Darker Red       | White      |
| `warning` | Orange     | White      | Darker Orange    | White      |
| `info`    | Light Blue | White      | Darker Blue      | White      |
| `link`    | Blue       | Blue       | Darker Blue      | Blue       |

## Smart Hover Effects

Each color has its own hover behavior:

### Filled Buttons

- **Background**: Changes to darker shade of the color
- **Shadow**: Enhanced shadow with color-matched opacity
- **Animation**: Subtle lift effect (`translateY(-1px)`)

### Outlined Buttons

- **Background**: Light tinted background based on color
- **Border**: Changes to darker shade
- **Text**: Changes to darker shade
- **Shadow**: Adds subtle colored shadow

## Usage Examples

```tsx
// Complete examples with all props
<Button
  color="success"
  variant="filled"
  size="lg"
  startIcon={<SaveIcon />}
  onClick={handleSave}
>
  Save Project
</Button>

<Button
  color="danger"
  variant="outlined"
  size="md"
  startIcon={<DeleteIcon />}
  onClick={handleDelete}
>
  Delete Item
</Button>

// Loading states maintain color themes
<Button
  color="warning"
  variant="filled"
  loading={isProcessing}
  loadingText="Processing..."
>
  Process Data
</Button>
```

## Disabled State

Disabled buttons automatically get:

- **Gray background** (filled) or transparent (outlined)
- **Gray text and border**
- **No hover effects**
- **Reduced opacity**

```tsx
<Button color="success" disabled>
  Disabled Success Button
</Button>
```

## Migration Benefits

**Before**: Manual styling for each color

```tsx
<Button
  sx={{
    bgcolor: 'success.main',
    color: 'white',
    '&:hover': { bgcolor: 'success.dark' }
  }}
>
```

**After**: Automatic smart styling

```tsx
<Button color="success">
```

The component now handles all color logic internally! 🎨
