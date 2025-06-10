import { AlertDialogTemplate } from '@/components/alert-template';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';
import { BadgeAction } from './badge-action';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Jadwal Periksa',
        href: '/dokter/jadwal-periksa',
    },
];

interface JadwalPeriksa {
    [key: string]: string | number;
    id: number;
    id_dokter: number;
    dokter: string;
    hari: string;
    jam_mulai: string;
    jam_selesai: string;
    status: number;
}

interface JadwalPeriksaProps extends SharedData {
    jadwals: JadwalPeriksa[];
}

export default function IndexObat() {
    const {
        data,
        setData,
        delete: destroy,
    } = useForm<JadwalPeriksa>({
        id: 0,
        id_dokter: 0,
        dokter: '',
        hari: '',
        jam_mulai: '',
        jam_selesai: '',
        status: 0,
    });
    const { jadwals, auth } = usePage<JadwalPeriksaProps>().props;
    const [open, setOpen] = useState(false);
    const [nameJadwal, setNameJadwal] = useState('');
    if (!auth.user) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    const handleDelete = (id: number, id_dokter: number) => {
        setData({
            id: id,
            id_dokter: id_dokter,
            dokter: '',
            hari: '',
            jam_mulai: '',
            jam_selesai: '',
            status: 0,
        });
        setOpen(true);
        const jadwalToDelete = jadwals.find((jadwal) => jadwal.id === id);
        if (jadwalToDelete) {
            setNameJadwal(jadwalToDelete.hari);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setNameJadwal('');
    };

    const onAction = () => {
        if (data.id === 0) {
            toast.error('Tidak ada jadwal yang dipilih untuk dihapus', {
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
            toast.error('Tidak ada jadwal yang dipilih untuk dihapus', {
                duration: 5000,
                position: 'top-right',
            });
            return;
        }
        destroy(route('dokter.jadwal.destroy', { id: data.id }), {
            preserveScroll: true,
            onSuccess: () => {
                setData({
                    id: 0,
                    id_dokter: 0,
                    dokter: '',
                    hari: '',
                    jam_mulai: '',
                    jam_selesai: '',
                    status: 0,
                });
                toast.success(`Jadwal hari ${nameJadwal} berhasil dihapus`, {
                    duration: 5000,
                    position: 'top-right',
                });
                setTimeout(() => {
                    // Refresh the page after a successful delete
                    window.location.reload();
                }, 2000);
            },
            onError: (e) => {
                toast.error('Gagal menghapus jadwal', {
                    description: 'Periksa kembali data yang Anda masukkan.',
                    duration: 5000,
                    position: 'top-right',
                });
                console.error('Error deleting jadwal:', e);
            },
        });

        handleClose();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Jadwal Periksa" />
            <AlertDialogTemplate
                open={open}
                title={`Hapus jadwal hari ${nameJadwal}`}
                description={`Apakah anda yakin ingin menghapus jadwal hari ${nameJadwal}`}
                actionText="iya"
                cancelText="tidak"
                onAction={onAction}
                onCancel={handleClose}
                handleClose={handleClose}
            />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border items-center rounded-xl border p-4">
                    <h1 className="text-lg font-black">Jadwal Periksa</h1>
                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border items-center rounded-xl border p-4">
                    <Table className="text-base">
                        <TableCaption>Daftar Jadwal Periksa</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <h1 className="mb-6 text-xl font-black">Tabel daftar Jadwal Periksa</h1>
                                </TableCell>
                                <TableCell className="flex items-center">
                                    <Link href={route('dokter.jadwal.create')}>
                                        <Button className="ml-auto cursor-pointer" size={'sm'} variant={'default'}>
                                            Tambah Jadwal
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="w-[50px]">No</TableCell>
                                <TableHead>Dokter</TableHead>
                                <TableHead>Hari</TableHead>
                                <TableHead>Jam Mulai</TableHead>
                                <TableHead>Jam Selesai</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {jadwals.map((jadwal, index) => (
                                <TableRow key={jadwal.id}>
                                    <TableCell className="w-[100px]">{index + 1}</TableCell>
                                    <TableCell className="capitalize">{jadwal.dokter}</TableCell>
                                    <TableCell className="capitalize">{jadwal.hari}</TableCell>
                                    <TableCell>{jadwal.jam_mulai}</TableCell>
                                    <TableCell>{jadwal.jam_selesai}</TableCell>
                                    <TableCell>
                                        <BadgeAction id_jadwal={jadwal.id} status={jadwal.status} />
                                    </TableCell>
                                    <TableCell className="w-fit">
                                        <Link href={route('dokter.jadwal.edit', { id: jadwal.id })}>
                                            <Button size={'sm'} variant={'secondary'} className="hover:bg-secondary/50 mr-auto cursor-pointer">
                                                Edit
                                            </Button>
                                        </Link>

                                        <Button
                                            size={'sm'}
                                            variant={'destructive'}
                                            className="ml-2 cursor-pointer"
                                            onClick={() => {
                                                handleDelete(jadwal.id, jadwal.id_dokter);
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
                        {JSON.stringify(jadwals, null, 2)}
                    </pre>
                </div>
            </div>
        </AppLayout>
    );
}
