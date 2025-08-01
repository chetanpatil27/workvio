# Menu Button Props

When creating menu buttons (IconButton, Button, etc.) that trigger context menus, add the following prop to ensure proper click-away behavior:

```tsx
<IconButton data-menu-button="true" onClick={(e) => handleMenuClick(e, item)}>
  <MoreIcon />
</IconButton>
```

This data attribute helps the global click handler identify menu trigger buttons and prevents the menu from closing when clicking on them.
