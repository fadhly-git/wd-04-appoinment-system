import { TimePicker } from '@/components/date-picker';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tambah Jadwal Dokter',
        href: '/dokter/jadwal-periksa/create',
    },
];

interface JadwalPeriksa {
    [key: string]: string | number;
    id_dokter: number;
    hari: string;
    jam_mulai: string;
    jam_selesai: string;
    status: number;
}

export default function CreateObat() {
    const { auth } = usePage<SharedData>().props;
    const { data, setData, post, errors, processing } = useForm<JadwalPeriksa>({
        id_dokter: auth.user?.id || 0,
        hari: '',
        jam_mulai: '',
        jam_selesai: '',
        status: 1, // Default status is active
    });
    if (!auth.user) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('dokter.jadwal.store'), {
            onSuccess: () => {
                toast.success('Jadwal berhasil ditambahkan', {
                    duration: 5000,
                    position: 'top-right',
                });
                setData({
                    id_dokter: auth.user?.id || 0,
                    hari: '',
                    jam_mulai: '',
                    jam_selesai: '',
                    status: 1, // Reset to default status
                });
            },
            onError: (e) => {
                toast.error('Gagal menambahkan jadwal', {
                    description: 'Periksa kembali data yang Anda masukkan.' + '\n' + e.error,
                    duration: 5000,
                    position: 'top-right',
                });
                console.error('Error adding jadwal:', e);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Jadwal Periksa" />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border flex flex-1 flex-row items-center justify-between rounded-xl border p-4">
                    <div className="flex">
                        <h1 className="text-lg font-black">Tambah Data Jadwal</h1>
                    </div>
                    <div className="flex">
                        <Link href={route('dokter.jadwal.index')}>
                            <Button variant={'default'} size={'sm'} className="cursor-pointer">
                                Kembali
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border items-center rounded-xl border p-4">
                    <h1 className="mb-6 text-xl font-black">Form Tambah Jadwal</h1>
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="hari">Hari Periksa</Label>
                            <Select value={data.hari} onValueChange={(value) => setData('hari', value)} defaultValue={data.hari} required>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Hari" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="senin">Senin</SelectItem>
                                    <SelectItem value="selasa">Selasa</SelectItem>
                                    <SelectItem value="rabu">Rabu</SelectItem>
                                    <SelectItem value="kamis">Kamis</SelectItem>
                                    <SelectItem value="jumat">Jumat</SelectItem>
                                    <SelectItem value="sabtu">Sabtu</SelectItem>
                                    <SelectItem value="minggu">Minggu</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.hari} className="mt-2" />
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="jam_mulai">Jam Mulai</Label>
                                <TimePicker time={data.jam_mulai} onChange={(value: string) => setData('jam_mulai', value)} />
                                <InputError message={errors.jam_mulai} className="mt-2" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="jam_selesai">Jam Selesai</Label>
                                <TimePicker time={data.jam_selesai} onChange={(value: string) => setData('jam_selesai', value)} />
                                <InputError message={errors.jam_selesai} className="mt-2" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2"></div>
                        <div className="flex justify-end">
                            <Button
                                variant={'default'}
                                size={'sm'}
                                className="cursor-pointer"
                                disabled={processing}
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Simpan
                            </Button>
                        </div>
                    </form>
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
