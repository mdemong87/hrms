import { ThemeProvider } from '@/context/ThemeContext';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
    subsets: ["latin"],
});



export const metadata = {
    title: "Sardar IT - HRMS",
    description: "Sardar IT - HRMS",
};



export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${outfit.className} dark:bg-gray-900`}>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
