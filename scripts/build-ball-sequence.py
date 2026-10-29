"""Generate scroll frames: pip install Pillow; python3 scripts/build-ball-sequence.py."""
from pathlib import Path
import hashlib
import json
from PIL import Image

root = Path(__file__).resolve().parents[1]
output = root / 'public/ball-sequence'
output.mkdir(exist_ok=True)
frames = []
previous = None
for index in range(1, 101):
    image = Image.open(root / f'public/data/{index:04}.png').convert('RGB')
    digest = hashlib.sha256(image.tobytes()).digest()
    if digest == previous:
        continue
    previous = digest
    frames.append(f'{index:04}')
    for width in (640, 960):
        resized = image.resize((width, width * 9 // 16), Image.Resampling.LANCZOS)
        resized.save(output / f'{index:04}-{width}.webp', quality=88, method=6)
(root / 'src/data/ball-sequence.json').write_text(json.dumps(frames, indent=2) + '\n')
print(f'{len(frames)} frames, {sum(p.stat().st_size for p in output.glob("*.webp")):,} bytes for both sizes')
