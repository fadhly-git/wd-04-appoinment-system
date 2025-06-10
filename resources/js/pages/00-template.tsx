import { FlashToast } from '@/components/toast-flashmessage';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'template',
        href: '/',
    },
];

interface Data {
    data: string;
}

interface pageProps extends SharedData {
    data: Data[];
}

export default function Template() {
    const { data } = usePage<pageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Template" />
            <FlashToast />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border items-center rounded-xl border p-4">
                    <h1 className="text-lg font-black">Template</h1>
                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border items-center rounded-xl border p-4">
                    <Table className="text-base">
                        <TableCaption>Ini template</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <h1 className="mb-6 text-xl font-black">Tabel template</h1>
                                </TableCell>
                                <TableCell className="flex items-center">
                                    <Link href={'#'}>
                                        <Button className="ml-auto cursor-pointer" size={'sm'} variant={'default'}>
                                            Template
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                            <TableCell className="w-[50px]">No</TableCell>
                            <TableHead>template</TableHead>
                            <TableHead>template</TableHead>
                            <TableHead>template</TableHead>
                            <TableHead>template</TableHead>
                            <TableHead>template</TableHead>
                            <TableHead>template</TableHead>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>template</TableCell>
                                <TableCell>template</TableCell>
                                <TableCell>template</TableCell>
                                <TableCell>template</TableCell>
                                <TableCell>template</TableCell>
                                <TableCell>template</TableCell>
                                <TableCell>template</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border items-center rounded-xl border p-4">
                    <pre className="rounded bg-gray-100 p-4 font-mono text-sm whitespace-pre-wrap dark:bg-gray-800">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>
            </div>
        </AppLayout>
    );
}
