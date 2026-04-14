import { AssetsVectors } from '@/assets/vectors';
import { isModeDev } from '@/components/config/flavor';
import AppBrand from '@/components/ui/AppBrand';
import { MainCard } from '@/components/ui/AppCard';
import { AppNotify } from '@/components/ui/AppNotify';
import { Button } from '@/components/ui/shadcn/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/shadcn/field';
import { Input } from '@/components/ui/shadcn/input';
import Spacer from '@/components/ui/Spacer';
import { ROUTES } from '@/core/constants/routes.constant';
import { fromApiResult } from '@/lib/query.adapter';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { HiEye, HiEyeSlash, HiLockClosed, HiUser } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import z from 'zod';
import { LoginDto } from '../data/dto/auth.dto';
import { AuthRemote } from '../data/remote_source/auth.remote';
import { useAuthStore } from '../store/auth.store';

const formAuthScheme = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

// Pisahkan input type dan output type karena ada .transform()
type AuthFormValues = z.input<typeof formAuthScheme>;
export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(formAuthScheme),
    defaultValues: { username: '', password: '' },
  });

  const { mutateAsync: sending, isPending: isSending } = useMutation({
    mutationFn: (data: LoginDto) => AuthRemote.login(data).then(fromApiResult),
    onSuccess: () => {
      form.reset();
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values: z.output<typeof formAuthScheme>) => {
    try {
      await sending(values);

      setAuth({
        username: values.username,
      });
      AppNotify.success({
        title: 'Berhasil login',
        description: 'Selamat datang di aplikasi, menuju ke dashboard...',
        options: {
          autoClose: 3000,
          onClose: () => {
            navigate(ROUTES.DASHBOARD);
          },
        },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Gagal login';
      AppNotify.error({ title: 'Gagal login', description: message });
    }
  };

  const styleIconForm = 'w-5 h-5 ';

  const formLogin = (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
      <FieldGroup>
        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Username</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                type="text"
                prefixIcon={<HiUser className={styleIconForm} />}
                placeholder="Masukkan username anda"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Kata Sandi</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                type={showPassword ? 'text' : 'password'}
                prefixIcon={<HiLockClosed className={styleIconForm} />}
                suffixIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer rounded p-0.5 transition-opacity duration-150 hover:opacity-70"
                  >
                    {showPassword ? (
                      <HiEye className={styleIconForm} />
                    ) : (
                      <HiEyeSlash className={styleIconForm} />
                    )}
                  </button>
                }
                placeholder="Masukkan kata sandi anda"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button className="w-full" type="submit" isLoading={isSending}>
          Masuk
        </Button>
      </FieldGroup>
    </form>
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4 md:p-6 lg:p-8">
      <AppBrand isClickable={false} />
      {/* card */}
      <MainCard className="flex w-full max-w-4xl flex-row gap-10 rounded-3xl" showShadow>
        {/* Illustration */}
        <div className="flex w-full max-w-2xl justify-center">
          <AssetsVectors.LoginIllustration />
        </div>
        <div className="flex w-full flex-col">
          <Spacer />
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-100" />
            <span className="text-xs text-slate-400">Masuk ke akun anda</span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>
          {/* Form */}
          {formLogin}
          {/* Dev Buttons */}
          {isModeDev && buttonDev()}
          <Spacer />
        </div>
      </MainCard>
    </div>
  );

  function buttonDev() {
    return (
      <div className="mt-5 flex flex-col items-center gap-3">
        <span className="text-subtitle text-xs">--- Mode Development ---</span>
        <Button className="w-full" variant="outline" onClick={() => navigate(ROUTES.DASHBOARD)}>
          Masuk
        </Button>
      </div>
    );
  }
}
