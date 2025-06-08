/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Jadwal Periksa',
        href: '/dokter/jadwal-periksa',
    },
];

interface data {
    id: number;
    id_pasien: number;
    keluhan: string;
    no_antrian: number;
    pasien: {
        name: string;
    };
    periksa: {
        id: number;
        id_janji_periksa: number;
        tgl_periksa: string;
        no_antrian: number;
    }; // Adjust type as needed
}

interface pageProps extends SharedData {
    data: data[];
}

export default function PeriksaPasien() {
    const { data } = usePage<pageProps>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Memeriksa" />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border items-center rounded-xl border p-4">
                    <h1 className="text-lg font-black">Memeriksa Pasien</h1>
                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border items-center rounded-xl border p-4">
                    <div className="w-full overflow-x-hidden">
                        <Table className="text-base">
                            <TableCaption>Daftar periksa</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <h1 className="mb-6 text-xl font-black">Tabel daftar periksa</h1>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead className="w-[50px]">No</TableHead>
                                    <TableHead className="w-[150px]">Nama Pasien</TableHead>
                                    <TableHead>Keluhan</TableHead>
                                    <TableHead className="w-[150px]">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data
                                    .sort((a, b) => a.no_antrian - b.no_antrian)
                                    .map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="w-[50px] align-top">{item.no_antrian}</TableCell>
                                            <TableCell className="align-top">{item.pasien.name}</TableCell>
                                            <TableCell className="align-top whitespace-normal">{item.keluhan}</TableCell>
                                            <TableCell>
                                                {!item.periksa ? (
                                                    <Link href={route('dokter.memeriksa.periksa', { id: item.id })}>
                                                        <Button>Periksa</Button>
                                                    </Link>
                                                ) : (
                                                    <Button className="hover:bg-black/50 hover:text-white" variant="secondary">
                                                        Edit
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </div>
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
