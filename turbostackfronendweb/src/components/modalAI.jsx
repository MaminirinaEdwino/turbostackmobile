import React, { useState } from "react";
import { GoApp } from "../services/bridge";

export default function AiChatModal({ isOpen, onClose }) {
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: "Bonjour ! Je suis l'assistant TurboStack. Comment puis-je vous aider aujourd'hui ?",
            time: "10:00"
        }
    ]);

    if (!isOpen) return null;

    const handleSend = async () => {
        if (!prompt.trim()) return;

        // Ajout du message utilisateur
        const userMsg = {
            sender: "user",
            text: prompt,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages((prev) => [...prev, userMsg]);
        setPrompt("");
        
        await GoApp.chat(prompt).then((res) => {
            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text: res,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            ]);
        });
    };

    return (
        /* Arrière-plan flouté (Backdrop) avec padding 0 sur mobile pour mode plein écran */
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm p-0 sm:p-4 transition-all h-full">

            {/* Conteneur principal de la Modal : Plein écran sur mobile, taille fixe sur sm+ */}
            <div className="relative w-full h-full sm:h-[80vh] sm:max-w-2xl flex flex-col rounded-none sm:rounded-2xl border-0 sm:border border-slate-200 dark:border-slate-800 bg-white dark:bg-couleur1 shadow-2xl overflow-hidden transition-colors">

                {/* En-tête (Header) compact et raffiné */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-couleur6 text-white font-bold shadow-md shadow-indigo-500/20 text-sm sm:text-base">
                            🤖
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                                Assistant TurboStack
                            </h3>
                            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                                Générateur & Modélisateur IA
                            </p>
                        </div>
                    </div>

                    {/* Bouton Fermer agrandi pour le tactile mobile */}
                    <button
                        onClick={onClose}
                        className="p-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Fermer"
                    >
                        ✕
                    </button>
                </div>

                {/* Zone de Visualisation des Résultats (Fil de discussion) */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4 custom-scrollbar bg-slate-50/30 dark:bg-slate-950/40">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                        >
                            <div
                                className={`max-w-[88%] sm:max-w-[85%] px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                                    msg.sender === "user"
                                        ? "bg-couleur2 text-white rounded-br-none"
                                        : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/60 rounded-bl-none"
                                }`}
                            >
                                {msg.text}
                            </div>
                            <span className="text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 sm:mt-1 px-1">
                                {msg.time}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Formulaire de Saisie du Prompt & Bouton d'envoi adapté mobile */}
                <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend();
                        }}
                        className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 rounded-xl p-1.5 sm:p-2 focus-within:ring-2 focus-within:ring-indigo-500 dark:focus-within:ring-indigo-400 transition-all"
                    >
                        {/* Champ de Saisie de Prompt */}
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Décrivez ce que vous souhaitez générer..."
                            className="flex-1 bg-transparent px-2.5 sm:px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
                        />

                        {/* Bouton d'Envoi optimisé tactile */}
                        <button
                            type="submit"
                            disabled={!prompt.trim()}
                            className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2.5 bg-couleur1 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-medium rounded-lg shadow-md shadow-indigo-600/20 transition-all active:scale-95 shrink-0"
                        >
                            <span>Send</span>
                            <svg
                                className="w-3.5 h-3.5 sm:w-4 sm:h-4 rotate-90"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                />
                            </svg>
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}