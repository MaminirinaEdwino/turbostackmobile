package com.turbostack.tsmobilestandalone;

import android.content.Context;
import java.io.File;
import java.io.IOException;

public class FileUtils {

    public static boolean verifierExistenceBase(Context context) {
        // 1. Utiliser le dossier de fichiers externes (ou getDatabasePath selon ton choix de stockage)
        File dossierData = context.getExternalFilesDir(null);
        
        if (dossierData != null) {
            // 2. Concaténer proprement le nom du fichier sans réinjecter un chemin absolu complet
            File fichierBase = new File(dossierData, "ma_base.db");
            
            // 3. Retourner vrai si le fichier existe, faux sinon
            return fichierBase.exists();
        }
        
        return false;
    }

    public static void creerFichierDatabase(Context context) {
        // Utiliser getDatabasePath avec uniquement le nom du fichier 
        // pour qu'il soit placé dans le répertoire dédié aux bases de données de l'application
        File dbFile = context.getDatabasePath("ma_base.db");
        System.out.println(dbFile);
        if (!dbFile.exists()) {
            try {
                // Crée le dossier parent si nécessaire (ex: /data/user/0/com.turbostack.tsmobilestandalone/databases/)
                File parentDir = dbFile.getParentFile();
                if (parentDir != null && !parentDir.exists()) {
                    parentDir.mkdirs();
                }
                // Crée uniquement le fichier vide
                dbFile.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}