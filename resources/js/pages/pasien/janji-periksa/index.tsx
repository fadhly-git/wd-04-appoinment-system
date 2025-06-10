import { AlertDialogTemplate } from '@/components/alert-template';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Obat',
        href: '/dokter/obat',
    },
];

interface JanjiPeriksa {
    [key: string]: string | number;
    id: number;
    id_dokter: number;
    hari: string;
    jam_mulai: string;
    jam_selesai: string;
}

interface Dokter {
    id: number;
    name: string;
    poli: string;
    jadwal_periksa: JanjiPeriksa[];
}

interface FormData {
    [key: string]: string | number;
    id_pasien: number;
    id_jadwal_periksa: string;
    keluhan: string;
}

interface JanjiPeriksaProps extends SharedData {
    dokters: Dokter[];
    janjiPeriksa: JanjiPeriksa[];
}

export default function IndexObat() {
    const { dokters, auth } = usePage<JanjiPeriksaProps>().props;
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [open, setOpen] = useState(false);
    const [nameObat, setNameObat] = useState('');
    const { data, setData, post, errors, processing } = useForm<FormData>({
        id_pasien: auth.user?.id || 0,
        id_jadwal_periksa: '',
        keluhan: '',
    });
    useEffect(() => {
        if (auth.user && isFirstRender) {
            toast.success('Welcome to janji periksa page, ' + auth.user.name, {
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

    const handleClose = () => {
        setOpen(false);
        setNameObat('');
    };

    const handlesubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('pasien.janji-periksa.store'), {
            onSuccess: () => {
                toast.success('Janji periksa berhasil dibuat', {
                    duration: 5000,
                    position: 'top-right',
                });
                setData({
                    id_pasien: auth.user?.id || 0,
                    id_jadwal_periksa: '',
                    keluhan: '',
                });
            },
            onError: (e) => {
                toast.error('Gagal membuat janji periksa', {
                    description: 'Periksa kembali data yang Anda masukkan.' + '\n' + e.error,
                    duration: 5000,
                    position: 'top-right',
                });
                console.error('Error creating janji periksa:', e);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Janji Periksa" />
            <AlertDialogTemplate
                open={open}
                title={`Hapus obat ${nameObat}`}
                description={`Apakah anda yakin ingin menghapus item obat ${nameObat}`}
                actionText="iya"
                cancelText="tidak"
                // onAction={onAction}
                onCancel={handleClose}
                handleClose={handleClose}
            />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border flex flex-1 flex-row items-center justify-between rounded-xl border p-4">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-black">Janji Periksa</h1>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border items-center rounded-xl border p-4">
                    <div className="mb-4 flex flex-col">
                        <h1 className="text-xl font-black">Janji Periksa</h1>
                        <p className="text-sm">
                            Atur jadwal pertemuan dengan dokter untuk mendapatkan layanan konsultasi dan pemeriksaan kesehatan sesuai kebutuhan Anda.
                        </p>
                    </div>
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="no_rm">No rm</Label>
                            <Input type="text" value={auth.user.no_rm} disabled />
                            <InputError message={errors.no_rm} className="mt-2" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="id_jadwal_periksa">Dokter</Label>
                            <Select value={data.id_jadwal_periksa} onValueChange={(value) => setData('id_jadwal_periksa', value)} required>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Dokter" />
                                </SelectTrigger>
                                <SelectContent>
                                    {dokters.map((dokter) =>
                                        dokter.jadwal_periksa.map((jadwal) => (
                                            <SelectItem key={jadwal.id} value={jadwal.id.toString()} className="capitalize">
                                                {`${dokter.name} (${dokter.poli}) - ${jadwal.hari} ${jadwal.jam_mulai} - ${jadwal.jam_selesai}`}
                                            </SelectItem>
                                        )),
                                    )}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.id_jadwal_periksa} className="mt-2" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="keluhan">Keluhan</Label>
                            <Textarea
                                value={data.keluhan}
                                onChange={(e) => setData('keluhan', e.target.value)}
                                required
                                placeholder="Masukan keluhan anda"
                            />
                            <InputError message={errors.no_rm} className="mt-2" />
                        </div>
                        <div className="flex justify-end">
                            <Button
                                variant={'default'}
                                size={'sm'}
                                className="cursor-pointer"
                                disabled={processing}
                                type="submit"
                                onClick={handlesubmit}
                            >
                                Simpan
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            {/* debug */}
            <div className="flex flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border items-center rounded-xl border p-4">
                    <pre className="rounded bg-gray-100 p-4 font-mono text-sm whitespace-pre-wrap dark:bg-gray-800">
                        {/* {JSON.stringify(dokters, null, 2)} */}
                    </pre>
                </div>
            </div>
        </AppLayout>
    );
}
