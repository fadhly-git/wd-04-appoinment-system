import { FlashToast } from '@/components/toast-flashmessage';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Riwayat Periksa',
        href: '/pasien/periksa',
    },
];

interface Obat {
    nama_obat: string;
    kemasan: string;
}

interface RiwayatPeriksa {
    tgl_periksa: string; // "18 Mei 2025 14.39"
    catatan: string;
    obat: Obat[];
    biaya_periksa: number; // 283000
}

interface pageProps extends SharedData {
    riwayat_periksa: RiwayatPeriksa;
}

function formatRupiah(nominal: number | undefined) {
    if (typeof nominal !== 'number' || isNaN(nominal)) return '-';
    return nominal.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
}

export default function Riwayat() {
    const { riwayat_periksa } = usePage<pageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Riwayat Pemeriksaan" />
            <FlashToast />
            <div className="flex flex-1 flex-col items-center p-4">
                <div className="w-full rounded-2xl border bg-white p-6 shadow">
                    <div className="mb-4">
                        <h1 className="text-lg font-bold">Riwayat Pemeriksaan</h1>
                        <p className="text-sm text-gray-500">Informasi lengkap mengenai jadwal pemeriksaan Anda.</p>
                    </div>

                    {/* Detail Pemeriksaan */}
                    <div className="mb-4 rounded-lg border border-fuchsia-300 bg-fuchsia-100">
                        <div className="border-b border-fuchsia-200 px-4 py-2">
                            <span className="font-semibold text-fuchsia-700">Detail Pemeriksaan</span>
                        </div>
                        <div className="flex flex-col px-4 py-4 md:flex-row">
                            <div className="mb-2 flex-1 text-sm md:mb-0">
                                <div className="mb-2 flex flex-col">
                                    <span className="w-40 text-gray-600">Tanggal Periksa</span>
                                    <span className="font-medium">{riwayat_periksa.tgl_periksa}</span>
                                </div>
                            </div>
                            <div className="flex-1 text-sm">
                                <div className="flex flex-col">
                                    <span className="w-24 text-gray-600">Catatan</span>
                                    <span className="font-medium">{riwayat_periksa.catatan}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Daftar Obat */}
                    <div className="mb-4 rounded-lg border border-fuchsia-300 bg-fuchsia-100">
                        <div className="border-b border-fuchsia-200 px-4 py-2">
                            <span className="font-semibold text-fuchsia-700">Daftar Obat Diresepkan</span>
                        </div>
                        <div className="divide-y divide-fuchsia-200">
                            {riwayat_periksa.obat.map((o, idx) => (
                                <div key={idx} className="flex flex-row justify-between px-4 py-2 text-sm">
                                    <span>{o.nama_obat}</span>
                                    <span className="text-gray-500">{o.kemasan}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Biaya */}
                    <div className="mb-4 rounded-lg border border-fuchsia-300 bg-fuchsia-100">
                        <div className="flex flex-row items-center justify-between px-4 py-2">
                            <span className="font-semibold text-fuchsia-700">Biaya Periksa</span>
                            <span className="font-semibold text-fuchsia-700">{formatRupiah(riwayat_periksa.biaya_periksa)}</span>
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

            <div className="flex flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border items-center rounded-xl border p-4">
                    <pre className="rounded bg-gray-100 p-4 font-mono text-sm whitespace-pre-wrap dark:bg-gray-800">
                        {/* {JSON.stringify(riwayat_periksa, null, 2)} */}
                    </pre>
                </div>
            </div>
        </AppLayout>
    );
}
