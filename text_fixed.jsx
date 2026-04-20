

import { useState, useEffect, useCallback, useRef } from "react";

/* ===========================================================
LUX ANGELS CLEANING - Management System v3 (Bug-free)
=========================================================== */

// -- Persistence --
const STORE_KEY = "lux-angels-v3";
const loadStore = () => { try { return JSON.parse(localStorage.getItem(STORE_KEY)); } catch { return null; } };
const saveStore = (d) => { try { localStorage.setItem(STORE_KEY, JSON.stringify(d)); } catch {} };

const DEFAULTS = {
employees: [], clients: [], schedules: [], clockEntries: [], invoices: [], payslips: [],
ownerPin: "1234", employeePins: {},
settings: {
companyName: "Lux Angels Cleaning",
companyAddress: "12 Rue de la Liberté, L-1930 Luxembourg",
companyEmail: "info@luxangels.lu",
companyPhone: "+352 123 456",
vatNumber: "LU12345678",
bankIban: "LU12 3456 7890 1234 5678",
defaultVatRate: 17,
},
};

// -- Utils --
let _idCtr = Date.now();
const makeId = () => `id_${_idCtr++}`;
const getToday = () => new Date().toISOString().slice(0, 10);
const fmtDate = (d) => d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "";
const fmtTime = (d) => d ? new Date(d).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "";
const fmtBoth = (d) => `${fmtDate(d)} ${fmtTime(d)}`;
const calcHrs = (a, b) => (a && b) ? Math.max(0, Math.round((new Date(b) - new Date(a)) / 36e5 * 100) / 100) : 0;
const makeISO = (d, t) => `${d}T${t}:00`;

// -- Theme --
const CL = {
bg: "#0C0F16", sf: "#151922", s2: "#1C2130", bd: "#2C3348",
gold: "#D4A843", goldDark: "#B08C2F", goldLight: "#F0D78C",
blue: "#4A9FD9", green: "#3EC47E", red: "#D95454", orange: "#E89840",
text: "#E4E6ED", muted: "#838AA3", dim: "#525976", white: "#FFF",
};
