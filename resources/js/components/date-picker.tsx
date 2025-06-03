import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, isValid, parse } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React from 'react';

interface datepickerProps {
    date: Date | undefined;
    setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export function DatePicker({ date, setDate }: datepickerProps) {
    const [stringDate, setStringDate] = React.useState<string>('');
    const [dates, setDates] = React.useState<Date | undefined>(date);
    const [errorMessage, setErrorMessage] = React.useState<string>('');

    // Efek samping untuk sinkronisasi `date` dari props ke state lokal
    React.useEffect(() => {
        if (parse(date?.toString() || '', 'yyyy-MM-dd', new Date())) {
            setDates(date); // Sinkronkan `dates` dengan `date` dari props
            setStringDate(format(date ?? new Date(), 'yyyy-MM-dd')); // Format ulang `stringDate`
        } else {
            setDates(undefined);
            setStringDate('');
        }
    }, [date]);

    return (
        <Popover>
            <div className="relative w-[280px]">
                {/* Input Field */}
                <Input
                    type="text"
                    value={stringDate}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        setStringDate(inputValue);

                        // Validasi tanggal
                        const parsedDate = inputValue.length == 10 ? parse(inputValue, 'yyyy-MM-dd', new Date()) : undefined;
                        if (!parsedDate) {
                            setErrorMessage('Invalid Date'); // Menghindari error saat parsing string kosong
                        }
                        if (!isValid(parsedDate)) {
                            setErrorMessage('Invalid Date');
                        } else {
                            // console.log('else :' + parsedDate);
                            setErrorMessage('');
                            setDates(parsedDate);
                            setDate(parsedDate); // Perbarui `date` di komponen induk
                        }
                    }}
                    placeholder="yyyy-MM-dd"
                />
                {/* Pesan Error */}
                {errorMessage && (
                    <div className="absolute bottom-[-1.75rem] left-0 text-sm text-red-400">
                        {errorMessage} {stringDate}
                    </div>
                )}
                {/* Tombol Calendar */}
                <PopoverTrigger asChild>
                    <Button
                        variant={'outline'}
                        className={cn('absolute top-[50%] right-0 translate-y-[-50%] rounded-l-none font-normal', !dates && 'text-muted-foreground')}
                    >
                        <CalendarIcon className="h-4 w-4" />
                    </Button>
                </PopoverTrigger>
            </div>
            {/* Popover Content (Calendar Picker) */}
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={dates}
                    onSelect={(selectedDate) => {
                        if (!selectedDate) return;

                        // Perbarui state lokal dan komponen induk
                        setDates(selectedDate);
                        setStringDate(format(selectedDate, 'yyyy-MM-dd'));
                        setDate(selectedDate);
                        setErrorMessage('');
                    }}
                    defaultMonth={date}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}

interface TimePickerProps {
    time: Date | string | undefined;
    setTime?: React.Dispatch<React.SetStateAction<Date | string | undefined>>;
    onChange?: (time: string) => void;
}

export function TimePicker({ time, setTime, onChange }: TimePickerProps) {
    const [timeString, setTimeString] = React.useState<string>('');
    const [errorMessage, setErrorMessage] = React.useState<string>('');

    // Sinkronisasi awal dari props.time ke string
    React.useEffect(() => {
        if (!time) {
            setTimeString('');
            return;
        }

        let parsed: Date;

        if (typeof time === 'string') {
            // Coba parse sebagai tanggal + waktu terlebih dahulu
            parsed = parse(time, 'yyyy-MM-dd HH:mm', new Date());
            if (!isValid(parsed)) {
                parsed = parse(time, 'HH:mm', new Date());
            }
        } else {
            parsed = time;
        }

        if (isValid(parsed)) {
            const formatted = format(parsed, 'HH:mm');
            setTimeString(formatted);
        } else {
            setTimeString('');
        }
    }, [time]);

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        // Batasi hanya sampai 5 karakter
        if (value.length > 5) return;

        // Hanya izinkan angka dan titik dua
        if (!/^[\d:]*$/.test(value) && value !== '') return;

        // Otomatis tambah titik dua setelah 2 digit
        if (value.length === 2 && !value.includes(':')) {
            value = value + ':';
        }

        setTimeString(value);

        if (value.length < 5) {
            setErrorMessage('');
            return;
        }

        // Parsing waktu dengan benar
        const [hoursStr, minutesStr] = value.split(':').map(Number);

        // Validasi manual jika parsing gagal
        if (isNaN(hoursStr) || isNaN(minutesStr) || hoursStr < 0 || hoursStr > 23 || minutesStr < 0 || minutesStr > 59) {
            setErrorMessage('Invalid Time');
            return;
        }

        setErrorMessage('');

        // Buat Date object berdasarkan jam dan menit
        const dummyDate = new Date();
        dummyDate.setHours(hoursStr, minutesStr, 0, 0);

        if (onChange) {
            onChange(format(dummyDate, 'HH:mm'));
        }

        if (setTime) {
            setTime(dummyDate);
        }
    };

    return (
        <div className="relative w-full max-w-xl">
            <Input
                type="text"
                placeholder="HH:mm"
                value={timeString}
                onChange={handleTimeChange}
                className={cn(errorMessage && 'border-red-500')}
                maxLength={5} // Maksimal 5 karakter
            />
            {errorMessage && <p className="absolute bottom-[-1.75rem] left-0 text-sm text-red-400">{errorMessage}</p>}
        </div>
    );
}
