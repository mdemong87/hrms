import { SidebarProvider } from '@/context/SidebarContext';


export default function Layout({ children }) {
    return (
        <div>
            <SidebarProvider>{children}</SidebarProvider>
        </div>
    );
}
