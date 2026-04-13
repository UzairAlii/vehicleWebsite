import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'NAME IS REQUIRED';
    if (!formData.email.trim()) newErrors.email = 'EMAIL IS REQUIRED';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'ENTER VALID EMAIL';
    if (!formData.phone.trim()) newErrors.phone = 'PHONE IS REQUIRED';
    else if (!/^\d+$/.test(formData.phone)) newErrors.phone = 'NUMBERS ONLY';
    if (!formData.password) newErrors.password = 'PASSWORD IS REQUIRED';
    else if (formData.password.length < 6) newErrors.password = 'MIN 6 CHARS';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      signup(formData);
      showToast('Account Created Successfully.');
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
        className="w-full max-w-[500px] bg-[#0A0A0A] border border-[#222222] rounded-[2.5rem] p-10 md:p-14 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="text-4xl font-black tracking-tighter text-white mb-2 text-center">
            LUXE<span className="text-[#444444]">DRIVE</span>
          </div>
          <p className="text-[10px] text-[#444444] font-bold tracking-[0.5em] uppercase">
            CREATE NEW ACCOUNT
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-[0.2em] text-[#888888] uppercase ml-1">
              FULL NAME
            </label>
            <div className="relative group">
              <User className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${errors.fullName ? 'text-red-500' : 'text-[#444444] group-focus-within:text-white'}`} />
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (errors.fullName) setErrors({ ...errors, fullName: null });
                }}
                className={`w-full bg-black border py-4 pl-14 pr-4 text-sm text-white rounded-2xl focus:outline-none transition-all placeholder:text-[#222222] ${errors.fullName ? 'border-red-500/50 focus:border-red-500' : 'border-[#222222] focus:border-white/20'}`}
                placeholder="YOUR NAME"
              />
            </div>
            {errors.fullName && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1.5 ml-1 mt-1">
                <AlertCircle className="w-3 h-3 text-red-500" />
                <p className="text-[9px] font-bold text-red-500 tracking-wider uppercase">{errors.fullName}</p>
              </motion.div>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
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
                className={`w-full bg-black border py-4 pl-14 pr-4 text-sm text-white rounded-2xl focus:outline-none transition-all placeholder:text-[#222222] ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-[#222222] focus:border-white/20'}`}
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

          {/* Phone */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-[0.2em] text-[#888888] uppercase ml-1">
              PHONE NUMBER
            </label>
            <div className="relative group">
              <Phone className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${errors.phone ? 'text-red-500' : 'text-[#444444] group-focus-within:text-white'}`} />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: null });
                }}
                className={`w-full bg-black border py-4 pl-14 pr-4 text-sm text-white rounded-2xl focus:outline-none transition-all placeholder:text-[#222222] ${errors.phone ? 'border-red-500/50 focus:border-red-500' : 'border-[#222222] focus:border-white/20'}`}
                placeholder="MOBILE NUMBER"
              />
            </div>
            {errors.phone && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1.5 ml-1 mt-1">
                <AlertCircle className="w-3 h-3 text-red-500" />
                <p className="text-[9px] font-bold text-red-500 tracking-wider uppercase">{errors.phone}</p>
              </motion.div>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold tracking-[0.2em] text-[#888888] uppercase ml-1">
              SECURE PASSWORD
            </label>
            <div className="relative group">
              <Lock className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${errors.password ? 'text-red-500' : 'text-[#444444] group-focus-within:text-white'}`} />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                className={`w-full bg-black border py-4 pl-14 pr-14 text-sm text-white rounded-2xl focus:outline-none transition-all placeholder:text-[#222222] ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'border-[#222222] focus:border-white/20'}`}
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
            className="w-full bg-white text-black py-5 rounded-2xl text-[11px] font-bold tracking-[0.4em] uppercase hover:bg-[#dddddd] transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 group mt-6"
          >
            SIGN UP <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-[10px] text-[#444444] font-bold tracking-[0.2em] uppercase">
            ALREADY HAVE AN ACCOUNT?{' '}
            <Link to="/login" className="text-white hover:underline underline-offset-8 decoration-1 transition-all">
              LOG IN HERE
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
