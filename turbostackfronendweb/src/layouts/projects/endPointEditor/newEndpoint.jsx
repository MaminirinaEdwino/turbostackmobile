import { Check, X, Plus, Trash2, Database } from "lucide-react";
import { useState } from "react";

export default function NewEndpoint({ project, setProject, setToggle }) {
    const [endpoint, setEndpoint] = useState({
        nom: "",
        uri: "/",
        method: "GET",
        role: "public",
        model: [],
        params: [],
        manual_fields: [],
        return_content: [],
        return_content_type: "object",
        return_page: null
    });
    const [manualField, setManualField] = useState({ nom: "", type: "string" });
    const [tableName, setTableName] = useState("");

    const availableModels = project.bdd?.models || [];

    // Extraction dynamique des rôles depuis la table User
    const userModel = availableModels.find(m => m.nom === "User");
    const roleField = userModel?.champs.find(c => c.nom === "role");
    const availableRoles = roleField?.default_value
        ? ["public", ...roleField.default_value.split(',').map(r => r.trim())]
        : ["public"];

    const handleSave = (e) => {
        e.preventDefault();
        const currentEndpoints = project.rest_api?.endpoints || [];
        setProject({
            ...project,
            rest_api: {
                ...project.rest_api,
                endpoints: [...currentEndpoints, endpoint]
            }
        });
        setToggle("none");
    };

    const methodWithBody = [
        "PUT",
        "PATCH",
        "POST"
    ];

    const toggleModelSelection = (model) => {
        const isSelected = endpoint.model.some((m) => m.nom === model.nom);
        if (isSelected) {
            const paramsToRemove = model.champs.map((c) => c.nom);
            let newUri = endpoint.uri;
            paramsToRemove.forEach((p) => {
                newUri = newUri.replace(`/:${p}`, "").replace(`:${p}`, "");
            });

            setEndpoint({
                ...endpoint,
                model: endpoint.model.filter((m) => m.nom !== model.nom),
                return_content: endpoint.return_content.filter((m) => m.nom !== model.nom),
                params: endpoint.params.filter(
                    (p) => !model.champs.some((c) => c.nom === p),
                ),
                uri: newUri,
            });
        } else {
            setEndpoint({ ...endpoint, model: [...endpoint.model, { ...model }], return_content: [...endpoint.return_content, { ...model }] });
        }
    };

    const addManualField = () => {
        if (!manualField.nom || endpoint.manual_fields.some(f => f.nom === manualField.nom)) return;
        setEndpoint({ ...endpoint, manual_fields: [...endpoint.manual_fields, manualField] });
        setManualField({ nom: "", type: "string" });
    };

    const removeManualField = (nom) => {
        setEndpoint(prev => ({
            ...prev,
            manual_fields: prev.manual_fields.filter(f => f.nom !== nom),
            params: prev.params.filter(p => p !== nom),
            model: prev.model.map(m => m.nom === "Manual" ? { ...m, champs: m.champs.filter(f => f.nom !== nom) } : m).filter(m => m.nom !== "Manual" || m.champs.length > 0)
        }));
    };

    const generateTableFromManual = () => {
        if (!tableName || endpoint.manual_fields.length === 0) return;
        if (availableModels.some(m => m.nom.toLowerCase() === tableName.toLowerCase())) {
            alert("Une table avec ce nom existe déjà.");
            return;
        }

        const newModel = {
            nom: tableName,
            champs: endpoint.manual_fields.map(f => ({ ...f, default_value: "" }))
        };

        setProject({ ...project, bdd: { ...project.bdd, models: [...availableModels, newModel] } });
        setTableName("");
    };

    const toggleResponseBody = (modelName, field) => {
        const updatedModels = endpoint.return_content.map((m) => {
            if (m.nom === modelName) {
                const hasField = m.champs.some((f) => f.nom === field.nom);
                if (hasField) {
                    return { ...m, champs: m.champs.filter((f) => f.nom !== field.nom) };
                } else {
                    return { ...m, champs: [...m.champs, field] };
                }
            }
            return m;
        });
        setEndpoint({ ...endpoint, return_content: updatedModels });
    };

    const toggleUriParam = (fieldName) => {
        const isSelected = endpoint.params.includes(fieldName);
        let newParams;
        let newUri = endpoint.uri;

        if (isSelected) {
            newParams = endpoint.params.filter((p) => p !== fieldName);
            newUri = newUri
                .replace(`/:${fieldName}`, "")
                .replace(`:${fieldName}`, "");
        } else {
            newParams = [...endpoint.params, fieldName];
            if (!newUri.includes(`:${fieldName}`)) {
                newUri = newUri.endsWith("/")
                    ? `${newUri}:${fieldName}`
                    : `${newUri}/:${fieldName}`;
            }
        }
        setEndpoint({ ...endpoint, params: newParams, uri: newUri });
    };

    const toggleManualBodyField = (field) => {
        setEndpoint((prev) => {
            const hasManual = prev.model.some((m) => m.nom === "Manual");
            let newModels;

            if (!hasManual) {
                newModels = [...prev.model, { nom: "Manual", champs: [field] }];
            } else {
                newModels = prev.model
                    .map((m) => {
                        if (m.nom !== "Manual") return m;
                        const hasField = m.champs.some((f) => f.nom === field.nom);
                        return {
                            ...m,
                            champs: hasField
                                ? m.champs.filter((f) => f.nom !== field.nom)
                                : [...m.champs, field],
                        };
                    })
                    .filter((m) => m.nom !== "Manual" || m.champs.length > 0);
            }
            return { ...prev, model: newModels };
        });
    };

    const toggleBodyField = (modelName, field) => {
        const updatedModels = endpoint.model.map((m) => {
            if (m.nom === modelName) {
                const hasField = m.champs.some((f) => f.nom === field.nom);
                if (hasField) {
                    return { ...m, champs: m.champs.filter((f) => f.nom !== field.nom) };
                } else {
                    return { ...m, champs: [...m.champs, field] };
                }
            }
            return m;
        });
        setEndpoint({ ...endpoint, model: updatedModels });
    };

    return (
        <form className="bg-white dark:bg-gray-900 border border-couleur1 p-4 sm:p-5 rounded-xl shadow-2xl flex flex-col w-[92vw] sm:w-[600px] max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
            <h3 className="font-bold text-lg sm:text-xl text-couleur1 dark:text-gray-100 mb-3">New Endpoint</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold opacity-50 uppercase">Name</label>
                    <input className="border border-couleur1 px-2.5 py-1.5 rounded-lg outline-none focus:ring-1 ring-couleur1/20 text-xs" type="text" value={endpoint.nom} onChange={(e) => setEndpoint({ ...endpoint, nom: e.target.value })} placeholder="Get Users" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold opacity-50 uppercase">Method</label>
                    <select className="border border-couleur1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 text-xs appearance-none" value={endpoint.method} onChange={(e) => setEndpoint({ ...endpoint, method: e.target.value })}>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        {project?.type != "web_app" && <>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">DELETE</option>
                        </>}
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold opacity-50 uppercase">Access Role</label>
                    <select className="border border-couleur1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-gray-800 capitalize text-xs appearance-none" value={endpoint.role} onChange={(e) => setEndpoint({ ...endpoint, role: e.target.value })}>
                        {availableRoles.map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex flex-col gap-1 mb-3">
                <label className="text-[10px] font-bold opacity-50 uppercase">URI Path</label>
                <input className="border border-couleur1 px-2.5 py-1.5 rounded-lg font-mono text-xs" type="text" value={endpoint.uri} onChange={(e) => setEndpoint({ ...endpoint, uri: e.target.value })} />
            </div>

            <div className="flex flex-col gap-1 mb-4">
                <label className="text-[10px] font-bold opacity-50 uppercase">Associated Models</label>
                <div className="flex flex-wrap gap-1.5 mt-1.5 border border-dashed border-couleur1/30 p-2.5 rounded-lg min-h-12">
                    {availableModels.map((m, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => toggleModelSelection(m)}
                            className={`px-2.5 py-0.5 rounded-full text-[11px] transition-colors border ${endpoint.model.some(sel => sel.nom === m.nom)
                                ? "bg-couleur1 text-white border-couleur1"
                                : "bg-white dark:bg-gray-800 text-couleur1 dark:text-gray-300 border-couleur1/30 hover:bg-couleur3"
                                }`}
                        >
                            {m.nom}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-1 mb-4">
                <label className="text-[10px] font-bold opacity-50 uppercase">Manual Fields</label>
                <div className="flex gap-2 mt-1.5">
                    <input className="flex-1 border border-couleur1 px-2.5 py-1.5 rounded-lg text-xs" type="text" placeholder="Field name" value={manualField.nom} onChange={(e) => setManualField({ ...manualField, nom: e.target.value })} />
                    <select className="border border-couleur1 px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-gray-800" value={manualField.type} onChange={(e) => setManualField({ ...manualField, type: e.target.value })}>
                        <option value="string">String</option>
                        <option value="int">Integer</option>
                        <option value="boolean">Boolean</option>
                    </select>
                    <button type="button" onClick={addManualField} className="bg-couleur1 text-white px-2.5 py-1.5 rounded-lg text-xs"><Plus size={16} /></button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {endpoint.manual_fields.map((f, i) => (
                        <div key={i} className="flex items-center gap-1.5 bg-couleur3 dark:bg-gray-800 px-2.5 py-0.5 rounded-full border border-couleur1/20 text-[11px]">
                            <span className="font-medium">{f.nom}</span>
                            <span className="opacity-50 text-[10px]">({f.type})</span>
                            <button type="button" onClick={() => removeManualField(f.nom)} className="text-red-500 hover:text-red-700">
                                <X size={10} />
                            </button>
                        </div>
                    ))}
                </div>

                {endpoint.manual_fields.length > 0 && (
                    <div className="mt-3 p-2.5 bg-couleur1/5 border border-dashed border-couleur1/30 rounded-lg">
                        <label className="text-[9px] font-bold text-couleur1 uppercase mb-1.5 block">Générer une table BDD</label>
                        <div className="flex gap-2">
                            <input
                                className="flex-1 border border-couleur1 px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-gray-800"
                                type="text"
                                placeholder="Nom de la table (ex: Profil)"
                                value={tableName}
                                onChange={(e) => setTableName(e.target.value)}
                            />
                            <button type="button" onClick={generateTableFromManual} className="bg-couleur1 text-white px-2.5 py-1 rounded-lg text-[11px] flex items-center gap-1.5 hover:bg-opacity-90 transition-all">
                                <Database size={12} /> Créer Table
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {(endpoint.model.length > 0 || endpoint.manual_fields.length > 0) && (
                <div className="flex flex-col gap-2.5 mb-4 border-t border-couleur1/10 pt-3">
                    <label className="text-[10px] font-bold opacity-50 uppercase">Fields Configuration (URI vs Body)</label>

                    {endpoint.manual_fields.length > 0 && (
                        <div className="bg-blue-50/50 dark:bg-gray-800/50 p-3 rounded-lg border border-blue-200 dark:border-gray-700 shadow-inner mb-1">
                            <h4 className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                Manual Fields
                            </h4>
                            <table className="w-full text-[11px]">
                                <thead>
                                    <tr className="text-left opacity-60">
                                        <th className="pb-1">Field Name</th>
                                        <th className="pb-1 text-center">URI Param</th>
                                        <th className="pb-1 text-center">Body Request</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {endpoint.manual_fields.map((f) => (
                                        <tr key={f.nom} className="border-t border-blue-100 dark:border-gray-700">
                                            <td className="py-1.5 text-blue-800 dark:text-blue-300 font-medium">{f.nom} <span className="text-[9px] opacity-40">[{f.type}]</span></td>
                                            <td className="py-1.5 text-center">
                                                <input type="checkbox" checked={endpoint.params.includes(f.nom)} onChange={() => toggleUriParam(f.nom)} className="accent-blue-600 cursor-pointer w-3.5 h-3.5" />
                                            </td>
                                            <td className="py-1.5 text-center">
                                                <input type="checkbox" checked={endpoint.model.find(m => m.nom === "Manual")?.champs.some(bc => bc.nom === f.nom)} onChange={() => toggleManualBodyField(f)} className="accent-blue-600 cursor-pointer w-3.5 h-3.5" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {endpoint.model.map((m) => {
                        if (m.nom === "Manual") return null;
                        const originalModel = availableModels.find(om => om.nom === m.nom);
                        return (
                            <div key={m.nom} className="bg-couleur3/30 dark:bg-gray-800/40 p-3 rounded-lg border border-couleur1/10 shadow-inner">
                                <h4 className="text-xs font-bold text-couleur1 dark:text-gray-200 mb-2 flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-couleur1"></div>
                                    {m.nom}
                                </h4>
                                <table className="w-full text-[11px]">
                                    <thead>
                                        <tr className="text-left opacity-60">
                                            <th className="pb-1">Field Name</th>
                                            <th className="pb-1 text-center">URI Param</th>
                                            {methodWithBody.includes(endpoint.method) && <th className="pb-1 text-center">Body Request</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {originalModel?.champs.map((f) => (
                                            <tr key={f.nom} className="border-t border-couleur1/5 hover:bg-white/40 dark:hover:bg-gray-800/60 transition-colors">
                                                <td className="py-1.5 text-couleur1 dark:text-gray-300 font-medium">{f.nom} <span className="text-[9px] opacity-40">[{f.type}]</span></td>
                                                <td className="py-1.5 text-center">
                                                    <input type="checkbox" checked={endpoint.params.includes(f.nom)} onChange={() => toggleUriParam(f.nom)} className="accent-couleur1 cursor-pointer w-3.5 h-3.5" />
                                                </td>
                                                {methodWithBody.includes(endpoint.method) && <td className="py-1.5 text-center">
                                                    <input type="checkbox" checked={m.champs.some(bc => bc.nom === f.nom)} onChange={() => toggleBodyField(m.nom, f)} className="accent-couleur1 cursor-pointer w-3.5 h-3.5" />
                                                </td>}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        );
                    })}
                </div>
            )}

            {endpoint.model.length > 0 && <div className="mt-1">
                <label className="text-[10px] font-bold opacity-50 uppercase block mb-1">
                    Response Body
                </label>
                <div className="text-[11px] border w-fit rounded-sm border-couleur1 overflow-hidden">
                    <button className={`px-2.5 py-1 ${endpoint.return_content_type == "array" ? "bg-couleur1 text-white" : "text-couleur1 dark:text-gray-300"}`} onClick={(e) => {
                        e.preventDefault()
                        setEndpoint({ ...endpoint, return_content_type: "array" })
                    }}>
                        ARRAY
                    </button>
                    <button className={`px-2.5 py-1 ${endpoint.return_content_type == "object" ? "bg-couleur1 text-white" : "text-couleur1 dark:text-gray-300"}`} onClick={(e) => {
                        e.preventDefault()
                        setEndpoint({ ...endpoint, return_content_type: "object" })
                    }}>
                        OBJECT
                    </button>
                </div>
            </div>}

            {endpoint.return_content_type != "page" && endpoint.return_content.map((m) => {
                if (m.nom === "Manual") return null;
                const originalModel = availableModels.find(
                    (om) => om.nom === m.nom,
                );
                return (
                    <div
                        key={m.nom}
                        className="bg-couleur3/30 dark:bg-gray-800/40 p-3 rounded-lg border border-couleur1/10 shadow-inner mt-2"
                    >
                        <h4 className="text-xs font-bold text-couleur1 dark:text-gray-200 mb-2 flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-couleur1"></div>
                            {m.nom}
                        </h4>
                        <table className="w-full text-[11px]">
                            <thead>
                                <tr className="text-left opacity-60">
                                    <th className="pb-1">Field Name</th>
                                    <th className="pb-1 text-center">Response Body</th>
                                </tr>
                            </thead>
                            <tbody>
                                {originalModel?.champs.map((f) => (
                                    <tr
                                        key={f.nom}
                                        className="border-t border-couleur1/5 hover:bg-white/40 dark:hover:bg-gray-800/60 transition-colors"
                                    >
                                        <td className="py-1.5 text-couleur1 dark:text-gray-300 font-medium">
                                            {f.nom}{" "}
                                            <span className="text-[9px] opacity-40">
                                                [{f.type}]
                                            </span>
                                        </td>
                                        <td className="py-1.5 text-center">
                                            <input
                                                type="checkbox"
                                                checked={m.champs && m.champs.some((bc) => bc.nom === f.nom)}
                                                onChange={() => toggleResponseBody(m.nom, f)}
                                                className="accent-couleur1 cursor-pointer w-3.5 h-3.5"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            })}

            {endpoint.method == "GET" && <div className="my-2">
                <p className="text-[10px] font-bold opacity-50 uppercase mb-1">Select a page</p>
                <div className="flex gap-2 text-[11px] flex-wrap">
                    {project != null && project?.web_app?.pages?.map((p) => <button key={p.nom} onClick={(e) => {
                        e.preventDefault()
                        if (endpoint.return_page == p.nom) {
                            setEndpoint({ ...endpoint, return_page: null })
                        } else {
                            setEndpoint({ ...endpoint, return_page: p.nom })
                        }
                    }} className={`px-2 py-1 rounded ${endpoint.return_page == p.nom ? "bg-couleur1 text-white" : "bg-couleur3/30 dark:bg-gray-800 text-couleur1 dark:text-gray-300"}`}>{p.nom}</button>)}
                </div>
            </div>}

            {project.type == "webapp" && endpoint.method != "GET" && <div className="my-2">
                <label className="text-[10px] font-bold opacity-50 uppercase block mb-1">
                    Redirect to
                </label>
                <div className="text-[11px] border w-fit rounded-sm border-couleur1 overflow-hidden flex flex-wrap">
                    {(project && project.rest_api.endpoints.filter(ep => ep.method === "GET")).map(ep => <button
                        key={ep.nom}
                        onClick={(e) => {
                            e.preventDefault()
                            setEndpoint({ ...endpoint, redirect_uri: ep.uri })
                        }}
                        className={`px-2.5 py-1 ${endpoint.redirect_uri == ep.uri ? "bg-couleur1 text-white" : "text-couleur1 dark:text-gray-300"}`}
                    >
                        {ep.nom} ({ep.uri})
                    </button>)}
                </div>
            </div>}

            <div className="flex justify-end gap-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                <button type="button" onClick={() => setToggle("none")} className="px-4 py-1.5 rounded-lg border border-couleur1 text-couleur1 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-xs">Cancel</button>
                <button onClick={handleSave} className="px-4 py-1.5 rounded-lg bg-couleur1 text-white font-semibold flex items-center gap-1.5 hover:bg-opacity-90 transition-all text-xs">
                    <Check size={16} /> Create Endpoint
                </button>
            </div>
        </form>
    );
}