#!/usr/bin/env python3
"""Deploy the committed tree to the client's Vercel project (production).

The Vercel project has no Git connection, and the deploy token is scoped too
narrowly for the `vercel` CLI, so this uploads the files tracked by git through
Vercel's REST API instead.

Usage:  python3 scripts/deploy.py
Needs:  VERCEL_TOKEN=... in .env.local (gitignored), and a clean working tree.
"""
import concurrent.futures as cf
import hashlib
import json
import pathlib
import subprocess
import sys
import time
import urllib.error
import urllib.request

REPO = pathlib.Path(__file__).resolve().parent.parent
TEAM = "team_Dz4Q6zfzv21fNZ29JLWnearq"
PROJECT = "prj_POXoNbi23p6UhLjeSwJtrvEOgj0J"


def token():
    for line in (REPO / ".env.local").read_text().splitlines():
        if line.startswith("VERCEL_TOKEN="):
            return line.split("=", 1)[1].strip()
    sys.exit("VERCEL_TOKEN not found in .env.local")


T = token()


def call(method, path, data=None, headers=None, raw=False):
    h = {"Authorization": f"Bearer {T}", **(headers or {})}
    body = data if raw else (json.dumps(data).encode() if data is not None else None)
    if not raw and data is not None:
        h["Content-Type"] = "application/json"
    sep = "&" if "?" in path else "?"
    req = urllib.request.Request(
        f"https://api.vercel.com{path}{sep}teamId={TEAM}", data=body, headers=h, method=method
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            txt = r.read().decode()
            return r.status, (json.loads(txt) if txt else {})
    except urllib.error.HTTPError as e:
        txt = e.read().decode()
        try:
            return e.code, json.loads(txt)
        except ValueError:
            return e.code, {"raw": txt[:300]}


def git(*args):
    return subprocess.check_output(["git", "-C", str(REPO), *args])


if git("status", "--porcelain").strip():
    sys.exit("Working tree is not clean. Commit first, so what is live matches git.")

sha = git("rev-parse", "HEAD").decode().strip()
files = []
for p in git("ls-files", "-z").decode().split("\0")[:-1]:
    b = (REPO / p).read_bytes()
    files.append({"file": p, "sha": hashlib.sha1(b).hexdigest(), "size": len(b), "_b": b})
print(f"commit {sha[:7]}: {len(files)} files, {sum(f['size'] for f in files) // 1024} KB")


def upload(f):
    s, r = call(
        "POST",
        "/v2/files",
        f["_b"],
        {
            "Content-Type": "application/octet-stream",
            "x-vercel-digest": f["sha"],
            "Content-Length": str(f["size"]),
        },
        raw=True,
    )
    return f["file"], s, r


with cf.ThreadPoolExecutor(8) as ex:
    bad = [(n, s, r) for n, s, r in ex.map(upload, files) if s not in (200, 201)]
if bad:
    sys.exit(f"Upload failed: {bad[:3]}")
print("all files uploaded")

s, r = call(
    "POST",
    "/v13/deployments?skipAutoDetectionConfirmation=1",
    {
        "name": "syncmfg",
        "project": PROJECT,
        "target": "production",
        "files": [{k: f[k] for k in ("file", "sha", "size")} for f in files],
        "meta": {"githubCommitSha": sha, "deployedFrom": "scripts/deploy.py"},
    },
)
if s not in (200, 201):
    sys.exit(f"Create failed: {s} {json.dumps(r)[:500]}")
dep = r["id"]
print("deployment", dep, "->", r.get("url"))

state = r.get("readyState")
for _ in range(90):
    if state in ("READY", "ERROR", "CANCELED"):
        break
    time.sleep(5)
    s, r = call("GET", f"/v13/deployments/{dep}")
    state = r.get("readyState")
print("state:", state, "| aliases:", r.get("alias"), "| error:", r.get("errorMessage"))
print("inspector:", r.get("inspectorUrl"))
sys.exit(0 if state == "READY" else 1)
