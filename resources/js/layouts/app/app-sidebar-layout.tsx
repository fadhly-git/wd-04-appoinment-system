import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar">
                <ScrollArea className="h-full w-full">
                    <Toaster />
                    <AppSidebarHeader breadcrumbs={breadcrumbs} />
                    {children}
                    <ScrollBar />
                </ScrollArea>
            </AppContent>
        </AppShell>
    );
}
