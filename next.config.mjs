export default {
  redirects() {
    return [
      {
        source: "/projects/basketball/formballcover.png",
        destination: "/projects/ballform/cover.png",
        permanent: true,
      },
      {
        source: "/projects/basketball/:path*",
        destination: "/projects/ballform/:path*",
        permanent: true,
      },
    ];
  },
};
