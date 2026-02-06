const { nanoid } = require("nanoid");
const URL = require("../Models/url");

async function handlegenerateshorturl(req, res) {
  const body = req.body;
  console.log(body);
  if (!body.url) {
    return res.json({ msg: "enter url first" });
  }

  const find = await URL.findOne({ redirecturl: body.url });
  if (find) {
    return res.render("home", {
      urls: await URL.find({}),
      id: find.ShortURL,
    });
  }

  const shorturl = nanoid(8);

  const shorturlcreated = await URL.create({
    ShortURL: shorturl,
    redirecturl: body.url,
  });
  // return res.json({ shorturlcreated });

  return res.render("home", {
    urls: await URL.find({}),
    id: shorturl,
  });
}

async function handleredirect(req, res) {
  const shortid = req.params.shortid;
  console.log(shortid);
  const urlfind = await URL.findOneAndUpdate(
    { ShortURL: shortid },
    {
      $push: {
        visithistory: {
          timestamps: Date.now(),
        },
      },
    },
  );

  if (!urlfind) {
    return res.status(404).send("Short URL not found");
  }
  console.log(urlfind);
  res.redirect(urlfind.redirecturl);
}

async function handleanyaltics(req, res) {
  const shortid = req.params.shortid;
  const urlfind = await URL.findOne({ ShortURL: shortid });
  console.log(urlfind);

  return res.json({ totalclicks: urlfind.visithistory.length });
}
module.exports = { handlegenerateshorturl, handleredirect, handleanyaltics };
