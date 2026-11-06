import { Check, Trash2, Edit, Plus, X } from "lucide-react";
import { useState, useEffect } from "react";
import RelationModal from "./RelationModal";

export default function EditModel({ modelList, setModelList, setToggle, index }) {
    const [modelName, setModelName] = useState('')
    const [addField, setAddfield] = useState(false)
    const [fields, setFields] = useState([])
    const [newField, setNewField] = useState({
        nom: "",
        type: "",
        default_value: "",
        constraint: []
    })

    const [editingIndex, setEditingIndex] = useState(-1);
    const [editField, setEditField] = useState({
        nom: "",
        type: "",
        default_value: "",
        constraint: []
    })
    const [showRelationModal, setShowRelationModal] = useState(false);
    const [fieldToEditRelation, setFieldToEditRelation] = useState(null); // Pour savoir quel champ est en cours d'édition de relation

    // Initialisation des données du modèle à modifier
    const handleSelectRelation = (relationString) => {
        if (fieldToEditRelation === "edit") {
            const current = Array.isArray(editField.constraint) ? editField.constraint : [];
            const next = [...current.filter(c => !c.startsWith('relation:')), relationString];
            setEditField({ ...editField, constraint: next });
        } else if (fieldToEditRelation === "new") {
            const current = Array.isArray(newField.constraint) ? newField.constraint : [];
            const next = [...current.filter(c => !c.startsWith('relation:')), relationString];
            setNewField({ ...newField, constraint: next });
        }
        setShowRelationModal(false);
        setFieldToEditRelation(null);
    };
    useEffect(() => {
        const setter = (model) => {
            setModelName(model.nom);
            // On normalise les champs pour s'assurer que les contraintes sont des tableaux
            const normalizedFields = (model.champs || []).map(f => ({
                ...f,
                constraint: Array.isArray(f.constraint) ? f.constraint : (f.constraint ? [f.constraint] : [])
            }));
            setFields(normalizedFields);
        }
        if (modelList && modelList.models && modelList.models[index]) {
            const model = modelList.models[index];
            setter(model)
        }
    }, [index, modelList]);

    const handleNewField = (e) => {
        e.preventDefault()
        setFields(fields => [...fields, newField])
        setAddfield(false)
        setNewField({
            nom: "",
            type: "",
            default_value: "",
            constraint: []
        })
    }

    const toggleConstraint = (field, setter, constraint) => {
        const current = Array.isArray(field.constraint) ? field.constraint : (field.constraint ? [field.constraint] : []);
        if (constraint === "relation") {
            const existingRel = current.find(c => typeof c === 'string' && c.startsWith('relation:'));
            if (existingRel) {
                // Si une relation existe déjà, on la supprime en cliquant
                const next = current.filter(c => c !== existingRel);
                setter({ ...field, constraint: next });
            } else {
                setFieldToEditRelation(setter === setEditField ? "edit" : "new");
                setShowRelationModal(true);
            }
            return;
        }
        const next = current.includes(constraint)
            ? current.filter(c => c !== constraint)
            : [...current, constraint];
        setter({ ...field, constraint: next });
    };

    const startEditing = (idx, field) => {
        setEditingIndex(idx);
        setEditField({ ...field, constraint: Array.isArray(field.constraint) ? field.constraint : (field.constraint ? [field.constraint] : []) });
    };

    const saveEdit = (e) => {
        e.preventDefault();
        const newFields = [...fields];
        newFields[editingIndex] = editField;
        setFields(newFields);
        setEditingIndex(-1);
    };

    const handleUpdateModel = (e) => {
        e.preventDefault()
        const updatedModels = [...modelList.models]
        updatedModels[index] = { nom: modelName, champs: fields }

        setModelList({
            ...modelList,
            models: updatedModels
        })
        setToggle("none")
    }

    const handleCancel = (e) => {
        e.preventDefault()
        setToggle("none")
    }

    return (<form className="bg-white dark:bg-gray-900 border border-couleur1/10 dark:border-white/10 m-2 md:m-4 p-4 md:p-6 rounded-2xl shadow-xl flex flex-col gap-4 transition-all">
        <h3 className="font-bold text-2xl text-couleur1 dark:text-gray-100 tracking-tight">Edit Table</h3>

        <div className="p-2 flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-couleur1/80 dark:text-gray-300" htmlFor="modelName">Model Name</label>
            <input className="border border-couleur1/20 dark:border-white/20 bg-couleur3/20 dark:bg-gray-800 text-couleur1 dark:text-gray-100 my-1 px-3.5 py-2 rounded-xl outline-none focus:ring-2 focus:ring-couleur1/50 transition-all font-medium text-sm" type="text" id="modelName" onInput={(e) => setModelName(e.target.value)} value={modelName} />
        </div>

        <div>
            <div className="flex justify-between items-center p-3 bg-couleur3/30 dark:bg-gray-800/50 rounded-xl border border-couleur1/5 dark:border-white/5 mb-3">
                <h4 className="font-semibold text-couleur1 dark:text-gray-200 text-sm md:text-base">Model Fields</h4>
                <button className="bg-couleur1 hover:bg-couleur1/90 text-white font-medium flex gap-2 items-center px-4 py-1.5 rounded-xl transition-all duration-200 text-xs shadow-xs active:scale-95 cursor-pointer shrink-0" onClick={(e) => {
                    e.preventDefault()
                    setAddfield(true)
                }}> <Plus size={16}></Plus> Add Field</button>
            </div>

            {/* Version Tableau (Desktop uniquement : md:table) */}
            <div className="hidden md:block w-full overflow-x-auto rounded-xl border border-couleur1/10 dark:border-white/10 bg-white dark:bg-gray-900 shadow-xs">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-couleur1/10 dark:border-white/10 bg-couleur3/20 dark:bg-gray-800/80 text-[11px] font-bold tracking-wider text-couleur1/70 dark:text-gray-400 uppercase">
                            <th className="py-3 px-4 min-w-40">Name</th>
                            <th className="py-3 px-4 min-w-30">Type</th>
                            <th className="py-3 px-4 min-w-40">Default Value</th>
                            <th className="py-3 px-4 min-w-30">Constraint</th>
                            <th className="py-3 px-4 min-w-30 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-couleur1/5 dark:divide-white/5 text-sm">
                        {fields.map((item, idx) => (
                            editingIndex === idx ? (
                                <tr key={idx} className="bg-couleur1/5 dark:bg-gray-800/50">
                                    <td className="p-3">
                                        <input type="text" onInput={(e) => setEditField({ ...editField, nom: e.target.value })} value={editField.nom} className="w-full px-2.5 py-1.5 border border-couleur1/30 rounded-lg outline-none focus:ring-2 focus:ring-couleur1/50 bg-white dark:bg-gray-900 text-couleur1 dark:text-gray-100 text-xs font-medium" />
                                    </td>
                                    <td className="p-3">
                                        <select
                                            className="w-full px-2.5 py-1.5 border border-couleur1/30 rounded-lg outline-none focus:ring-2 focus:ring-couleur1/50 bg-white dark:bg-gray-900 text-couleur1 dark:text-gray-100 text-xs font-medium cursor-pointer"
                                            onInput={(e) => setEditField({ ...editField, type: e.target.value })}
                                            value={editField.type}
                                        >
                                            <option value="">Type</option>
                                            <option value="int">INT</option>
                                            <option value="string">VARCHAR</option>
                                            <option value="text">TEXT</option>
                                        </select>
                                    </td>
                                    <td className="p-3"><input list="default-value-list-edit" className="w-full px-2.5 py-1.5 border border-couleur1/30 rounded-lg outline-none focus:ring-2 focus:ring-couleur1/50 bg-white dark:bg-gray-900 text-couleur1 dark:text-gray-100 text-xs font-medium" type="text" onInput={(e) => setEditField({ ...editField, default_value: e.target.value })} value={editField.default_value} /></td>
                                    <td className="p-3">
                                        <div className="flex flex-wrap gap-1 min-w-30">
                                            {["primary key", "unique", "not null", "relation", ...(editField.type === "int" ? ["autoincrement"] : [])].map(c => {
                                                const isRel = c === "relation";
                                                const isActive = isRel
                                                    ? editField.constraint?.some(cons => typeof cons === 'string' && cons.startsWith('relation:'))
                                                    : editField.constraint?.includes(c);
                                                const displayValue = isRel
                                                    ? (editField.constraint?.find(cons => typeof cons === 'string' && cons.startsWith('relation:')) || "relation")
                                                    : c;
                                                return (
                                                    <button
                                                        key={c}
                                                        type="button"
                                                        onClick={() => {
                                                            if (isRel && isActive) {
                                                                toggleConstraint(editField, setEditField, c);
                                                            } else {
                                                                toggleConstraint(editField, setEditField, c);
                                                            }
                                                        }}
                                                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all cursor-pointer border ${isActive
                                                            ? "bg-couleur1 text-white border-couleur1 shadow-xs"
                                                            : "bg-white dark:bg-gray-800 text-couleur1 dark:text-gray-300 border-couleur1/20 dark:border-white/20 hover:bg-couleur1/10"
                                                            }`}
                                                    >
                                                        {isRel ? (displayValue.includes(':') ? `🔗 ${displayValue.split(':')[1]}` : "relation") : c}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </td>
                                    <td className="p-3">
                                        <div className="flex justify-end gap-1.5">
                                            <button onClick={saveEdit} className="p-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-xs transition-all active:scale-95 cursor-pointer" title="Sauvegarder"><Check size={16} /></button>
                                            <button onClick={(e) => { e.preventDefault(); setEditingIndex(-1); }} className="p-1.5 bg-gray-400 hover:bg-gray-500 text-white rounded-lg shadow-xs transition-all active:scale-95 cursor-pointer" title="Annuler"><X size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                <tr key={idx} className="hover:bg-couleur3/30 dark:hover:bg-gray-800/40 transition-colors">
                                    <td className="py-3 px-4 font-semibold text-couleur1 dark:text-gray-200">{item.nom}</td>
                                    <td className="py-3 px-4 text-xs font-mono opacity-70 uppercase">{item.type}</td>
                                    <td className="py-3 px-4 text-xs font-mono text-gray-600 dark:text-gray-400">{item.default_value || "-"}</td>
                                    <td className="py-3 px-4 text-xs italic opacity-60">{Array.isArray(item.constraint) ? item.constraint.join(", ") : (item.constraint || "-")}</td>
                                    <td className="py-3 px-4">
                                        <div className="flex justify-end gap-1.5">
                                            <button
                                                className="p-1.5 bg-amber-400/90 hover:bg-amber-500 text-white rounded-lg shadow-xs transition-all active:scale-95 cursor-pointer"
                                                onClick={(e) => { e.preventDefault(); startEditing(idx, item); }}
                                                title="Modifier le champ"
                                            >
                                                <Edit size={16}></Edit>
                                            </button>
                                            <button
                                                className="p-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg shadow-xs transition-all active:scale-95 cursor-pointer"
                                                onClick={(e) => { e.preventDefault(); setFields(fields.filter((_, i) => i !== idx)) }}
                                                title="Supprimer le champ"
                                            >
                                                <Trash2 size={16}></Trash2>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        ))}
                        {addField && <tr className="bg-couleur1/5 dark:bg-gray-800/60 border-t-2 border-couleur1/20">
                            <td className="p-3">
                                <input type="text" placeholder="Field Name" onInput={(e) => setNewField({ ...newField, nom: e.target.value })} value={newField.nom} className="w-full px-2.5 py-1.5 border border-couleur1/30 rounded-lg outline-none focus:ring-2 focus:ring-couleur1/50 bg-white dark:bg-gray-900 text-couleur1 dark:text-gray-100 text-xs font-medium" />
                            </td>
                            <td className="p-3">
                                <select
                                    className="w-full px-2.5 py-1.5 border border-couleur1/30 rounded-lg outline-none focus:ring-2 focus:ring-couleur1/50 bg-white dark:bg-gray-900 text-couleur1 dark:text-gray-100 text-xs font-medium cursor-pointer"
                                    onInput={(e) => setNewField({ ...newField, type: e.target.value })}
                                    value={newField.type}
                                >
                                    <option value="">Type</option>
                                    <option value="int">INT</option>
                                    <option value="string">VARCHAR</option>
                                    <option value="text">TEXT</option>
                                </select>
                            </td>
                            <td className="p-3"><input list="default-value-list-edit" className="w-full px-2.5 py-1.5 border border-couleur1/30 rounded-lg outline-none focus:ring-2 focus:ring-couleur1/50 bg-white dark:bg-gray-900 text-couleur1 dark:text-gray-100 text-xs font-medium" type="text" placeholder="Default value" onInput={(e) => setNewField({ ...newField, default_value: e.target.value })} value={newField.default_value} /></td>
                            <td className="p-3">
                                <div className="flex flex-wrap gap-1 min-w-30">
                                    {["primary key", "unique", "not null", "relation", ...(newField.type === "int" ? ["autoincrement"] : [])].map(c => {
                                        const isRel = c === "relation";
                                        const isActive = isRel
                                            ? newField.constraint?.some(cons => typeof cons === 'string' && cons.startsWith('relation:'))
                                            : newField.constraint?.includes(c);
                                        const displayValue = isRel
                                            ? (newField.constraint?.find(cons => typeof cons === 'string' && cons.startsWith('relation:')) || "relation")
                                            : c;
                                        return (
                                            <button
                                                key={c}
                                                type="button"
                                                onClick={() => {
                                                    if (isRel && isActive) {
                                                        toggleConstraint(newField, setNewField, c);
                                                    } else {
                                                        toggleConstraint(newField, setNewField, c);
                                                    }
                                                }}
                                                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all cursor-pointer border ${isActive
                                                    ? "bg-couleur1 text-white border-couleur1 shadow-xs"
                                                    : "bg-white dark:bg-gray-800 text-couleur1 dark:text-gray-300 border-couleur1/20 dark:border-white/20 hover:bg-couleur1/10"
                                                    }`}
                                            >
                                                {isRel ? (displayValue.includes(':') ? `🔗 ${displayValue.split(':')[1]}` : "relation") : c}
                                            </button>
                                        );
                                    })}
                                </div>
                            </td>
                            <td className="p-3 text-right">
                                <button type="button" onClick={handleNewField} className="p-1.5 bg-couleur1 hover:bg-couleur1/90 text-white rounded-lg shadow-xs transition-all active:scale-95 cursor-pointer"><Check size={18}></Check></button>
                            </td>
                        </tr>}
                    </tbody>
                </table>
            </div>

            {/* Version Cartes (Mobile uniquement : block md:hidden) */}
            <div className="md:hidden flex flex-col gap-3">
                {fields.map((item, idx) => (
                    editingIndex === idx ? (
                        <div key={idx} className="bg-couleur1/5 dark:bg-gray-800/60 p-4 rounded-xl border border-couleur1/20 flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold uppercase text-couleur1">Editing Field</span>
                                <div className="flex gap-1.5">
                                    <button onClick={saveEdit} className="p-1.5 bg-emerald-500 text-white rounded-lg"><Check size={16} /></button>
                                    <button onClick={(e) => { e.preventDefault(); setEditingIndex(-1); }} className="p-1.5 bg-gray-400 text-white rounded-lg"><X size={16} /></button>
                                </div>
                            </div>
                            <input type="text" onInput={(e) => setEditField({ ...editField, nom: e.target.value })} value={editField.nom} placeholder="Field Name" className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 text-sm" />
                            <select onInput={(e) => setEditField({ ...editField, type: e.target.value })} value={editField.type} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 text-sm">
                                <option value="">Type</option>
                                <option value="int">INT</option>
                                <option value="string">VARCHAR</option>
                                <option value="text">TEXT</option>
                            </select>
                            <input list="default-value-list-edit" type="text" onInput={(e) => setEditField({ ...editField, default_value: e.target.value })} value={editField.default_value} placeholder="Default value" className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 text-sm" />
                            <div className="flex flex-wrap gap-1">
                                {["primary key", "unique", "not null", "relation", ...(editField.type === "int" ? ["autoincrement"] : [])].map(c => {
                                    const isRel = c === "relation";
                                    const isActive = isRel ? editField.constraint?.some(cons => typeof cons === 'string' && cons.startsWith('relation:')) : editField.constraint?.includes(c);
                                    return (
                                        <button key={c} type="button" onClick={() => toggleConstraint(editField, setEditField, c)} className={`px-2 py-1 rounded-full text-xs font-semibold border ${isActive ? "bg-couleur1 text-white" : "bg-white dark:bg-gray-800"}`}>
                                            {c}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div key={idx} className="bg-couleur3/20 dark:bg-gray-800/40 p-3.5 rounded-xl border border-couleur1/10 flex justify-between items-center">
                            <div className="flex flex-col gap-0.5">
                                <span className="font-semibold text-couleur1 dark:text-gray-200 text-sm">{item.nom}</span>
                                <span className="text-xs font-mono opacity-70 uppercase">{item.type} {item.default_value ? `• Def: ${item.default_value}` : ''}</span>
                                <span className="text-[11px] italic opacity-60">{Array.isArray(item.constraint) ? item.constraint.join(", ") : item.constraint}</span>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={(e) => { e.preventDefault(); startEditing(idx, item); }} className="p-2 bg-amber-400 text-white rounded-lg"><Edit size={16} /></button>
                                <button onClick={(e) => { e.preventDefault(); setFields(fields.filter((_, i) => i !== idx)) }} className="p-2 bg-rose-500 text-white rounded-lg"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    )
                ))}

                {addField && (
                    <div className="bg-couleur1/5 dark:bg-gray-800/60 p-4 rounded-xl border-2 border-couleur1/30 flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold uppercase text-couleur1">New Field</span>
                            <button type="button" onClick={() => setAddfield(false)} className="p-1 bg-rose-600 text-white rounded-lg"><MdCancel size={16} /></button>
                        </div>
                        <input type="text" placeholder="Field Name" onInput={(e) => setNewField({ ...newField, nom: e.target.value })} value={newField.nom} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 text-sm" />
                        <select onInput={(e) => setNewField({ ...newField, type: e.target.value })} value={newField.type} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 text-sm">
                            <option value="">Type</option>
                            <option value="int">INT</option>
                            <option value="string">VARCHAR</option>
                            <option value="text">TEXT</option>
                        </select>
                        <input list="default-value-list-edit" type="text" placeholder="Default value" onInput={(e) => setNewField({ ...newField, default_value: e.target.value })} value={newField.default_value} className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 text-sm" />
                        <div className="flex flex-wrap gap-1">
                            {["primary key", "unique", "not null", "relation", ...(newField.type === "int" ? ["autoincrement"] : [])].map(c => {
                                const isRel = c === "relation";
                                const isActive = isRel ? newField.constraint?.some(cons => typeof cons === 'string' && cons.startsWith('relation:')) : newField.constraint?.includes(c);
                                return (
                                    <button key={c} type="button" onClick={() => toggleConstraint(newField, setNewField, c)} className={`px-2 py-1 rounded-full text-xs font-semibold border ${isActive ? "bg-couleur1 text-white" : "bg-white dark:bg-gray-800"}`}>
                                        {c}
                                    </button>
                                );
                            })}
                        </div>
                        <button type="button" onClick={handleNewField} className="w-full py-2 bg-couleur1 text-white font-semibold rounded-lg text-sm mt-1">Confirm Field</button>
                    </div>
                )}
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
                <button className="w-full sm:w-auto px-6 py-2.5 bg-couleur3 dark:bg-gray-800 hover:bg-couleur3/80 dark:hover:bg-gray-700 text-couleur1 dark:text-gray-200 font-semibold text-sm rounded-xl border border-couleur1/20 dark:border-white/20 transition-all cursor-pointer active:scale-95" onClick={handleCancel}>Cancel</button>
                <button onClick={handleUpdateModel} className="w-full sm:w-auto px-6 py-2.5 bg-couleur1 hover:bg-couleur1/90 text-white font-semibold text-sm rounded-xl shadow-md transition-all cursor-pointer active:scale-95">Update</button>
            </div>
        </div>

        {showRelationModal && (
            <RelationModal
                models={modelList?.models || []}
                onSelectRelation={handleSelectRelation}
                onClose={() => setShowRelationModal(false)}
            />
        )}

        <datalist id="default-value-list-edit">
            <option value="autoincrement" />
            <option value="current_timestamp" />
            <option value="null" />
            <option value="0" />
            <option value="true" />
            <option value="false" />
            <option value="''" />
        </datalist>
    </form>)
}