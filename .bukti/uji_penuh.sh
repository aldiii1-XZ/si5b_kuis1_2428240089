#!/bin/bash
# Jalankan ulang seluruh 9 skenario dan simpan output mentah curl -i
K="kuis-2428240089-aldi-yonatan-rusnawan"; B="http://localhost:3000/fish-ponds"
{
echo "=== T01 GET semua ==="; curl -s -i "$B"
echo; echo "=== T02 GET id 1 ==="; curl -s -i "$B/1"
echo; echo "=== T03 POST ==="; curl -s -i -X POST "$B" -H "x-api-key: $K" -H "Content-Type: application/json" -d '{"kodeKolam":"K-04","jenisIkan":"gurame","jumlahBibit":1500,"luasM2":28,"tanggalTebar":"2026-10-08","pemilik":"Aldi Yonatan Rusnawan - 2428240089"}'
echo; echo "=== T04 PUT id 4 ==="; curl -s -i -X PUT "$B/4" -H "x-api-key: $K" -H "Content-Type: application/json" -d '{"kodeKolam":"K-04","jenisIkan":"gurame","jumlahBibit":2000,"luasM2":28,"tanggalTebar":"2026-10-08"}'
echo; echo "=== T05 DELETE id 4 ==="; curl -s -i -X DELETE "$B/4" -H "x-api-key: $K"
echo; echo "=== N01 POST tanpa key ==="; curl -s -i -X POST "$B" -H "Content-Type: application/json" -d '{"kodeKolam":"K-09","jenisIkan":"lele","jumlahBibit":100,"luasM2":10,"tanggalTebar":"2026-10-08"}'
echo; echo "=== N02 POST kurang field ==="; curl -s -i -X POST "$B" -H "x-api-key: $K" -H "Content-Type: application/json" -d '{"kodeKolam":"K-10"}'
echo; echo "=== N03 JSON rusak ==="; curl -s -i -X POST "$B" -H "x-api-key: $K" -H "Content-Type: application/json" -d '{"kodeKolam":"K-11",,}'
echo; echo "=== N04 GET id 99 ==="; curl -s -i "$B/99"
echo;
} > .bukti/uji_penuh.txt 2>&1
