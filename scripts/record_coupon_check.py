#!/usr/bin/env python3
import argparse
import json
import re
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "promocodefinders-seo-updated"
DATA = SITE / "data" / "coupons.json"

parser = argparse.ArgumentParser(description="Record a real coupon check and refresh verification dates.")
parser.add_argument("--code", default="all", choices=["all", "ALE832781", "ALI240834", "ALI015848"])
args = parser.parse_args()

today = datetime.now(timezone.utc).date().isoformat()
dt = datetime.strptime(today, "%Y-%m-%d")
human = f"{dt.strftime('%B')} {dt.day}, {dt.year}"

data = json.loads(DATA.read_text(encoding="utf-8"))
selected = []
for coupon in data.get("coupons", []):
    if args.code == "all" or coupon.get("code") == args.code:
        coupon["last_checked"] = today
        coupon["status"] = "checked-by-publisher"
        selected.append(coupon["code"])

if not selected:
    raise SystemExit("No coupon matched the requested code.")

data["updated_via"] = "manual-verification-workflow"
DATA.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")

def replace_file(path: Path, updater):
    if not path.exists():
        return
    text = path.read_text(encoding="utf-8")
    updated = updater(text)
    if updated != text:
        path.write_text(updated, encoding="utf-8")

def update_common_page(text: str) -> str:
    text = re.sub(r'("dateModified":")[0-9]{4}-[0-9]{2}-[0-9]{2}(")', rf'\g<1>{today}\2', text, count=1)
    return text

def update_tracker(text: str) -> str:
    text = update_common_page(text)
    for code in selected:
        pattern = rf'(data-coupon-code="{re.escape(code)}".*?<time data-field="last_checked" datetime=")[^"]+(">)[^<]+(</time>)'
        text = re.sub(pattern, rf'\g<1>{today}\2{human}\3', text, count=1, flags=re.S)
    dates = [c.get("last_checked") for c in data.get("coupons", []) if c.get("last_checked")]
    latest = max(dates) if dates else today
    ldt = datetime.strptime(latest, "%Y-%m-%d")
    lhuman = f"{ldt.strftime('%B')} {ldt.day}, {ldt.year}"
    text = re.sub(
        r'(<time data-tracker-last-checked datetime=")[^"]+(">)[^<]+(</time>)',
        rf'\g<1>{latest}\2{lhuman}\3',
        text,
        count=1
    )
    return text

def update_hub(text: str) -> str:
    text = update_common_page(text)
    for code in selected:
        pattern = rf'(data-coupon-code="{re.escape(code)}".*?<time data-field="last_checked" datetime=")[^"]+(">)[^<]+(</time>)'
        text = re.sub(pattern, rf'\g<1>{today}\2{human}\3', text, flags=re.S)
    dates = [c.get("last_checked") for c in data.get("coupons", []) if c.get("last_checked")]
    latest = max(dates) if dates else today
    ldt = datetime.strptime(latest, "%Y-%m-%d")
    lhuman = f"{ldt.strftime('%B')} {ldt.day}, {ldt.year}"
    text = re.sub(
        r'(<time data-tracker-last-checked datetime=")[^"]+(">)[^<]+(</time>)',
        rf'\g<1>{latest}\2{lhuman}\3',
        text,
        count=1
    )
    return text

def update_ale(text: str) -> str:
    if "ALE832781" not in selected:
        return text
    text = update_common_page(text)
    pattern = r'(data-coupon-code="ALE832781".*?<time data-field="last_checked" datetime=")[^"]+(">)[^<]+(</time>)'
    return re.sub(pattern, rf'\g<1>{today}\2{human}\3', text, flags=re.S)

def update_sitemap(text: str) -> str:
    urls = {
        "https://promocodefinders.com/temu-coupon-tracker/": today,
        "https://promocodefinders.com/temu-coupon-codes/": today,
    }
    if "ALE832781" in selected:
        urls["https://promocodefinders.com/temu-ale832781/"] = today
    for url, date in urls.items():
        block_pattern = rf'(<url><loc>{re.escape(url)}</loc>)(?:<lastmod>[^<]+</lastmod>)?(</url>)'
        replacement = rf'\1<lastmod>{date}</lastmod>\2'
        text, count = re.subn(block_pattern, replacement, text)
        if count == 0:
            text = text.replace("</urlset>", f"  <url><loc>{url}</loc><lastmod>{date}</lastmod></url>\n</urlset>")
    return text

replace_file(SITE / "temu-coupon-tracker" / "index.html", update_tracker)
replace_file(SITE / "temu-coupon-codes" / "index.html", update_hub)
replace_file(SITE / "temu-ale832781" / "index.html", update_ale)
replace_file(SITE / "sitemap.xml", update_sitemap)

print(f"Recorded {today} verification for: {', '.join(selected)}")
