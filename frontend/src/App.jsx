

import { createContext, useContext, useState, useEffect, useCallback, useRef, useMemo, Children, isValidElement } from "react";

/* ===========================================================
LUX ANGELS CLEANING - Management System v3 (Bug-free) 
=========================================================== */


let excelJsPromise;
const loadExcelJS = async () => {
  if (!excelJsPromise) {
    excelJsPromise = import("exceljs").then((mod) => mod.default || mod);
  }
  return excelJsPromise;
};

// -- Persistence --
// Database-only persistence for business data: no local cache/offline shadow copies.
const loadLang = () => { try { const a = JSON.parse(sessionStorage.getItem("lux_auth") || "null"); return a?.lang || "fr"; } catch { return "fr"; } };
const saveLang = (l) => {
  try {
    const raw = sessionStorage.getItem("lux_auth");
    if (!raw) return;
    const a = JSON.parse(raw);
    a.lang = l;
    sessionStorage.setItem("lux_auth", JSON.stringify(a));
    void persistPreferenceToApi({ role: a.role, userId: a.employeeId, lang: l });
  } catch {}
};
const loadTheme = () => { try { const a = JSON.parse(sessionStorage.getItem("lux_auth") || "null"); return a?.theme || "dark"; } catch { return "dark"; } };
const saveTheme = (t) => {
  try {
    const raw = sessionStorage.getItem("lux_auth");
    if (!raw) return;
    const a = JSON.parse(raw);
    a.theme = t;
    sessionStorage.setItem("lux_auth", JSON.stringify(a));
    void persistPreferenceToApi({ role: a.role, userId: a.employeeId, theme: t });
  } catch {}
};

async function persistPreferenceToApi(payload) {
  for (const base of API_BASE_CANDIDATES) {
    try {
      const res = await fetch(`${base}/api/preferences`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) return true;
    } catch {}
  }
  return false;
}
