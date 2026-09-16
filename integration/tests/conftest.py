"""
Shared Pytest Fixtures for SwipeX Integration Tests
Provides an intelligent api_client fixture that:
1. Connects to live Gateway at http://localhost:8000 if running.
2. Falls back to Starlette/FastAPI TestClient if the Gateway is not yet started.
"""
import sys
import os
import importlib.util
import pytest
import httpx
from starlette.testclient import TestClient

GATEWAY_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "docker", "gateway"))
MAIN_FILE = os.path.join(GATEWAY_DIR, "main.py")

# Dynamically load the Gateway FastAPI application
if GATEWAY_DIR not in sys.path:
    sys.path.insert(0, GATEWAY_DIR)

spec = importlib.util.spec_from_file_location("gateway_main", MAIN_FILE)
if spec and spec.loader:
    gateway_mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(gateway_mod)
    app = getattr(gateway_mod, "app", None)
else:
    app = None

@pytest.fixture(scope="session")
def api_client():
    live_server_active = False
    try:
        with httpx.Client(base_url="http://localhost:8000", timeout=0.3) as probe:
            res = probe.get("/health")
            if res.status_code == 200:
                live_server_active = True
    except Exception:
        live_server_active = False

    if live_server_active:
        with httpx.Client(base_url="http://localhost:8000", timeout=15.0) as client:
            yield client
    else:
        # Standalone in-process test client
        with TestClient(app) as client:
            yield client
