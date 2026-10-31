"""Check crawlable HTML and SEO endpoints against a running production server.

Usage: python3 tests/seo-smoke.py [http://127.0.0.1:3000]
Uses only the Python standard library; no browser or database is required.
"""

import json
import struct
import sys
from html.parser import HTMLParser
from urllib.error import HTTPError
from urllib.parse import urlsplit
from urllib.request import urlopen
from xml.etree import ElementTree


ORIGIN = "https://www.samuelbaumgartner.ch"
BASE = (sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:3000").rstrip("/")
PROJECTS = (
    "provincia", "remote-ball", "ball-on-plate", "zurich-hack",
    "nasa-hack", "start-hack", "overleaf-selfhosted",
)
DETAILS = {
    'provincia': 'From colony to battlefield',
    'remote-ball': 'Mechanical Design',
    'ball-on-plate': 'Path Planning Implementation',
    'zurich-hack': 'Natural-language task input',
    'nasa-hack': 'Public Transport',
    'start-hack': 'Core Concept',
    'overleaf-selfhosted': 'Technical Details',
}


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.meta = {}
        self.canonicals = []
        self.links = set()
        self.h1_count = 0
        self.headings = []
        self.schemas = []
        self.title = ""
        self.text = []
        self._title = False
        self._script = False
        self._json = None
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "meta":
            key = attrs.get("name") or attrs.get("property")
            if key:
                self.meta.setdefault(key, []).append(attrs.get("content", ""))
        elif tag == "link" and attrs.get("rel") == "canonical":
            self.canonicals.append(attrs.get("href"))
        elif tag == "a":
            self.links.add(attrs.get("href", ""))
        elif tag == "h1":
            self.h1_count += 1
            self.headings.append(1)
        elif tag in ("h2", "h3", "h4", "h5", "h6"):
            self.headings.append(int(tag[1]))
        elif tag == "title":
            self._title = True
        elif tag == "script":
            self._script = True
            if attrs.get("type") == "application/ld+json":
                self._json = ""
        elif tag == "img":
            assert "alt" in attrs, "Image is missing alt text"

    def handle_endtag(self, tag):
        if tag == "title":
            self._title = False
        elif tag == "script":
            if self._json is not None:
                self.schemas.extend(json.loads(self._json).get("@graph", []))
                self._json = None
            self._script = False

    def handle_data(self, data):
        if self._title:
            self.title += data
        if self._json is not None:
            self._json += data
        if not self._script:
            self.text.append(data)

    def one_meta(self, key):
        values = self.meta.get(key, [])
        assert len(values) == 1 and values[0], f"Expected one nonempty {key}: {values}"
        return values[0]


def get(path):
    try:
        response = urlopen(BASE + path, timeout=30)
    except HTTPError as error:
        response = error
    return response.status, response.headers, response.read()


def public_page(path):
    status, headers, body = get(path)
    assert status == 200, f"{path}: HTTP {status}"
    assert "noindex" not in headers.get("X-Robots-Tag", "")
    page = Page(body.decode())
    assert page.h1_count == 1, f"{path}: expected one H1, got {page.h1_count}"
    assert page.headings[0] == 1 and all(current <= previous + 1 for previous, current in zip(page.headings, page.headings[1:])), f"{path}: skipped heading levels {page.headings}"
    assert len(page.canonicals) == 1 and page.canonicals[0].rstrip('/') == (ORIGIN + path).rstrip('/'), f"{path}: {page.canonicals}"
    assert "Samuel Baumgartner" in page.title
    assert "noindex" not in page.one_meta("robots")
    assert "noindex" not in page.one_meta("googlebot")
    assert 80 <= len(page.one_meta("description")) <= 180
    assert page.one_meta("og:url").rstrip('/') == (ORIGIN + path).rstrip('/')
    assert page.one_meta("og:title")
    assert page.one_meta("og:description") == page.one_meta("description")
    assert page.one_meta("twitter:card") == "summary_large_image"
    assert page.one_meta("og:image") == page.one_meta("twitter:image")
    image = urlsplit(page.one_meta("og:image"))
    assert f"{image.scheme}://{image.netloc}" == ORIGIN
    image_status, image_headers, png = get(image.path + ("?" + image.query if image.query else ""))
    assert image_status == 200 and "image/png" in image_headers.get("Content-Type", "")
    assert png[:8] == b"\x89PNG\r\n\x1a\n" and struct.unpack(">II", png[16:24]) == (1200, 630)
    print(f"PASS {path}: crawlable HTML, unique canonical, metadata, JSON-LD, 1200×630 preview")
    return page


home = public_page("/")
assert {"WebSite", "ProfilePage", "Person"} <= {item["@type"] for item in home.schemas}
assert {f"/projects/{slug}" for slug in PROJECTS} <= home.links
assert "spherical robot" in " ".join(home.text)
titles = {home.title}
descriptions = {home.one_meta("description")}
for slug in PROJECTS:
    page = public_page(f"/projects/{slug}")
    assert {"WebPage", "CreativeWork", "BreadcrumbList"} <= {item["@type"] for item in page.schemas}
    assert DETAILS[slug] in " ".join(page.text), f"{slug}: project details missing from server HTML"
    assert page.title not in titles and page.one_meta("description") not in descriptions
    titles.add(page.title)
    descriptions.add(page.one_meta("description"))

status, _, body = get("/sitemap.xml")
assert status == 200
locations = {item.text for item in ElementTree.fromstring(body).iter("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")}
assert locations == {ORIGIN + "/", *(f"{ORIGIN}/projects/{slug}" for slug in PROJECTS)}
status, _, body = get("/robots.txt")
assert status == 200 and f"Sitemap: {ORIGIN}/sitemap.xml" in body.decode()
assert "Disallow: /api/" in body.decode()
print("PASS sitemap.xml and robots.txt: public pages only, canonical URLs")

for path in ("/personal", "/personal/dashboard", "/info", "/widget-preview", "/api/sessions"):
    status, headers, body = get(path)
    assert status < 500, f"{path}: HTTP {status}"
    assert "noindex" in headers.get("X-Robots-Tag", ""), f"{path}: noindex header missing"
    if "text/html" in headers.get("Content-Type", ""):
        page = Page(body.decode())
        assert "noindex" in page.one_meta("robots")
        assert not any("index" in item.split(", ") for item in page.meta.get("googlebot", []))
print("PASS private pages and API: noindex, including authentication redirects")
assert get("/projects/not-a-real-project")[0] == 404
assert get("/social-image?project=not-a-real-project")[0] == 404
print("PASS unknown projects: HTTP 404")
