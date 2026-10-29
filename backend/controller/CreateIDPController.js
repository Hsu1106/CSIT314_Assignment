// CONTROLLER: #13 "As an Interior Designer, I want to create an IDP".
// Boundary (IDPFormPage) -> CreateIDPController -> Tag, IDP (entities)
const STATUSES = ['current', 'past'];

class CreateIDPController {
  /**
   * @param {import('../entity/Tag')} tag
   * @param {import('../entity/IDP')} idp
   */
  constructor(tag, idp) {
    this.tag = tag;
    this.idp = idp;
  }

  getTagOptions() {
    return this.tag.getAllTags();
  }

  createIDP(designerId, idpData = {}) {
    const title = String(idpData.title ?? '').trim();
    const description = String(idpData.description ?? '').trim();
    if (!title || !description) {
      return { success: false, message: 'Please fill in all required fields' };
    }
    const status = idpData.status ?? 'current';
    if (!STATUSES.includes(status)) {
      return { success: false, message: 'Status must be current or past' };
    }
    for (const field of ['budget', 'houseSize']) {
      const v = idpData[field];
      if (v !== undefined && v !== null && v !== '' && !(Number(v) >= 0)) {
        return { success: false, message: `${field} must be a positive number` };
      }
    }

    const tagNames = [...new Set(idpData.tagNames ?? [])];
    const validTags = this.tag.findByNames(tagNames);
    const styleCount = validTags.filter((t) => t.type === 'style').length;
    if (validTags.length !== tagNames.length || styleCount !== 1) {
      return { success: false, message: 'Invalid tags: need exactly 1 style' };
    }

    const toNumber = (v) => (v === undefined || v === null || v === '' ? null : Number(v));
    const newIDP = this.idp.createIDP(
      designerId,
      {
        title,
        description,
        budget: toNumber(idpData.budget),
        houseSize: toNumber(idpData.houseSize),
        duration: idpData.duration ? String(idpData.duration).trim() : null,
        status,
      },
      validTags
    );
    return { success: true, idp: newIDP };
  }
}

module.exports = CreateIDPController;
