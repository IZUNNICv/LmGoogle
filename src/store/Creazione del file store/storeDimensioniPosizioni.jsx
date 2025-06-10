/**
 * Estrae posizione, dimensioni e pagina di tutti gli elementi.
 * @param {Array} components - Array degli elementi dal tuo stato globale.
 * @returns {Array} Oggetti con id, x, y, width, height, page, parentId, label.
 */
export function getAllElementiForSave(components) {
  return components.map(el => ({
    id: el.id,
    x: el.x,
    y: el.y,
    width: el.width,
    height: el.height,
    page: el.page,
    parentId: el.parentId ?? null,
    label: el.label ?? "",
    // Puoi aggiungere altri campi se ti servono in futuro
  }));
}

/**
 * Restituisce le informazioni in formato JSON (stringa).
 * @param {Array} components
 * @returns {string}
 */
export function getAllElementiForSaveJSON(components) {
  return JSON.stringify(getAllElementiForSave(components), null, 2);
}