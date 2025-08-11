# User Service Usage Examples

## New Unified Approach with `getUsers()`

The `UserService.getUsers()` method provides a single, flexible endpoint for all user data retrieval needs with built-in filtering, searching, sorting, and pagination.

### Basic Usage

```typescript
import { UserService } from '@/backend/services/user';

// Get all users with pagination (default: page 1, limit 10)
const allUsers = await UserService.getUsers();

// Get specific page with custom limit
const pagedUsers = await UserService.getUsers({ 
  page: 2, 
  limit: 20 
});
```

### Filtering Examples

```typescript
// Get active users only
const activeUsers = await UserService.getUsers({ 
  isActive: true 
});

// Filter by role(s)
const developers = await UserService.getUsers({ 
  role: 'developer',
  isActive: true 
});

const devAndTesters = await UserService.getUsers({ 
  role: ['developer', 'tester'],
  isActive: true 
});

// Filter by designation
const seniors = await UserService.getUsers({ 
  designation: 'Senior Developer',
  isActive: true 
});

// Date range filtering
const recentJoiners = await UserService.getUsers({
  joiningDateFrom: new Date('2024-01-01'),
  joiningDateTo: new Date('2024-12-31')
});
```

### Search Examples

```typescript
// Search across name, email, and employeeId
const searchResults = await UserService.getUsers({ 
  search: 'john',
  page: 1,
  limit: 10 
});

// Combined search and filters
const filteredSearch = await UserService.getUsers({
  search: 'smith',
  role: ['developer', 'manager'],
  isActive: true,
  page: 1,
  limit: 15
});
```

### Sorting Examples

```typescript
// Sort by name (ascending)
const sortedByName = await UserService.getUsers({
  sortBy: 'name',
  sortOrder: 'asc',
  isActive: true
});

// Sort by joining date (newest first)
const newestFirst = await UserService.getUsers({
  sortBy: 'joiningDate',
  sortOrder: 'desc',
  limit: 20
});

// Sort by creation date (oldest first)
const oldestFirst = await UserService.getUsers({
  sortBy: 'createdAt',
  sortOrder: 'asc'
});
```

### Single User Lookup

```typescript
// Find user by email
const userByEmail = await UserService.getUsers({ 
  email: 'john@example.com' 
});
const user = userByEmail.users[0] || null;

// Find user by ID
const userById = await UserService.getUsers({ 
  id: 'user-id-123' 
});
const user = userById.users[0] || null;

// Or use convenience methods
const user1 = await UserService.findByEmail('john@example.com');
const user2 = await UserService.findById('user-id-123');
```

### API Route Example

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { UserService, IUserFilters } from '@/backend/services/user';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Build filters from query parameters
    const filters: IUserFilters = {
      search: searchParams.get('search') || undefined,
      role: searchParams.get('role')?.split(',') || undefined,
      designation: searchParams.get('designation') || undefined,
      isActive: searchParams.get('isActive') ? 
        searchParams.get('isActive') === 'true' : undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
      sortBy: (searchParams.get('sortBy') as any) || 'createdAt',
      sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'
    };

    // Date filters
    if (searchParams.get('joiningDateFrom')) {
      filters.joiningDateFrom = new Date(searchParams.get('joiningDateFrom')!);
    }
    if (searchParams.get('joiningDateTo')) {
      filters.joiningDateTo = new Date(searchParams.get('joiningDateTo')!);
    }

    const result = await UserService.getUsers(filters);
    
    return NextResponse.json({
      success: true,
      data: result.users,
      pagination: result.pagination
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
```

### Frontend Usage Examples

```typescript
// Frontend API calls
const fetchUsers = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`/api/users?${queryString}`);
  return response.json();
};

// Get active developers, page 1, 20 per page
const developers = await fetchUsers({
  role: 'developer',
  isActive: 'true',
  page: '1',
  limit: '20'
});

// Search for users
const searchResults = await fetchUsers({
  search: 'john',
  page: '1',
  limit: '10'
});

// Filter by designation and sort by name
const seniors = await fetchUsers({
  designation: 'Senior Developer',
  sortBy: 'name',
  sortOrder: 'asc'
});
```

### Response Format

All `getUsers()` calls return a consistent structure:

```typescript
{
  users: [
    {
      id: string;
      email: string;
      name: string;
      avatar: string | null;
      role: string;
      isActive: boolean;
      designation: string | null;
      employeeId: string | null;
      phone: string | null;
      address: string | null;
      joiningDate: Date | null;
      createdAt: Date;
      updatedAt: Date;
    }
    // ... more users
  ],
  pagination: {
    total: number;        // Total count of users matching filters
    page: number;         // Current page number
    limit: number;        // Number of users per page
    totalPages: number;   // Total number of pages
    hasNext: boolean;     // Whether there are more pages
    hasPrev: boolean;     // Whether there are previous pages
  }
}
```

## Migration from Old Methods

### Before (Multiple Methods)
```typescript
// Old approach - multiple methods
const users = await UserService.findActiveUsers();
const developers = await UserService.findByRole('developer');
const searched = await UserService.searchUsers({ search: 'john' });
// No pagination, inconsistent return formats
```

### After (Unified Method)
```typescript
// New approach - single method with filters
const users = await UserService.getUsers({ isActive: true });
const developers = await UserService.getUsers({ role: 'developer', isActive: true });
const searched = await UserService.getUsers({ search: 'john' });
// Built-in pagination, consistent return format
```

## Benefits

1. **Single Source of Truth**: One method handles all user queries
2. **Built-in Pagination**: Every query supports pagination out of the box
3. **Flexible Filtering**: Combine any filters as needed
4. **Consistent API**: Same return format for all queries
5. **Type Safety**: Full TypeScript support with proper interfaces
6. **Performance**: Efficient database queries with proper indexing support
7. **Maintainable**: Less code duplication, easier to extend and modify
