#!/bin/bash
# Script super cepat push otomatis ke GitHub

cd /workspaces/awaluddin_wahid
git add .
git commit -m "Update website files: index.html, style.css, script.js"
git push origin main

echo "✅ Selesai! File sudah masuk ke GitHub"
