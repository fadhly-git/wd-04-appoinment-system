import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Obat',
        href: '/obat/create',
    },
];

interface Obat {
    [key: string]: string | number;
    nama_obat: string;
    kemasan: string;
    harga_obat: number;
}

export default function CreateObat() {
    const { auth } = usePage<SharedData>().props;
    const { data, setData, post, errors, processing } = useForm<Obat>({
        nama_obat: '',
        kemasan: '',
        harga_obat: 0,
    });
    if (!auth.user) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('dokter.obat.store'), {
            onSuccess: () => {
                toast.success('Obat berhasil ditambahkan', {
                    duration: 5000,
                    position: 'top-right',
                });
                setData({
                    nama_obat: '',
                    kemasan: '',
                    harga_obat: 0,
                });
            },
            onError: (e) => {
                toast.error('Gagal menambahkan obat', {
                    description: 'Periksa kembali data yang Anda masukkan.',
                    duration: 5000,
                    position: 'top-right',
                });
                console.error('Error adding obat:', e);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Obat" />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border flex flex-1 flex-row items-center justify-between rounded-xl border p-4">
                    <div className="flex">
                        <h1 className="text-lg font-black">Tambah Data Obat</h1>
                    </div>
                    <div className="flex">
                        <Link href={route('dokter.obat.index')}>
                            <Button variant={'default'} size={'sm'} className="cursor-pointer">
                                Kembali
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border items-center rounded-xl border p-4">
                    <h1 className="mb-6 text-xl font-black">Form Tambah Obat</h1>
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="nama_obat">Nama Obat</Label>
                            <Input type="text" value={data.nama_obat} onChange={(e) => setData('nama_obat', e.target.value)} />
                            <InputError message={errors.nama_obat} className="mt-2" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="kemasan">Kemasan</Label>
                            <Input type="text" value={data.kemasan} onChange={(e) => setData('kemasan', e.target.value)} />
                            <InputError message={errors.kemasan} className="mt-2" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="harga_obat">Harga Obat</Label>
                            <Input
                                type="text"
                                value={data.harga_obat === 0 ? '' : `Rp ${data.harga_obat.toLocaleString()}`}
                                onChange={(e) => {
                                    // Remove non-digit characters
                                    const numericValue = e.target.value.replace(/[^\d]/g, '');
                                    setData('harga_obat', numericValue ? parseInt(numericValue, 10) : 0);
                                }}
                            />
                            <InputError message={errors.harga_obat} className="mt-2" />
                        </div>
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
