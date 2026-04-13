import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    
    // Email Validation
    if (!formData.email.trim()) {
      newErrors.email = 'EMAIL IS REQUIRED';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'PLEASE ENTER A VALID EMAIL ADDRESS (E.G. NAME@MAIL.COM)';
    }
    
    // Password Validation
    if (!formData.password) {
      newErrors.password = 'PASSWORD IS REQUIRED';
    } else if (formData.password.length < 6) {
      newErrors.password = 'PASSWORD MUST BE AT LEAST 6 CHARACTERS LONG';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      login(formData.email, formData.password);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#111111] via-black to-black opacity-50" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[450px] bg-[#0A0A0A] border border-[#222222] rounded-[2.5rem] p-10 md:p-14 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10"
      >
        <div className="flex flex-col items-center mb-12">
          <div className="text-4xl font-black tracking-tighter text-white mb-2 text-center">
            LUXE<span className="text-[#444444]">DRIVE</span>
          </div>
          <p className="text-[10px] text-[#444444] font-bold tracking-[0.5em] uppercase text-center">
            MEMBER SIGN IN
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-[0.2em] text-[#888888] uppercase ml-1">
              EMAIL ADDRESS
            </label>
            <div className="relative group">
              <Mail className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${errors.email ? 'text-red-500' : 'text-[#444444] group-focus-within:text-white'}`} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                className={`w-full bg-black border py-5 pl-14 pr-4 text-sm text-white rounded-2xl focus:outline-none transition-all placeholder:text-[#222222] ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-[#222222] focus:border-white/20'}`}
                placeholder="example@mail.com"
              />
            </div>
            {errors.email && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1.5 ml-1 mt-1">
                <AlertCircle className="w-3 h-3 text-red-500" />
                <p className="text-[9px] font-bold text-red-500 tracking-wider uppercase">{errors.email}</p>
              </motion.div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end mb-1">
              <label className="text-[10px] font-bold tracking-[0.2em] text-[#888888] uppercase ml-1">
                PASSWORD
              </label>
              <button type="button" className="text-[9px] font-bold tracking-[0.1em] text-[#444444] hover:text-white transition-colors uppercase">
                FORGOT?
              </button>
            </div>
            <div className="relative group">
              <Lock className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${errors.password ? 'text-red-500' : 'text-[#444444] group-focus-within:text-white'}`} />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                className={`w-full bg-black border py-5 pl-14 pr-14 text-sm text-white rounded-2xl focus:outline-none transition-all placeholder:text-[#222222] ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-[#222222] focus:border-white/20'}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#444444] hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1.5 ml-1 mt-1">
                <AlertCircle className="w-3 h-3 text-red-500" />
                <p className="text-[9px] font-bold text-red-500 tracking-wider uppercase">{errors.password}</p>
              </motion.div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black py-5 rounded-2xl text-[11px] font-bold tracking-[0.4em] uppercase hover:bg-[#dddddd] transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group mt-4"
          >
            LOG IN <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-[10px] text-[#444444] font-bold tracking-[0.2em] uppercase">
            NEED AN ACCOUNT?{' '}
            <Link to="/signup" className="text-white hover:underline underline-offset-8 decoration-1 transition-all">
              JOIN LUXEDRIVE
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
