export default {
  redirects() {
    return [
      {
        source: "/projects/basketball/formballcover.png",
        destination: "/projects/ballform/cover.jpg",
        permanent: true,
      },
      {
        source: "/projects/ballform/cover.png",
        destination: "/projects/ballform/cover.jpg",
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
