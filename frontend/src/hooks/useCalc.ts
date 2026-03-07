import { useState } from "react";

export function useCalc() {
    const [balance, setBalance] = useState("10000");
    const [risk, setRisk] = useState("1.5");
    const [entry, setEntry] = useState("1.08420");
    const [sl, setSl] = useState("1.07980");
    const [tp, setTp] = useState("1.09300");

    const b = parseFloat(balance) || 0;
    const r = parseFloat(risk) || 0;
    const e = parseFloat(entry) || 0;
    const s = parseFloat(sl) || 0;
    const t = parseFloat(tp) || 0;

    const riskAmt = (b * r) / 100;
    const pips = Math.abs(e - s);
    const pipsTp = Math.abs(t - e);
    const lotSize = pips > 0 ? (riskAmt / (pips * 100000)).toFixed(2) : "0.00";
    const rr = pips > 0 ? (pipsTp / pips).toFixed(1) : "0.0";

    return {
        balance, setBalance,
        risk, setRisk,
        entry, setEntry,
        sl, setSl,
        tp, setTp,
        riskAmt,
        lotSize,
        rr,
        pips
    };
}
