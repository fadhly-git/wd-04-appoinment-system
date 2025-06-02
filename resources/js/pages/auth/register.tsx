import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeClosed, LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { useForm as useHookForm } from 'react-hook-form';
import { z } from 'zod';

// Definisikan schema validasi dengan Zod
const registerSchema = z
    .object({
        name: z.string().min(3, 'Nama minimal 3 karakter'),
        alamat: z.string().min(5, 'Alamat minimal 5 karakter'),
        no_ktp: z.string().min(16, 'Nomor KTP harus 16 digit').max(16, 'Nomor KTP harus 16 digit').regex(/^\d+$/, 'Nomor KTP harus angka'),
        no_hp: z.string().min(10, 'Nomor HP minimal 10 digit').max(15, 'Nomor HP maksimal 15 digit').regex(/^\d+$/, 'Nomor HP harus angka'),
        email: z.string().email('Email tidak valid'),
        password: z
            .string()
            .min(8, 'Password minimal 8 karakter')
            .regex(/[A-Z]/, 'Password harus mengandung huruf besar')
            .regex(/[0-9]/, 'Password harus mengandung angka'),
        password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: 'Password tidak sama',
        path: ['password_confirmation'],
    });

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useHookForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            alamat: '',
            no_ktp: '',
            no_hp: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
    });

    const { post, reset } = useForm();

    // State for managing visibility of password fields
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const onSubmit: FormEventHandler = handleSubmit((data) => {
        // console.log('Form data:', data);
        post(route('register'), {
            data,
            onError: (errors) => {
                Object.entries(errors).forEach(([key, value]) => {
                    setError(key as keyof RegisterForm, { message: value });
                });
            },
            onFinish: () => reset('password', 'password_confirmation'),
        });
    });

    return (
        <AuthLayout title="Create an account" description="Enter your details below to create your account">
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={onSubmit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nama</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            disabled={isSubmitting}
                            placeholder="Full name"
                            {...register('name')}
                        />
                        <InputError message={errors.name?.message} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Alamat Email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            disabled={isSubmitting}
                            placeholder="email@example.com"
                            {...register('email')}
                        />
                        <InputError message={errors.email?.message} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="alamat">Alamat</Label>
                        <Input
                            id="alamat"
                            type="text"
                            required
                            tabIndex={2}
                            autoComplete="address"
                            disabled={isSubmitting}
                            placeholder="Alamat lengkap"
                            {...register('alamat')}
                        />
                        <InputError message={errors.alamat?.message} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="no_ktp">Nomor KTP</Label>
                        <Input
                            id="no_ktp"
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            required
                            tabIndex={2}
                            autoComplete="id-number"
                            disabled={isSubmitting}
                            placeholder="Nomor KTP"
                            {...register('no_ktp')}
                        />
                        <InputError message={errors.no_ktp?.message} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="no_hp">Nomor HP</Label>
                        <Input
                            id="no_hp"
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            required
                            tabIndex={2}
                            autoComplete="phone"
                            disabled={isSubmitting}
                            placeholder="Nomor HP"
                            {...register('no_hp')}
                        />
                        <InputError message={errors.no_hp?.message} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                disabled={isSubmitting}
                                placeholder="Password"
                                {...register('password')}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeClosed className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        <InputError message={errors.password?.message} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Konfirmasi password</Label>
                        <div className="relative">
                            <Input
                                id="password_confirmation"
                                type={showPasswordConfirmation ? 'text' : 'password'}
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                disabled={isSubmitting}
                                placeholder="Confirm password"
                                {...register('password_confirmation')}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                            >
                                {showPasswordConfirmation ? <EyeClosed className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        <InputError message={errors.password_confirmation?.message} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={isSubmitting}>
                        {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Buat Akun
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Sudah mempunyai akun?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
