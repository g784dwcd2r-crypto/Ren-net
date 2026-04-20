

import { useState, useEffect, useCallback, useRef } from “react”;

/* ═══════════════════════════════════════════════════════════
LUX ANGELS CLEANING — Management System v3 (Bug-free)
═══════════════════════════════════════════════════════════ */

// ── Persistence ──
const STORE_KEY = “lux-angels-v3”;
const loadStore = () => { try { return JSON.parse(localStorage.getItem(STORE_KEY)); } catch { return null; } };
const saveStore = (d) => { try { localStorage.setItem(STORE_KEY, JSON.stringify(d)); } catch {} };

const DEFAULTS = {
employees: [], clients: [], schedules: [], clockEntries: [], invoices: [], payslips: [],
ownerPin: “1234”, employeePins: {},
settings: {
companyName: “Lux Angels Cleaning”,
companyAddress: “12 Rue de la Liberté, L-1930 Luxembourg”,
companyEmail: “info@luxangels.lu”,
companyPhone: “+352 123 456”,
vatNumber: “LU12345678”,
bankIban: “LU12 3456 7890 1234 5678”,
defaultVatRate: 17,
},
};

// FILE_TRUNCATED_FOR_DEMO
