#!/bin/bash
# Ulangi T04/T05 terhadap id hasil T03 terbaru (server masih jalan, data id 5 dari uji sebelumnya)
K="kuis-2428240089-aldi-yonatan-rusnawan"; B="http://localhost:3000/fish-ponds"
echo "=== PUT id 5 ==="
curl -s -i -X PUT "$B/5" -H "x-api-key: $K" -H "Content-Type: application/json" -d '{"kodeKolam":"K-04","jenisIkan":"gurame","jumlahBibit":2000,"luasM2":28,"tanggalTebar":"2026-10-08"}'
echo; echo "=== DELETE id 5 ==="
curl -s -i -X DELETE "$B/5" -H "x-api-key: $K"
echo
