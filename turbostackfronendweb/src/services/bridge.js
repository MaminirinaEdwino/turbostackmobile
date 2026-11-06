

const API_BASE = `http://localhost:8080/api`;

const getHeaders = () => {
    const token = localStorage.getItem("turbostack_token") || "";
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};

export const GoApp = {
    login: async (username, password) => {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        if (!res.ok) {
            const errText = await res.text();
            throw new Error(errText || "Échec de la connexion");
        }
        const data = await res.json();
        if (data.token) {
            localStorage.setItem("turbostack_token", data.token);
        }
        return data;
    },

    register: async (username, password) => {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        if (!res.ok) {
            const errText = await res.text();
            throw new Error(errText || "Échec de l'inscription");
        }
        return await res.json();
    },

    logout: () => {
        localStorage.removeItem("turbostack_token");
        window.location.reload()
    },
    getStats: async () => {
        try {
            const res = await fetch(`${API_BASE}/system/stats`, {
                headers: getHeaders()
            });
            if (!res.ok) return { os: "Browser", arch: "wasm" };
            return await res.json();
        } catch {
            return { os: "Browser", arch: "wasm" };
        }
    },

    createProject: async (name, description, type) => {
        const res = await fetch(`${API_BASE}/projects`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({ name, description, type })
        });
        if (!res.ok) throw new Error("Erreur lors de la création du projet");
        const data = await res.json();
        return data.message || "Success";
    },

    fetchProjects: async () => {
        const res = await fetch(`${API_BASE}/projects`, {
            headers: getHeaders()
        });
        if (!res.ok) return [];
        return await res.json();
    },

    fetchProjectByName: async (name) => {
        const res = await fetch(`${API_BASE}/projects/${encodeURIComponent(name)}`, {
            headers: getHeaders()
        });
        if (!res.ok) return null;
        return await res.json();
    },

    savedb: async (name, projectBdd) => {
        // Récupérer d'abord le projet complet, mettre à jour sa BDD, puis sauvegarder
        const project = await GoApp.fetchProjectByName(name);
        if (!project) return "Error: Project not found";
        project.bdd = JSON.parse(projectBdd);
        return await GoApp.saveProject(name, JSON.stringify(project));
    },

    saveProject: async (name, projectJson) => {
        const projectObj = typeof projectJson === "string" ? JSON.parse(projectJson) : projectJson;
        const res = await fetch(`${API_BASE}/projects`, {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(projectObj)
        });
        if (!res.ok) throw new Error("Erreur lors de la sauvegarde");
        const data = await res.json();
        return data.message || "Success";
    },

    exportProject: async (name, type) => {
        console.log(name, type);

        try {
            const res = await fetch(`${API_BASE}/export`, {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify({
                    "name": name,
                    "typeProject": type
                })
            });

            if (!res.ok) {
                throw new Error(`Erreur HTTP : ${res.status}`);
            }


            const blob = await res.blob();
            console.log("Fichier récupéré avec succès (Blob) :", blob);
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `${name || 'export'}.zip`;

            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(downloadUrl);

            return true;

        } catch (error) {
            console.error("Erreur lors de l'export et du téléchargement :", error);
            throw error;
        }
    }
    ,

    fetchProjectFiles: async (name) => {
        // Optionnel : si géré côté serveur ou simulé via la structure du projet
        const res = await fetch(`${API_BASE}/fetchprojectfile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "name": name
            })
        }).then(res => res.json()).then(res => {
            return res
        })
        return res
    },

    getFileContent: async (name, path) => {
        const res = await fetch(`${API_BASE}/getfilecontent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                projectName: name,
                path: path
            })
        }).then(res => res.json()).then(res => {
            return res
        })
        return res
    },

    saveToken: async (token) => {
        localStorage.setItem("turbostack_token", token);
        const res = await fetch(`${API_BASE}/user/token`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token })
        });
        console.log(res)
        return "Token Saved";
    },

    checkToken: async () => {
        const res = await fetch(`${API_BASE}/user/token/check`, {
            headers: getHeaders()
        });
        if (!res.ok) return { expired: "true", subscription: "free" };
        return await res.json();
    },

    // fetChFileForUpload: async (folder) => {
    //     // Navigation locale de secours si exécuté dans le navigateur
    //     return [];
    // },

    // getImageAsBase64: async (path) => {
    //     return "";
    // },

    uploadAsset: async (projectName, fileName, base64file) => {
        const res = await fetch(`${API_BASE}/projects/assets`, {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify({
                project_name: projectName,
                file_name: fileName,
                base64_image: base64file
            })
        });
        if (!res.ok) throw new Error("Erreur upload asset");
        return "success";
    },

    saveScript: async (projectName, scriptName, script) => {
        const project = await GoApp.fetchProjectByName(projectName);
        if (!project) return "Error";
        if (!project.bdd) project.bdd = { scripts: [] };
        if (!project.bdd.scripts) project.bdd.scripts = [];
        project.bdd.scripts.push({ scriptName, script });
        return await GoApp.saveProject(projectName, project);
    },

    // runProject: async (projectName) => {
    //     return { isRunning: true, logs: ["Projet démarré via API"], pid: 1234 };
    // },

    // stopProject: async (projectName) => {
    //     return { isRunning: false, logs: ["Serveur arrêté"], pid: 0 };
    // },

    getStatus: async () => {
        return { isRunning: false, logs: [], pid: 0 };
    },

    openPreviewWindow: async () => {
        window.open("http://localhost:5173/?mode=preview", "_blank");
    },

    loadLibrairie: async () => {
        const res = await fetch(`${API_BASE}/system/librairie`, {
            headers: getHeaders()
        });
        if (!res.ok) return [];
        return await res.json();
    },

    loadPageLibrairie: async () => {
        const res = await fetch(`${API_BASE}/librairie/page`, {
            headers: getHeaders()
        });
        if (!res.ok) return [];
        return await res.json();
    },

    loadCompLib: async () => {
        const res = await fetch(`${API_BASE}/librairie/component`, {
            headers: getHeaders()
        });
        if (!res.ok) return [];
        return await res.json();
    },

    loadStyleLib: async () => {
        const res = await fetch(`${API_BASE}/librairie/style`, {
            headers: getHeaders()
        });
        if (!res.ok) return [];
        return await res.json();
    },

    getProjectType: async (projectName) => {
        const project = await GoApp.fetchProjectByName(projectName);
        return project ? project.type : "";
    },

    deleteProject: async (projectName) => {
        const res = await fetch(`${API_BASE}/projects/${encodeURIComponent(projectName)}`, {
            method: "DELETE",
            headers: getHeaders()
        });
        if (!res.ok) throw new Error("Erreur lors de la suppression");
        const data = await res.json();
        return data.message || "Success";
    },
    chat: async (message) => {
        const result = await fetch(`${API_BASE}/chat`, {
            "method": "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "message": message
            })
        }).then(res => res.json()).then(res => {
            // alert(res.message)
            return res.message
        })
        return result
    }
};
