import { Badge } from '@/components/ui/badge';
import { useForm } from '@inertiajs/react';
import { CircleCheck, CircleMinus } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

interface BadgeActionProps {
    id_jadwal: number;
    status: number;
}

interface UpdateStatusProps {
    [key: string]: number | string;
    id_jadwal: number;
}

export const BadgeAction = ({ status, id_jadwal }: BadgeActionProps) => {
    const { data, setData, patch } = useForm<UpdateStatusProps>({
        id_jadwal: id_jadwal,
    });
    const handleClick: FormEventHandler = (e) => {
        e.preventDefault();
        setData('id_jadwal', id_jadwal);
        patch(route('dokter.jadwal.update.status', { id: data.id_jadwal }), {
            onSuccess: () => {
                toast.success(`Status updated to ${data.status === 1 ? 'Aktif' : 'Non Aktif'} for ID Jadwal: ${id_jadwal}`, {
                    duration: 3000,
                    position: 'top-right',
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1500); // Reload the page to reflect changes
            },
            onError: (errors) => {
                toast.error(`Failed to update status for ID Jadwal: ${id_jadwal}`, {
                    description: String(errors.error),
                    duration: 3000,
                    position: 'top-right',
                });
                console.error('Failed to update status:', errors);
            },
        });
    };
    return (
        <Badge variant={'outline'} className="text-muted-foreground cursor-pointer px-1.5" onClick={handleClick}>
            {status === 1 ? (
                <CircleCheck className="text-green-500 dark:text-green-400" />
            ) : (
                <CircleMinus className="text-red-500 dark:text-red-400" />
            )}
            {status === 1 ? 'Aktif' : 'Non Aktif'}
        </Badge>
    );
};
