import { FlashToast } from '@/components/toast-flashmessage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Riwayat Periksa',
        href: '/pasien/periksa',
    },
];

interface Dokter {
    id: number;
    name: string;
    poli: string;
}

interface Jadwal {
    id: number;
    id_dokter: number;
    hari: string;
    jam_mulai: string;
    jam_selesai: string;
    status: number;
    dokter?: Dokter;
}

interface JanjiPeriksa {
    id: number;
    id_pasien: number;
    id_jadwal_periksa: number;
    keluhan: string;
    no_antrian: number;
    created_at: string;
    updated_at: string;
    status?: number;
    jadwal?: Jadwal;
}

interface pageProps extends SharedData {
    janjiperiksa: JanjiPeriksa[];
}

function capitalize(str?: string) {
    if (!str) return '-';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatJam(jam?: string) {
    if (!jam) return '-';
    return jam.substring(0, 5);
}

export default function RiwayatPeriksa() {
    const { janjiperiksa } = usePage<pageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Riwayat Periksa" />
            <FlashToast />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border items-center rounded-xl border p-4">
                    <h1 className="text-lg font-black">Riwayat Janji Periksa</h1>
                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                </div>
            </div>
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl border p-4">
                    <h1 className="mb-6 text-xl font-black">Riwayat Janji Periksa</h1>
                    <Table className="text-base font-normal">
                        <TableCaption>Daftar seluruh riwayat janji periksa Anda.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[40px]">No</TableHead>
                                <TableHead>Poliklinik</TableHead>
                                <TableHead>Dokter</TableHead>
                                <TableHead>Hari</TableHead>
                                <TableHead>Mulai</TableHead>
                                <TableHead>Selesai</TableHead>
                                <TableHead>Antrian</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {janjiperiksa && janjiperiksa.length > 0 ? (
                                janjiperiksa.map((item, idx) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{idx + 1}</TableCell>
                                        <TableCell>{item.jadwal?.dokter?.poli ?? '-'}</TableCell>
                                        <TableCell>{item.jadwal?.dokter?.name ?? '-'}</TableCell>
                                        <TableCell>{capitalize(item.jadwal?.hari)}</TableCell>
                                        <TableCell>{formatJam(item.jadwal?.jam_mulai)}</TableCell>
                                        <TableCell>{formatJam(item.jadwal?.jam_selesai)}</TableCell>
                                        <TableCell>{item.no_antrian}</TableCell>
                                        <TableCell>
                                            {item.status === 1 || item.jadwal?.status === 1 ? (
                                                <Badge variant={'outline'} className="bg-green-600 text-xs font-semibold text-white">
                                                    Sudah Diperiksa
                                                </Badge>
                                            ) : (
                                                // <span className="inline-block rounded bg-green-600 px-2 py-1 text-xs font-semibold text-white">
                                                //     Sudah Diperiksa
                                                // </span>
                                                <Badge variant={'outline'} className="bg-yellow-400 px-2 py-1 text-xs font-semibold text-gray-900">
                                                    Belum Diperiksa
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {item.status === 1 || item.jadwal?.status === 1 ? (
                                                <Link href={route('pasien.periksa.riwayat', { id: item.id })}>
                                                    <Button variant="secondary" size="sm">
                                                        Riwayat
                                                    </Button>
                                                </Link>
                                            ) : (
                                                <Link href={route('pasien.periksa.detail', { id: item.id })}>
                                                    <Button size="sm">Detail</Button>
                                                </Link>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={9} className="text-center">
                                        Tidak ada riwayat periksa.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
