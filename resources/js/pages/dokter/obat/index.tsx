import { AlertDialogTemplate } from '@/components/alert-template';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Obat',
        href: '/dokter/obat',
    },
];

interface Obat {
    [key: string]: string | number;
    id: number;
    nama_obat: string;
    kemasan: string;
    harga_obat: number;
}

interface ObatPageProps extends SharedData {
    obats: Obat[];
}

export default function IndexObat() {
    const {
        data,
        setData,
        delete: destroy,
    } = useForm<Obat>({
        id: 0,
        nama_obat: '',
        kemasan: '',
        harga_obat: 0,
    });
    const { obats, auth } = usePage<ObatPageProps>().props;
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [open, setOpen] = useState(false);
    const [nameObat, setNameObat] = useState('');
    useEffect(() => {
        if (auth.user && isFirstRender) {
            toast.success('Welcome to medicine page, ' + auth.user.name, {
                duration: 5000,
                position: 'top-right',
            });
            // Display a welcome message only on the first render
            setIsFirstRender(false);
        }
    }, [auth.user, isFirstRender]);
    if (!auth.user) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    const handleDelete = (id: number) => {
        setData({
            id: id,
            nama_obat: '',
            kemasan: '',
            harga_obat: 0,
        });
        setOpen(true);
        const obatToDelete = obats.find((obat) => obat.id === id);
        if (obatToDelete) {
            setNameObat(obatToDelete.nama_obat);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setNameObat('');
    };

    const onAction = () => {
        if (data.id === 0) {
            toast.error('Tidak ada obat yang dipilih untuk dihapus', {
                duration: 5000,
                position: 'top-right',
            });
            return;
        }
        // Call with a dummy event object
        handleConfirmDelete({ preventDefault: () => {} } as React.FormEvent);
    };

    const handleConfirmDelete: FormEventHandler = (e) => {
        e.preventDefault();
        if (data.id === 0) {
            toast.error('Tidak ada obat yang dipilih untuk dihapus', {
                duration: 5000,
                position: 'top-right',
            });
            return;
        }
        destroy(route('dokter.obat.destroy', { id: data.id }), {
            preserveScroll: true,
            onSuccess: () => {
                setData({
                    id: 0,
                    nama_obat: '',
                    kemasan: '',
                    harga_obat: 0,
                });
                toast.success(`Obat ${nameObat} berhasil dihapus`, {
                    duration: 5000,
                    position: 'top-right',
                });
                setTimeout(() => {
                    // Refresh the page after a successful delete
                    window.location.reload();
                }, 2000);
            },
            onError: (e) => {
                toast.error('Gagal menghapus obat', {
                    description: 'Periksa kembali data yang Anda masukkan.',
                    duration: 5000,
                    position: 'top-right',
                });
                console.error('Error deleting obat:', e);
            },
        });

        handleClose();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Obat" />
            <AlertDialogTemplate
                open={open}
                title={`Hapus obat ${nameObat}`}
                description={`Apakah anda yakin ingin menghapus item obat ${nameObat}`}
                actionText="iya"
                cancelText="tidak"
                onAction={onAction}
                onCancel={handleClose}
                handleClose={handleClose}
            />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border items-center rounded-xl border p-4">
                    <h1 className="text-lg font-black">Obat</h1>
                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border items-center rounded-xl border p-4">
                    <Table className="text-base">
                        <TableCaption>Daftar Obat</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <h1 className="mb-6 text-xl font-black">Tabel daftar obat</h1>
                                </TableCell>
                                <TableCell className="flex items-center">
                                    <Link href={route('dokter.obat.create')}>
                                        <Button className="ml-auto cursor-pointer" size={'sm'} variant={'default'}>
                                            Tambah Obat
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="w-[50px]">No</TableCell>
                                <TableHead>Nama</TableHead>
                                <TableHead className="w-[150px]">Kemasan</TableHead>
                                <TableHead className="w-[150px]">Harga</TableHead>
                                <TableHead className="w-[150px]">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {obats.map((obat, index) => (
                                <TableRow key={obat.id}>
                                    <TableCell className="w-[100px]">{index + 1}</TableCell>
                                    <TableCell className="capitalize">{obat.nama_obat}</TableCell>
                                    <TableCell>{obat.kemasan}</TableCell>
                                    <TableCell>Rp {obat.harga_obat.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Link href={route('dokter.obat.edit', { id: obat.id })}>
                                            <Button size={'sm'} variant={'secondary'} className="hover:bg-secondary/50 mr-auto cursor-pointer">
                                                Edit
                                            </Button>
                                        </Link>

                                        <Button
                                            size={'sm'}
                                            variant={'destructive'}
                                            className="ml-2 cursor-pointer"
                                            onClick={() => {
                                                handleDelete(obat.id);
                                            }}
                                        >
                                            Hapus
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border items-center rounded-xl border p-4">
                    <pre className="rounded bg-gray-100 p-4 font-mono text-sm whitespace-pre-wrap dark:bg-gray-800">
                        {JSON.stringify(obats, null, 2)}
                    </pre>
                </div>
            </div>
        </AppLayout>
    );
}
