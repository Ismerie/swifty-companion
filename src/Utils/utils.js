export const addTransparencyToHex = (hex, alpha) => {
    hex = hex.replace(/^#/, '');

    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }

    if (hex.length !== 6) {
        console.warn("Format hex invalide :", hex);
        return "#FFFFFF33"; // Blanc avec 20% d'opacité par défaut
    }

    // Convertit alpha (0-1) en valeur hexadécimale
    let alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0').toUpperCase();

    return `#${hex}${alphaHex}`;
}