import zipfile
import xml.etree.ElementTree as ET

docx_path = "Đề cương giữa HKI Tin 7.docx"
with zipfile.ZipFile(docx_path) as docx:
    xml_content = docx.read("word/document.xml")

root = ET.fromstring(xml_content)
# Namespaces in docx
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}

lines = []
for p in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
    texts = [node.text for node in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if node.text]
    line = "".join(texts).strip()
    if line:
        lines.append(line)

with open("de_cuong_extracted.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print(f"Extracted {len(lines)} lines.")
