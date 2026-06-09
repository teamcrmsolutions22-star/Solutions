#!/usr/bin/env python3
"""
enrich_from_csv.py — reference adapter for the `call-corpus-analysis` skill.

Turns a CSV export of calls (from ANY CRM) + transcript text into the enriched
`.txt` + YAML-frontmatter files the skill consumes. Pure standard library — no deps.

This is the ONLY piece that is specific to your stack: you map your CSV columns
onto the YAML fields once, and everything downstream is identical for everyone.

Two ways to provide transcript text per row:
  (a) a column in the CSV that holds the full transcript (--transcript-col), or
  (b) a folder of text files named <id>.txt (--transcripts-dir).

Usage
-----
  python3 enrich_from_csv.py --csv calls.csv --out-dir ./transcripts \
      --transcripts-dir ./raw            # transcript text in ./raw/<id>.txt
  # or
  python3 enrich_from_csv.py --csv calls.csv --out-dir ./transcripts \
      --transcript-col transcript        # transcript text inline in the CSV

Column mapping
--------------
Defaults assume sensible column names; override any with --map field=column.
Example:  --map result_class=disposition --map manager_id=owner_id --map id=call_id
"""

import argparse, csv, os, sys

# YAML field -> default CSV column name. Override via --map field=column.
DEFAULT_MAP = {
    "id":               "id",
    "call_date":        "date",
    "call_time":        "time",
    "call_duration_sec":"duration_sec",
    "direction":        "direction",
    "manager_id":       "manager_id",
    "manager_name":     "manager_name",
    "contact_id":       "contact_id",
    "contact_phone":    "phone",
    "deal_stage":       "stage",
    "deal_source":      "source",
    "result_class":     "result_class",   # THE spine — get this one right
    "segment":          "segment",
    "language_detected":"language",
}

MIN_DURATION_SEC = 60  # drop dead-air / missed calls below this


def yaml_escape(v: str) -> str:
    v = (v or "").replace('"', "'").replace("\n", " ").strip()
    return f'"{v}"'


def build_header(row, colmap):
    lines = ["---"]
    for field, col in colmap.items():
        val = row.get(col, "")
        lines.append(f"{field}: {yaml_escape(str(val))}")
    lines.append("---")
    return "\n".join(lines)


def get_transcript(row, args, call_id):
    if args.transcript_col:
        return row.get(args.transcript_col, "") or ""
    if args.transcripts_dir:
        path = os.path.join(args.transcripts_dir, f"{call_id}.txt")
        if os.path.exists(path):
            with open(path, encoding="utf-8") as f:
                return f.read()
    return ""


def main():
    ap = argparse.ArgumentParser(description="CSV export -> enriched YAML+text for call-corpus-analysis")
    ap.add_argument("--csv", required=True, help="path to the CRM CSV export")
    ap.add_argument("--out-dir", required=True, help="where to write enriched .txt files")
    ap.add_argument("--transcripts-dir", help="folder of <id>.txt transcript files")
    ap.add_argument("--transcript-col", help="CSV column holding the full transcript text")
    ap.add_argument("--map", action="append", default=[], help="override field=column, repeatable")
    ap.add_argument("--min-duration", type=int, default=MIN_DURATION_SEC,
                    help=f"drop calls shorter than N seconds (default {MIN_DURATION_SEC})")
    args = ap.parse_args()

    if not args.transcript_col and not args.transcripts_dir:
        sys.exit("Provide transcript text via --transcript-col OR --transcripts-dir.")

    colmap = dict(DEFAULT_MAP)
    for m in args.map:
        if "=" not in m:
            sys.exit(f"--map expects field=column, got: {m}")
        field, col = m.split("=", 1)
        colmap[field] = col

    os.makedirs(args.out_dir, exist_ok=True)
    written = skipped_short = skipped_empty = 0

    with open(args.csv, newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader):
            call_id = (row.get(colmap["id"], "") or f"row{i}").strip()

            # drop dead air
            try:
                dur = int(float(row.get(colmap["call_duration_sec"], 0) or 0))
            except ValueError:
                dur = 0
            if dur and dur < args.min_duration:
                skipped_short += 1
                continue

            body = get_transcript(row, args, call_id).strip()
            if not body:
                skipped_empty += 1
                continue

            out_path = os.path.join(args.out_dir, f"{call_id}.txt")
            with open(out_path, "w", encoding="utf-8") as out:
                out.write(build_header(row, colmap) + "\n\n" + body + "\n")
            written += 1

    print(f"✓ wrote {written} enriched transcripts to {args.out_dir}")
    if skipped_short:
        print(f"  skipped {skipped_short} calls < {args.min_duration}s (dead air)")
    if skipped_empty:
        print(f"  skipped {skipped_empty} rows with no transcript text")
    print("\nNext: invoke the skill — \"analyze the transcripts in "
          f"{args.out_dir}\" (Mode B).")


if __name__ == "__main__":
    main()
