#!/usr/bin/env python3
"""Read-only audit of a user-supplied manual coupon check date.

Intentionally does not use today's date and NEVER edits pages or data.
The date must first be manually recorded in source HTML, JSON and sitemap.
"""
import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "promocodefinders-seo-updated"
parser = argparse.ArgumentParser()
parser.add_argument("--expected-date", required=True, help="Explicit checked date in YYYY-MM-DD")
args = parser.parse_args()
if not re.fullmatch(r"20\d{2}-\d{2}-\d{2}", args.expected_date):
    parser.error("Use YYYY-MM-DD")
data = json.loads((SITE / "data/coupons.json").read_text(encoding="utf-8"))
errors = []
for coupon in data.get("coupons", []):
    if coupon.get("last_checked") != args.expected_date:
        errors.append(f"{coupon['code']}: expected {args.expected_date}, found {coupon.get('last_checked')}")
for slug in ["", "promo-codes", "temu-coupon-codes", "temu-coupon-tracker", "temu-ale832781",
             "temu-ali240834", "temu-ali015848", "temu-alf423474-alb885210",
             "temu-black-friday-2026", "olive-young-promo-code", "best-olive-young-products",
             "temu-first-order-promo-code", "temu-coupon-code-uk", "temu-coupon-code-usa",
             "temu-coupon-countries"]:
    page = SITE / slug / "index.html"
    text = page.read_text(encoding="utf-8")
    if f'<time datetime="{args.expected_date}">' not in text or "Last checked:" not in text:
        errors.append(f"{page}: missing visible manual check date")
if errors:
    raise SystemExit("\n".join(errors))
print(f"Read-only audit passed for manual date {args.expected_date}")
