const express = require('express');
const IDP = require('../entity/IDP');
const Tag = require('../entity/Tag');
const CreateIDPController = require('../controller/CreateIDPController');
const BrowseIDPController = require('../controller/BrowseIDPController');
const { requireProfile } = require('../middleware/auth');

function idpRoutes(db) {
  const router = express.Router();
  const idp = new IDP(db);
  const tag = new Tag(db);
  const createIDPController = new CreateIDPController(tag, idp);
  const browseIDPController = new BrowseIDPController(idp);

  // Public: latest IDPs for the home page
  router.get('/latest', (req, res) => {
    res.json({ success: true, idps: browseIDPController.getLatestIDPs(req.query.limit) });
  });

  // #13 Create IDP - Interior Designers only
  router.get('/tag-options', requireProfile('Interior Designer'), (req, res) => {
    res.json({ success: true, tags: createIDPController.getTagOptions() });
  });

  router.post('/', requireProfile('Interior Designer'), (req, res) => {
    const result = createIDPController.createIDP(req.account.id, req.body ?? {});
    res.status(result.success ? 201 : 400).json(result);
  });

  return router;
}

module.exports = idpRoutes;
