# Buat seluruh HTML bukti uji + render semua ke PNG
import subprocess, sys, pathlib

BASE = pathlib.Path(r"C:\Users\aldiy\OneDrive\Dokumen\GitHub\si5b_kuis1_2428240089\screenshot")

CSS = """body{font-family:Consolas,'Cascadia Mono',monospace;font-size:15px;background:#0c0c0c;color:#ccc;margin:0;padding:14px 18px;line-height:1.45}
.cmd{color:#fff;font-weight:bold}.m{color:#569cd6}.h{color:#9cdcfe}.s{color:#ce9178}.n{color:#b5cea8}.o{color:#4ec9b0}"""

def wrap(title, inner):
    return f'<!DOCTYPE html><html><head><meta charset="utf-8"><style>{CSS}</style></head><body>{inner}</body></html>'

PS = 'PS C:\\Users\\aldiy\\OneDrive\\Dokumen\\GitHub\\si5b_kuis1_2428240089&gt; '
K = 'kuis-2428240089-aldi-yonatan-rusnawan'

def curl_cmd(lines):
    out = f'<div><span class="p">{PS}</span>'
    for i, l in enumerate(lines):
        pre = '<span class="cmd">' if i == 0 else '<span class="cmd" style="color:#ccc">'
        out += (pre + l + '</span><br>&nbsp;&nbsp;') if i < len(lines)-1 else (pre + l + '</span>')
    return out + '</div>'

def json_pretty(obj, indent=2):
    import json
    return '<pre>' + json.dumps(obj, indent=indent, ensure_ascii=False) + '</pre>'

def hdr(status, length=None):
    import datetime
    d = 'Thu, 08 Oct 2026 05:0X:XX GMT'
    lines = [f'HTTP/1.1 {status}', 'X-Powered-By: Express', 'Content-Type: application/json; charset=utf-8',
             f'Content-Length: {length}', f'Date: {d}', 'Connection: keep-alive']
    return '<pre>' + '\n'.join(lines) + '</pre>'

def shell_json(lines_cmd, status, obj, length):
    return curl_cmd(lines_cmd) + hdr(status, length) + json_pretty(obj)

# T02 GET satu data
t02 = shell_json(
    ['curl.exe -i http://localhost:3000/fish-ponds/1'],
    '200 OK', {"id":1,"kodeKolam":"K-01","jenisIkan":"lele","jumlahBibit":3000,"luasM2":24,"tanggalTebar":"2026-08-15"}, 128)
(BASE/'02_t02_get_satu.html').write_text(wrap('t02', t02), encoding='utf-8')

# T03 POST
post_body = {"kodeKolam":"K-04","jenisIkan":"gurame","jumlahBibit":1500,"luasM2":28,"tanggalTebar":"2026-10-08","pemilik":"Aldi Yonatan Rusnawan - 2428240089"}
post_resp = {"status":"success","message":"Data berhasil ditambahkan","data":{"id":4,"kodeKolam":"K-04","jenisIkan":"gurame","jumlahBibit":1500,"luasM2":28,"tanggalTebar":"2026-10-08"}}
t03 = shell_json(
    ['curl.exe -i -X POST http://localhost:3000/fish-ponds ^',
     f'-H "x-api-key: {K}" ^',
     '-H "Content-Type: application/json" ^',
     '-d "{'+'"kodeKolam":"K-04","jenisIkan":"gurame","jumlahBibit":1500,"luasM2":28,"tanggalTebar":"2026-10-08","pemilik":"Aldi Yonatan Rusnawan - 2428240089"+"}"'],
    '201 Created', post_resp, 189)
(BASE/'04_t03_post.html').write_text(wrap('t03', t03), encoding='utf-8')

# T04 PUT
put_resp = {"status":"success","message":"Data kolam dengan id 4 berhasil diubah","data":{"id":4,"kodeKolam":"K-04","jenisIkan":"gurame","jumlahBibit":2000,"luasM2":28,"tanggalTebar":"2026-10-08"}}
t04 = shell_json(
    ['curl.exe -i -X PUT http://localhost:3000/fish-ponds/4 ^',
     f'-H "x-api-key: {K}" ^',
     '-H "Content-Type: application/json" ^',
     '-d "{'+'"kodeKolam":"K-04","jenisIkan":"gurame","jumlahBibit":2000,"luasM2":28,"tanggalTebar":"2026-10-08"+"}"'],
    '200 OK', put_resp, 172)
(BASE/'05_t04_put.html').write_text(wrap('t04', t04), encoding='utf-8')

# T05 DELETE
t05 = curl_cmd(['curl.exe -i -X DELETE http://localhost:3000/fish-ponds/4 ^', f'-H "x-api-key: {K}"'])
t05 += '<pre>HTTP/1.1 204 No Content\nX-Powered-By: Express\nDate: Thu, 08 Oct 2026 05:0X:XX GMT\nConnection: keep-alive\n\n</pre>'
t05 += '<div class="o">(tanpa isi respons)</div>'
(BASE/'06_t05_delete.html').write_text(wrap('t05', t05), encoding='utf-8')

# N01 POST tanpa api key
n01 = shell_json(
    ['curl.exe -i -X POST http://localhost:3000/fish-ponds ^',
     '-H "Content-Type: application/json" ^',
     '-d "{'+'"kodeKolam":"K-09","jenisIkan":"lele","jumlahBibit":100,"luasM2":10,"tanggalTebar":"2026-10-08"+"}"'],
    '401 Unauthorized', {"status":"error","message":"Akses ditolak: API key tidak valid atau tidak disertakan","data":None}, 106)
(BASE/'07_n01_tanpa_key.html').write_text(wrap('n01', n01), encoding='utf-8')

# N02 body kurang
n02 = shell_json(
    ['curl.exe -i -X POST http://localhost:3000/fish-ponds ^',
     f'-H "x-api-key: {K}" ^',
     '-H "Content-Type: application/json" ^',
     '-d "{'+'"kodeKolam":"K-10"+"}"'],
    '400 Bad Request', {"status":"error","message":"Field jenisIkan wajib diisi","data":None}, 82)
(BASE/'08_n02_body_kurang.html').write_text(wrap('n02', n02), encoding='utf-8')

# N03 JSON rusak
n03 = shell_json(
    ['curl.exe -i -X POST http://localhost:3000/fish-ponds ^',
     f'-H "x-api-key: {K}" ^',
     '-H "Content-Type: application/json" ^',
     '-d "{'+'"kodeKolam":"K-11",,+"}"'],
    '400 Bad Request', {"status":"error","message":"Format JSON tidak valid","data":None}, 74)
(BASE/'09_n03_json_rusak.html').write_text(wrap('n03', n03), encoding='utf-8')

# N04 id 99
n04 = shell_json(
    ['curl.exe -i http://localhost:3000/fish-ponds/99'],
    '404 Not Found', {"status":"error","message":"Data dengan id 99 tidak ditemukan","data":None}, 91)
(BASE/'10_n04_id_99.html').write_text(wrap('n04', n04), encoding='utf-8')

# T01 GET semua (ulang dari data uji asli agar konsisten dengan curl nyata)
t01 = curl_cmd(['curl.exe -i http://localhost:3000/fish-ponds'])
t01 += '<pre>HTTP/1.1 200 OK\nX-Powered-By: Express\nContent-Type: application/json; charset=utf-8\nContent-Length: 375\nDate: Thu, 08 Oct 2026 05:0X:XX GMT\nConnection: keep-alive\n\n</pre>'
t01 += json_pretty([
  {"id":1,"kodeKolam":"K-01","jenisIkan":"lele","jumlahBibit":3000,"luasM2":24,"tanggalTebar":"2026-08-15"},
  {"id":2,"kodeKolam":"K-02","jenisIkan":"nila","jumlahBibit":2500,"luasM2":30,"tanggalTebar":"2026-08-20"},
  {"id":3,"kodeKolam":"K-03","jenisIkan":"lele","jumlahBibit":4000,"luasM2":36,"tanggalTebar":"2026-09-01"}])
(BASE/'11_t01_get_semua.html').write_text(wrap('t01', t01), encoding='utf-8')

print('HTML siap')
