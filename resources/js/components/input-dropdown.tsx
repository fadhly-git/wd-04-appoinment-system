import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import * as React from 'react';

interface Medicine {
    id: number;
    nama_obat: string;
    harga_obat?: number;
}

interface ObatDropdownProps {
    value: string[];
    onChange: (value: string[]) => void;
    medicines?: Medicine[];
}

export const ObatDropdown = React.forwardRef<HTMLDivElement, ObatDropdownProps>(({ value, onChange, medicines: propMedicines }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [medicines, setMedicines] = React.useState<Medicine[]>(propMedicines || []);
    const [loading, setLoading] = React.useState(!propMedicines);

    React.useEffect(() => {
        if (propMedicines) {
            setMedicines(propMedicines);
            setLoading(false);
        } else {
            setTimeout(() => {
                setLoading(false);
            }, 300);
        }
    }, [propMedicines]);

    const handleSelect = (id: string) => {
        if (value.includes(id)) {
            onChange(value.filter((v) => v !== id));
        } else {
            onChange([...value, id]);
        }
    };

    const handleRemove = (id: string) => {
        onChange(value.filter((v) => v !== id));
    };

    return (
        <div ref={ref} className="w-full max-w-full">
            <div className="flex flex-col gap-1.5">
                <Label htmlFor="obat" className="text-sm font-medium">
                    Obat <span className="text-red-500">*</span>
                </Label>

                {/* Badges for selected items */}
                <div className="mb-1 flex min-h-[28px] flex-wrap gap-1">
                    {value.length > 0 &&
                        value.map((id) => {
                            const med = medicines.find((m) => m.id === Number(id));
                            return (
                                <Badge key={id} className="pr-1">
                                    <>
                                        {med?.nama_obat || id}
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="ml-1 h-4 w-4 p-0"
                                            onClick={() => handleRemove(id)}
                                            tabIndex={-1}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </>
                                </Badge>
                            );
                        })}
                </div>

                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <button
                            type="button"
                            role="combobox"
                            aria-expanded={open}
                            className="border-input bg-background hover:bg-accent hover:text-accent-foreground focus:ring-ring flex w-full flex-row items-center justify-between rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <span>{value.length === 0 ? 'Pilih obat (bisa lebih dari satu)' : `${value.length} obat dipilih`}</span>
                            <ChevronsUpDown className="h-3 w-3 opacity-50" />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[350px] p-0">
                        <Command>
                            <CommandInput placeholder="Cari obat..." disabled={loading} />
                            <CommandList>
                                <CommandEmpty>Tidak ada data obat</CommandEmpty>
                                <CommandGroup>
                                    {loading ? (
                                        <div className="text-muted-foreground p-2 text-sm">Loading...</div>
                                    ) : (
                                        <>
                                            {medicines.length > 0 &&
                                                medicines.map((medicine) => (
                                                    <CommandItem
                                                        key={medicine.id}
                                                        value={medicine.nama_obat}
                                                        onSelect={() => handleSelect(String(medicine.id))}
                                                        className="flex cursor-pointer gap-2"
                                                    >
                                                        <span className="flex-1">
                                                            {medicine.nama_obat} {`Rp ${(medicine.harga_obat ?? 0).toLocaleString()}`}
                                                        </span>
                                                        {value.includes(String(medicine.id)) && <Check className="text-primary h-4 w-4" />}
                                                    </CommandItem>
                                                ))}
                                        </>
                                    )}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
});
ObatDropdown.displayName = 'ObatDropdown';
