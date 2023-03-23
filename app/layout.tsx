import './globals.css';
import { GlobalContextProvider } from './context/GlobalContext';

export const metadata = {
  title: 'Auction Comparison',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  );
}
