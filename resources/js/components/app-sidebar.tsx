import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BriefcaseMedicalIcon, CalendarCheck2Icon, CalendarDays, LayoutGrid, NotebookPen } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItemsPatient: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/pasien/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Janji Periksa',
        href: '/pasien/janji-periksa',
        icon: CalendarCheck2Icon,
    },
];

const mainNavItemsDocter: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dokter/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Obat',
        href: '/dokter/obat',
        icon: BriefcaseMedicalIcon,
    },
    {
        title: 'Jadwal Periksa',
        href: '/dokter/jadwal-periksa',
        icon: CalendarDays,
    },
    {
        title: 'Periksa Pasien',
        href: '/dokter/memeriksa',
        icon: NotebookPen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    const isDokter = auth.user?.role === 'dokter';
    const isPasien = auth.user?.role === 'pasien';
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        {isDokter && (
                            <SidebarMenuButton size="lg" asChild>
                                <Link href="/dashboard/dokter" prefetch>
                                    <AppLogo />
                                </Link>
                            </SidebarMenuButton>
                        )}
                        {isPasien && (
                            <SidebarMenuButton size="lg" asChild>
                                <Link href="/dashboard/pasien" prefetch>
                                    <AppLogo />
                                </Link>
                            </SidebarMenuButton>
                        )}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {isDokter ? <NavMain items={mainNavItemsDocter} /> : isPasien ? <NavMain items={mainNavItemsPatient} /> : null}
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
