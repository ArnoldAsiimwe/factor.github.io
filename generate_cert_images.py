import fitz
import os

files = [
    ("Certificate-the-udara-project-2026.pdf", "certificate-udara.png"),
    ("Introduction_to_Cybersecurity_certificate_2024bit059-std-must-ac-ug_68a2ac72-d70b-4480-8c35-b5a2f20c6261.pdf", "certificate-cybersecurity.png"),
]

for src, dst in files:
    doc = fitz.open(src)
    page = doc[0]
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    pix.save(dst)
    print(f"saved {dst}")
