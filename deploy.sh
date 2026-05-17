#!/bin/bash

# Script otomatis push file ke GitHub

echo "🚀 Mulai proses push ke GitHub..."
echo "=================================="

# Cek apakah di folder project yang benar
if [ ! -f "index.html" ]; then
    echo "❌ Error: File index.html tidak ditemukan!"
    echo "Pastikan Anda di folder project yang benar."
    exit 1
fi

# Tampilkan file yang akan di-push
echo "📁 File yang akan di-push:"
echo ""
git status --short
echo ""

# Git add
echo "✅ Menambahkan file..."
git add .

# Git commit
echo "📝 Membuat commit..."
read -p "Masukkan pesan commit (tekan Enter untuk default): " commit_msg
commit_msg=${commit_msg:-"Update website files"}
git commit -m "$commit_msg"

# Git push
echo "📤 Pushing ke GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✨ Sukses! File telah masuk ke repository GitHub"
    echo "🌐 Akses di: https://github.com/wahidawaluddin789-dotcom/awaluddin_wahid"
else
    echo "❌ Error saat push. Cek koneksi internet atau GitHub credentials."
    exit 1
fi
