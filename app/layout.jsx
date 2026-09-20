import "../styles.css";
import Script from "next/script";

export const metadata = {
  title: "Ishaan Mehta",
  description: "Ishaan Mehta is a computer engineering student building computer vision, robotics, and useful software.",
};

export const viewport = { themeColor: "#080a0f" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XT5F1M97WG" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XT5F1M97WG');`}
        </Script>
      </body>
    </html>
  );
}
