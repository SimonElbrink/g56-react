

export const fmtCurrency = (n) =>{

    return Number(n).toLocaleString(undefined, {style: "currency", currency: "SEK"})
}

export const fmtDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
};

export const fmtTime = (iso) => {
    const d = new Date(iso); // 2025-08-15T13:00:00Z
    return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }); // HH:MM

};

export const fmtDur = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
};


