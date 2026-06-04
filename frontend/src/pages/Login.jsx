import { useContext, useEffect, useMemo, useState } from 'react'
import { ShopContext } from '../context/shop-context';
import axios from 'axios';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const getAuthSchema = (mode) => z.object({
  name: z.string().optional(),
  email: z.string().trim().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
}).superRefine((data, ctx) => {
  if (mode === 'Sign Up' && !data.name?.trim()) {
    ctx.addIssue({
      code: 'custom',
      path: ['name'],
      message: 'Enter your name',
    });
  }
});

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)
  const authSchema = useMemo(() => getAuthSchema(currentState), [currentState]);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    mode: 'onTouched',
  });

  const onSubmitHandler = async (data) => {
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', {
          name: data.name,
          email: data.email,
          password: data.password,
        })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', {
          email: data.email,
          password: data.password,
        })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  const switchMode = (mode) => {
    setCurrentState(mode);
    clearErrors();
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [navigate, token])

  return (
    <div className='border-t border-neutral-200 py-14 sm:py-20'>
      <form onSubmit={handleSubmit(onSubmitHandler)} className='mx-auto flex w-full max-w-md flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-6 text-neutral-800 shadow-sm sm:p-8'>
        <div className='mb-2'>
          <p className='text-sm uppercase tracking-[0.2em] text-neutral-500'>Account</p>
          <h1 className='prata-regular mt-2 text-4xl text-neutral-950'>{currentState}</h1>
        </div>
        {currentState === 'Login' ? null : (
          <label>
            <input {...register('name')} type="text" className='form-field' placeholder='Name' autoComplete='name' />
            {errors.name && <p className='mt-1.5 text-xs text-red-600'>{errors.name.message}</p>}
          </label>
        )}
        <label>
          <input {...register('email')} type="email" className='form-field' placeholder='Email' autoComplete='email' />
          {errors.email && <p className='mt-1.5 text-xs text-red-600'>{errors.email.message}</p>}
        </label>
        <label>
          <input {...register('password')} type="password" className='form-field' placeholder='Password' autoComplete={currentState === 'Login' ? 'current-password' : 'new-password'} />
          {errors.password && <p className='mt-1.5 text-xs text-red-600'>{errors.password.message}</p>}
        </label>
        <div className='flex w-full justify-between gap-4 text-sm text-neutral-500'>
          <p className='cursor-pointer transition hover:text-neutral-950'>Forgot your password?</p>
          {
            currentState === 'Login'
              ? <p onClick={() => switchMode('Sign Up')} className='cursor-pointer font-medium text-neutral-950'>Create account</p>
              : <p onClick={() => switchMode('Login')} className='cursor-pointer font-medium text-neutral-950'>Login Here</p>
          }
        </div>
        <button disabled={isSubmitting} className='primary-button mt-2 w-full'>{isSubmitting ? 'Please wait...' : currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
      </form>
    </div>
  )
}

export default Login
