import "../styles.css";

export const metadata = {
  title: "Ishaan Mehta",
  description: "Ishaan Mehta is a computer engineering student building computer vision, robotics, and useful software.",
};

export const viewport = { themeColor: "#080a0f" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
