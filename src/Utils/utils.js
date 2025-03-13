export const addTransparencyToHex = (hex, alpha) => {
    // Vérifie si la couleur hex est valide
    if (!/^#[0-9A-Fa-f]{6}$/.test(hex) && !/^#[0-9A-Fa-f]{3}$/.test(hex)) {
        console.warn("Format hex invalide :", hex);
        return "#FFFFFF33";
    }

    hex = hex.replace(/^#/, '');

    // Si la couleur est au format abrégé (3 caractères), la convertir en 6 caractères
    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }

    // Convertit alpha (0-1) en valeur hexadécimale
    let alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0').toUpperCase();

    return `#${hex}${alphaHex}`;
};
