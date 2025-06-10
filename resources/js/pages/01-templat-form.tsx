import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { SelectItem } from '@radix-ui/react-select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Memeriksa Pasien',
        href: '/dokter/memeriksa',
    },
];

interface Data {
    data: string;
}

interface pageProps extends SharedData {
    data: Data[];
}

export default function Template() {
    const { data } = usePage<pageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Template" />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border items-center rounded-xl border p-4">
                    <h1 className="text-lg font-black">Template</h1>
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
                            <Label htmlFor="">template</Label>
                            <Input type="text" disabled />
                            <InputError message={''} className="mt-2" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="id_jadwal_periksa">Dokter</Label>
                            <Select value={''} required>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Dokter" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1" className="capitalize">
                                        halo
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={''} className="mt-2" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="keluhan">Keluhan</Label>
                            <Textarea required placeholder="Masukan keluhan anda" />
                            <InputError message={''} className="mt-2" />
                        </div>
                        <div className="flex justify-end">
                            <Button variant={'default'} size={'sm'} className="cursor-pointer">
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
