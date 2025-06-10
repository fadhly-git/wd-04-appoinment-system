import { DateTimeField } from '@/components/date-picker';
import { ObatDropdown } from '@/components/input-dropdown';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect, useRef } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Memeriksa Pasien',
        href: '/dokter/memeriksa',
    },
];

interface Obat {
    id: number;
    nama_obat: string;
    harga_obat: number;
}

interface detailPeriksa {
    id_obat: number;
}

interface Data {
    id: number;
    name: string;
    id_jadwal_periksa: number;
    catatan: string;
    tanggal_periksa: string;
    biaya_periksa: number;
    detail_periksa: detailPeriksa[];
    obats: Obat[];
}

interface pageProps extends SharedData {
    datas: Data;
}

export default function EditPeriksa() {
    const inputRef = useRef(null);
    const biayaPeriksa = 15000;
    const { datas } = usePage<pageProps>().props;
    const { data, setData, patch, errors, processing } = useForm({
        tanggal_periksa: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        name: datas.name,
        catatan: '',
        obat: [] as string[],
        biaya_periksa: 0,
    });

    useEffect(() => {
        setData({
            tanggal_periksa: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            name: datas.name,
            catatan: datas.catatan,
            obat: datas.detail_periksa.map((d) => d.id_obat.toString()),
            biaya_periksa: datas.biaya_periksa,
        });
    }, [datas, setData]);

    useEffect(() => {
        // Hitung total harga obat terpilih
        const biayaObat = data.obat.reduce((total, obatId) => {
            const obat = datas.obats.find((o) => o.id === parseInt(obatId));
            return total + (obat ? obat.harga_obat : 0);
        }, 0);
        // Update data.biaya_periksa pakai setData agar reaktif
        setData('biaya_periksa', biayaPeriksa + biayaObat);
    }, [data.obat, datas.obats, setData]);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('dokter.memeriksa.update', { id: datas.id }), {
            onSuccess: () => {
                // Reset form after successful submission
                setData({
                    tanggal_periksa: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                    name: datas.name,
                    catatan: '',
                    obat: [],
                    biaya_periksa: 0,
                });
            },
            onError: (errors) => {
                console.error('Error submitting form:', errors);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Template" />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border items-center rounded-xl border p-4">
                    <h1 className="text-lg font-black">Periksa Pasien</h1>
                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border items-center rounded-xl border p-4">
                    <div className="mb-4 flex flex-col">
                        <h1 className="text-xl font-black">Janji Periksa</h1>
                        <p className="text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nihil eveniet deleniti porro animi asperiores nam
                            eligendi quibusdam iste vel.
                        </p>
                    </div>
                    <form className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="">Pasien</Label>
                            <Input type="text" value={datas.name} disabled />
                            {/* <InputError message={errors} className="mt-2" /> */}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="">Tanggal Periksa</Label>
                            <DateTimeField value={data.tanggal_periksa} onChange={(value) => setData('tanggal_periksa', value)} />
                            <InputError message={errors.tanggal_periksa} className="mt-2" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="catatan">Catatan</Label>
                            <Textarea
                                required
                                placeholder="Masukan catatan untuk pasien"
                                value={data.catatan}
                                onChange={(e) => setData('catatan', e.target.value)}
                            />
                            <InputError message={errors.catatan} className="mt-2" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <ObatDropdown value={data.obat} onChange={(val) => setData('obat', val)} medicines={datas.obats} ref={inputRef} />
                            <InputError message={errors.obat} className="mt-2" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="biaya_periksa">Biaya Periksa</Label>
                            <Input type="text" value={data.biaya_periksa === 0 ? '' : `Rp ${data.biaya_periksa.toLocaleString()}`} readOnly />
                            <InputError message={errors.biaya_periksa} className="mt-2" />
                        </div>
                        <div className="flex justify-end">
                            <Button variant={'default'} size={'sm'} className="cursor-pointer" disabled={processing} onClick={handleSubmit}>
                                {processing ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Simpan
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border items-center rounded-xl border p-4">
                    <pre className="rounded bg-gray-100 p-4 font-mono text-sm whitespace-pre-wrap dark:bg-gray-800">
                        {JSON.stringify(datas, null, 2)}
                    </pre>
                </div>
            </div>
        </AppLayout>
    );
}
