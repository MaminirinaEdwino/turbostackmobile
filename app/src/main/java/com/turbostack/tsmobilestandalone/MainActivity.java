package com.turbostack.tsmobilestandalone;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.os.Build;
import android.os.Environment;
import android.net.Uri;
import android.provider.Settings;
import android.Manifest;
import android.content.pm.PackageManager;
import android.content.Intent;
import java.io.File;
import mobile.Mobile;

public class MainActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        getWindow().setStatusBarColor(android.graphics.Color.parseColor("#1a535c"));
        
        // Gestion des permissions si nécessaire (uniquement si vous stockez hors du dossier privé)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            if (!Environment.isExternalStorageManager()) {
                Intent intent = new Intent(Settings.ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION);
                intent.setData(Uri.parse("package:" + getPackageName()));
                startActivity(intent);
            }
        }

        // CORRECTION LOGIQUE : Si le fichier n'existe pas (!fileexist), on le crée
        File dbFile = getDatabasePath("ma_base.db");
        if (!dbFile.exists()) {
            dbFile.getParentFile().mkdirs();
            FileUtils.creerFichierDatabase(this);
        }

        String dbPath = dbFile.getAbsolutePath();
        System.out.println("Chemin de la BDD : " + dbPath);

        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    System.out.println("Démarrage du serveur Go en arrière-plan...");
                    Mobile.startServer(dbPath);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();

        // Configuration du WebView
        WebView webView = (WebView) findViewById(R.id.my_webview);
        WebSettings settings = webView.getSettings();

        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowUniversalAccessFromFileURLs(true);
        
        webView.loadUrl("file:///android_asset/index.html");

        
        
        // Démarrage du serveur Go avec un chemin garanti
        // Mobile.startServer(dbPath);
    }
}