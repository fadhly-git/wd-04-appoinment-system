import { FlashToast } from '@/components/toast-flashmessage';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Detail Periksa',
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
    janjiPeriksa: JanjiPeriksa;
}

function formatJam(jam?: string) {
    if (!jam) return '-';
    return jam.substring(0, 5);
}

export default function Template() {
    const { janjiPeriksa } = usePage<pageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Periksa" />
            <FlashToast />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border items-center rounded-xl border p-4">
                    <h1 className="text-lg font-black">Detail Janji Periksa</h1>
                </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border items-center rounded-xl border p-4">
                    <div className="flex flex-col">
                        <h1 className="text-lg font-black">Detail Janji Periksa</h1>
                        <p className="text-base">Informasi lengkap terkait jadwal permeriksaan anda</p>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border mt-8 items-center rounded-xl border bg-white p-4">
                        <div className="flex w-full flex-col gap-4 md:flex-row">
                            <div className="flex flex-grow flex-col gap-2">
                                <div className="flex w-full flex-row items-center justify-between rounded-sm border border-gray-200 bg-fuchsia-50 px-4 py-2 dark:border-gray-600">
                                    <div>
                                        <h2 className="text-base font-medium text-gray-600">Poliklinik</h2>
                                    </div>
                                    <div>
                                        <h2 className="text-base font-bold text-gray-900">{janjiPeriksa.jadwal?.dokter?.poli || '-'}</h2>
                                    </div>
                                </div>
                                <div className="flex w-full flex-row items-center justify-between rounded-sm border border-gray-200 bg-fuchsia-50 px-4 py-2 dark:border-gray-600">
                                    <div>
                                        <h2 className="text-base font-medium text-gray-600">Nama Dokter</h2>
                                    </div>
                                    <div>
                                        <h2 className="text-base font-bold text-gray-900">{janjiPeriksa.jadwal?.dokter?.name || '-'}</h2>
                                    </div>
                                </div>
                                <div className="flex w-full flex-row items-center justify-between rounded-sm border border-gray-200 bg-fuchsia-50 px-4 py-2 dark:border-gray-600">
                                    <div>
                                        <h2 className="text-base font-medium text-gray-600">Hari Pemeriksaan</h2>
                                    </div>
                                    <div>
                                        <h2 className="text-base font-bold text-gray-900">{janjiPeriksa.jadwal?.hari || '-'}</h2>
                                    </div>
                                </div>
                                <div className="flex w-full flex-row items-center justify-between rounded-sm border border-gray-200 bg-fuchsia-50 px-4 py-2 dark:border-gray-600">
                                    <div>
                                        <h2 className="text-base font-medium text-gray-600">Jam Mulai</h2>
                                    </div>
                                    <div>
                                        <h2 className="text-base font-bold text-gray-900">{formatJam(janjiPeriksa.jadwal?.jam_mulai)}</h2>
                                    </div>
                                </div>
                                <div className="flex w-full flex-row items-center justify-between rounded-sm border border-gray-200 bg-fuchsia-50 px-4 py-2 dark:border-gray-600">
                                    <div>
                                        <h2 className="text-base font-medium text-gray-600">Jam Selesai</h2>
                                    </div>
                                    <div>
                                        <h2 className="text-base font-bold text-gray-900">{formatJam(janjiPeriksa.jadwal?.jam_selesai)}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center md:w-1/3">
                                <div className="flex h-full w-full flex-col items-center justify-center rounded-sm border border-gray-200 bg-fuchsia-50 py-8 hover:bg-fuchsia-100 dark:border-gray-600">
                                    <span className="mb-2 text-sm text-gray-600">Nomor Antrian Anda</span>
                                    <div className="flex items-center justify-center">
                                        <span className="inline-block rounded-lg bg-fuchsia-600 px-8 py-4 text-3xl font-extrabold text-white shadow hover:bg-fuchsia-700">
                                            {janjiPeriksa.no_antrian}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <Link
                                href="/pasien/periksa"
                                className="inline-block rounded-xl bg-fuchsia-300 px-4 py-2 text-sm font-semibold text-white transition hover:bg-fuchsia-500"
                            >
                                Kembali
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border items-center rounded-xl border p-4">
                    <pre className="rounded bg-gray-100 p-4 font-mono text-sm whitespace-pre-wrap dark:bg-gray-800">
                        {/* {JSON.stringify(janjiPeriksa, null, 2)} */}
                    </pre>
                </div>
            </div>
        </AppLayout>
    );
}
