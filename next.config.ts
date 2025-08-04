import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      // Redirect old routes to new app/* routes
      {
        source: '/dashboard',
        destination: '/app/dashboard',
        permanent: true,
      },
      {
        source: '/projects',
        destination: '/app/projects',
        permanent: true,
      },
      {
        source: '/projects/:path*',
        destination: '/app/projects/:path*',
        permanent: true,
      },
      {
        source: '/sprints',
        destination: '/app/sprints',
        permanent: true,
      },
      {
        source: '/sprints/:path*',
        destination: '/app/sprints/:path*',
        permanent: true,
      },
      {
        source: '/tickets',
        destination: '/app/tickets',
        permanent: true,
      },
      {
        source: '/tickets/:path*',
        destination: '/app/tickets/:path*',
        permanent: true,
      },
      {
        source: '/staff',
        destination: '/app/staff',
        permanent: true,
      },
      {
        source: '/staff/:path*',
        destination: '/app/staff/:path*',
        permanent: true,
      },
      {
        source: '/teams',
        destination: '/app/teams',
        permanent: true,
      },
      {
        source: '/teams/:path*',
        destination: '/app/teams/:path*',
        permanent: true,
      },
      {
        source: '/status',
        destination: '/app/status',
        permanent: true,
      },
      {
        source: '/status/:path*',
        destination: '/app/status/:path*',
        permanent: true,
      },
      {
        source: '/designations',
        destination: '/app/designations',
        permanent: true,
      },
      {
        source: '/designations/:path*',
        destination: '/app/designations/:path*',
        permanent: true,
      },
      {
        source: '/profile',
        destination: '/app/profile',
        permanent: true,
      },
      {
        source: '/profile/:path*',
        destination: '/app/profile/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
