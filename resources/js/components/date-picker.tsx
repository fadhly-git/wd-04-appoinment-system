import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, isValid, parse } from 'date-fns';
import { CalendarIcon, ClockIcon } from 'lucide-react';
import React from 'react';

interface DatePickerProps {
    date?: string;
    setDate?: (val?: string) => void;
}

export function DatePicker({ date, setDate }: DatePickerProps) {
    const [stringDate, setStringDate] = React.useState<string>('');
    const [dates, setDates] = React.useState<Date | undefined>(undefined);
    const [errorMessage, setErrorMessage] = React.useState<string>('');

    // Sync date prop to internal state
    React.useEffect(() => {
        if (date) {
            const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
            if (isValid(parsedDate)) {
                setDates(parsedDate);
                setStringDate(date);
            } else {
                setDates(undefined);
                setStringDate('');
            }
        } else {
            setDates(undefined);
            setStringDate('');
        }
    }, [date]);

    return (
        <Popover>
            <div className="relative w-full">
                {/* Input Field */}
                <Input
                    type="text"
                    value={stringDate}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        setStringDate(inputValue);

                        // Only validate when input is 10 or 19 characters
                        if (inputValue.length === 19) {
                            const parsedDate = parse(inputValue, 'yyyy-MM-dd', new Date());
                            if (isValid(parsedDate)) {
                                setErrorMessage('');
                                setDates(parsedDate);
                                if (setDate) {
                                    setDate(format(parsedDate, 'yyyy-MM-dd'));
                                }
                            } else {
                                setErrorMessage('Invalid Date & Time');
                                setDates(undefined);
                            }
                        } else if (inputValue.length === 10) {
                            // Only date part, auto append 00:00:00
                            const parsedDate = parse(inputValue, 'yyyy-MM-dd', new Date());
                            if (isValid(parsedDate)) {
                                setErrorMessage('');
                                setDates(parsedDate);
                                if (setDate) {
                                    setDate(format(parsedDate, 'yyyy-MM-dd'));
                                }
                            } else {
                                setErrorMessage('Invalid Date');
                                setDates(undefined);
                            }
                        } else if (inputValue.length === 0) {
                            // Clear date if input is empty
                            setErrorMessage('');
                            setDates(undefined);
                            if (setDate) {
                                setDate('');
                            }
                        } else {
                            // Don't show error while typing
                            setErrorMessage('');
                        }
                    }}
                    placeholder="yyyy-MM-dd"
                    className={cn(errorMessage && 'border-red-500')}
                />

                {/* Error Message */}
                {errorMessage && <div className="absolute bottom-[-1.75rem] left-0 text-sm text-red-400">{errorMessage}</div>}

                {/* Calendar Button */}
                <PopoverTrigger asChild>
                    <Button
                        variant={'outline'}
                        className={cn('absolute top-[50%] right-0 translate-y-[-50%] rounded-l-none font-normal', !dates && 'text-muted-foreground')}
                    >
                        <CalendarIcon className="h-4 w-4" />
                    </Button>
                </PopoverTrigger>
            </div>

            {/* Calendar Popover */}
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={dates}
                    onSelect={(selectedDate) => {
                        if (!selectedDate) return;

                        setDates(selectedDate);
                        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
                        setStringDate(formattedDate);
                        if (setDate) {
                            setDate(formattedDate);
                        }
                        setErrorMessage('');
                    }}
                    defaultMonth={dates}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}

interface TimePickerProps {
    time?: string;
    onChange?: (time: string) => void;
}

export function TimePicker({ time, onChange }: TimePickerProps) {
    const [timeString, setTimeString] = React.useState<string>(time || '');
    const [showPopover, setShowPopover] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string>('');

    // Sinkronisasi dari prop
    React.useEffect(() => {
        if (time !== undefined) setTimeString(time);
    }, [time]);

    // Validasi dan event
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        // Validasi manual
        if (!/^\d{0,2}:?\d{0,2}$/.test(value)) return;
        if (value.length === 2 && !value.includes(':')) value += ':';
        setTimeString(value);

        if (value.length === 5) {
            const [hh, mm] = value.split(':');
            const h = Number(hh),
                m = Number(mm);
            if (isNaN(h) || isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) {
                setErrorMessage('Invalid Time');
            } else {
                setErrorMessage('');
                onChange?.(value);
            }
        } else {
            setErrorMessage('');
        }
    };

    // Jam & menit untuk popover
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));

    return (
        <Popover open={showPopover} onOpenChange={setShowPopover}>
            <div className="relative w-full max-w-xl">
                <Input
                    type="text"
                    placeholder="HH:mm"
                    value={timeString}
                    onChange={handleInputChange}
                    className={cn(errorMessage && 'border-red-500', 'pl-10')}
                    maxLength={5}
                />
                {/* Ikon jam di dalam input */}
                <span className="text-muted-foreground pointer-events-none absolute top-[50%] left-3 translate-y-[-50%]">
                    <ClockIcon className="h-4 w-4" />
                </span>
                {/* Tombol popover */}
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant={'outline'}
                        className={cn('absolute top-[50%] right-0 translate-y-[-50%] rounded-l-none px-2 font-normal')}
                        tabIndex={-1}
                    >
                        <ClockIcon className="h-4 w-4" />
                    </Button>
                </PopoverTrigger>
                {errorMessage && <p className="absolute bottom-[-1.75rem] left-0 text-sm text-red-400">{errorMessage}</p>}
            </div>
            {/* Popover jam-menit */}
            <PopoverContent className="flex w-auto flex-row gap-2 p-2">
                {/* List jam */}
                <div className="flex max-h-40 flex-col gap-1 overflow-y-auto">
                    {hours.map((hh) => (
                        <button
                            key={hh}
                            className="hover:bg-accent rounded px-2 py-1 text-sm"
                            onClick={() => {
                                const m = timeString.split(':')[1] || '00';
                                const newVal = `${hh}:${m}`;
                                setTimeString(newVal);
                                onChange?.(newVal);
                                setShowPopover(false);
                            }}
                        >
                            {hh}
                        </button>
                    ))}
                </div>
                <span className="flex flex-col items-center justify-center">:</span>
                {/* List menit */}
                <div className="flex max-h-40 flex-col gap-1 overflow-y-auto">
                    {minutes.map((mm) => (
                        <button
                            key={mm}
                            className="hover:bg-accent rounded px-2 py-1 text-sm"
                            onClick={() => {
                                const h = timeString.split(':')[0] || '00';
                                const newVal = `${h}:${mm}`;
                                setTimeString(newVal);
                                onChange?.(newVal);
                                setShowPopover(false);
                            }}
                        >
                            {mm}
                        </button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}

interface DateTimeFieldProps {
    value?: string;
    onChange?: (val: string) => void;
}

export function DateTimeField({ value, onChange }: DateTimeFieldProps) {
    // Pecah value awal (hanya saat mount)
    const [date, setDate] = React.useState<string>(value ? value.substring(0, 10) : '');
    const [time, setTime] = React.useState<string>(value ? value.substring(11, 16) : '');

    // Hanya update state jika value berubah dari luar (controlled), optional:
    React.useEffect(() => {
        if (value) {
            setDate(value.substring(0, 10));
            setTime(value.substring(11, 16));
        }
    }, [value]);

    // Handler untuk perubahan tanggal
    const handleDateChange = (val?: string) => {
        const newDate = val ? val.substring(0, 10) : '';
        setDate(newDate);
        if (newDate && time) {
            onChange?.(`${newDate} ${time}:00`);
        }
    };

    // Handler untuk perubahan waktu
    const handleTimeChange = (val: string) => {
        setTime(val);
        if (date && val) {
            onChange?.(`${date} ${val}:00`);
        }
    };

    return (
        <div className="flex gap-2">
            <DatePicker date={date ? `${date}` : ''} setDate={handleDateChange} />
            <TimePicker time={time} onChange={handleTimeChange} />
        </div>
    );
}
