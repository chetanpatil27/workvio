import { UserService } from '@/backend/services/user';

interface UsersPageProps {
    searchParams: {
        search?: string;
        role?: string;
        active?: string;
        designation?: string;
    };
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
    // Use service directly in Server Component for initial data
    const users = await UserService.searchUsers({
        search: searchParams.search,
        role: searchParams.role ? [searchParams.role] : undefined,
        isActive: searchParams.active ? searchParams.active === 'true' : undefined,
        designation: searchParams.designation
    });

    // Get user statistics for dashboard cards
    const stats = await UserService.getUserStats();

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Add User
                </button>
            </div>

            {/* Stats overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>

                {stats.roleStats.map((stat: { role: string; _count: { id: number } }) => (
                    <div key={stat.role} className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-sm font-medium text-gray-500 capitalize">{stat.role}s</h3>
                        <p className="text-2xl font-bold text-blue-600">{stat._count.id}</p>
                    </div>
                ))}
            </div>

            {/* Filter controls */}
            <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-700">Status:</label>
                        <select className="border rounded px-2 py-1 text-sm">
                            <option value="">All</option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <label className="text-sm font-medium text-gray-700">Role:</label>
                        <select className="border rounded px-2 py-1 text-sm">
                            <option value="">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="developer">Developer</option>
                            <option value="tester">Tester</option>
                        </select>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="border rounded px-3 py-1 text-sm"
                            defaultValue={searchParams.search || ''}
                        />
                    </div>
                </div>
            </div>

            {/* User list display */}
            <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Users ({users.length})</h2>
                </div>
                <div className="divide-y divide-gray-200">
                    {users.map((user: {
                        id: string;
                        name: string;
                        email: string;
                        avatar?: string | null;
                        role: string;
                        isActive: boolean;
                    }) => (
                        <div key={user.id} className="px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                    {user.avatar ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                                    ) : (
                                        <span className="text-sm font-medium text-gray-700">
                                            {user.name.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">{user.name}</h3>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className={`px-2 py-1 text-xs rounded-full ${user.role === 'admin' ? 'bg-red-100 text-red-800' :
                                        user.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                                            user.role === 'developer' ? 'bg-green-100 text-green-800' :
                                                'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {user.role}
                                </span>
                                <span className={`px-2 py-1 text-xs rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {user.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
