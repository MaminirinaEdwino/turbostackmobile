import React, { useState } from 'react';
import { GoApp } from '../services/bridge';
import { Lock, Mail, UserPlus, Loader2 } from 'lucide-react';

export default function Register({ onRegisterSuccess, onSwitchToLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await GoApp.register(username, password);
            setSuccess(true);
            setTimeout(() => {
                if (onRegisterSuccess) {
                    onRegisterSuccess();
                } else if (onSwitchToLogin) {
                    onSwitchToLogin();
                }
            }, 1500);
        } catch (err) {
            setError(err.message || "Échec de l'inscription");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
            <div className="w-full max-w-md p-8 rounded-2xl border border-couleur2/30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-2xl flex flex-col gap-6 text-slate-700 dark:text-couleur3 transition-all">
                <div className="text-center flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight text-couleur1">Create Account</h1>
                    <p className="text-xs text-slate-400">Join TurboStack and manage your projects</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-xs p-3 rounded-xl text-center">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs p-3 rounded-xl text-center">
                        Account created successfully! Redirecting...
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Username</label>
                        <div className="relative flex items-center">
                            <Mail size={16} className="absolute left-3 text-slate-400" />
                            <input 
                                type="text" 
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Choose a username"
                                className="w-full pl-10 pr-4 py-2.5 text-sm border border-couleur2/30 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 focus:outline-none focus:border-couleur1 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Password</label>
                        <div className="relative flex items-center">
                            <Lock size={16} className="absolute left-3 text-slate-400" />
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-2.5 text-sm border border-couleur2/30 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 focus:outline-none focus:border-couleur1 transition-colors"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading || success}
                        className="mt-2 w-full flex items-center justify-center gap-2 bg-couleur1 text-white py-2.5 rounded-xl font-medium text-sm hover:opacity-90 transition-all shadow-sm cursor-pointer disabled:opacity-50"
                    >
                        {loading ? <Loader2 size={16} className="animate-spin" /> : <>Sign Up <UserPlus size={16} /></>}
                    </button>
                </form>

                <div className="text-center text-xs text-slate-400">
                    Already have an account?{' '}
                    <button 
                        type="button"
                        onClick={onSwitchToLogin} 
                        className="text-couleur1 font-semibold hover:underline cursor-pointer"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}