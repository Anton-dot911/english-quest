exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    var b = JSON.parse(event.body);
    var pn = b.parent_name || "";
    var cn = b.child_name || "";
    var em = b.email || "";
    var plan = b.plan || "free";
    if (!em || !pn || !cn) {
      return { statusCode: 400, body: "Missing fields" };
    }
    console.log("OK plan=" + plan + " email=" + em);
    console.log("KEY=" + (!!process.env.BREVO_API_KEY) + " SENDER=" + process.env.SENDER_EMAIL);
    var base = "https://english-quest-kids.netlify.app";
    var enc = encodeURIComponent(cn);
    function makeRow(n, t) {
      return "<p><b>" + n + ". " + t + "</b> - <a href='" + base + "/lesson" + n + "_maksym.html?name=" + enc + "'>Open</a></p>";
    }
    var body3 = makeRow(1,"Greetings") + makeRow(2,"Numbers") + makeRow(3,"Colors");
    var body24 = "";
    var titles = ["Greetings","Numbers","Colors","Animals","Food","Family","Body","Clothes","Transport","Home","Nature","Time","Feelings","Sport","School","City","Colors 2","Numbers 11-20","Verbs","Questions","Adjectives","Seasons","Holidays","Review"];
    for (var i = 0; i < 24; i++) { body24 += makeRow(i+1, titles[i]); }
    var isFull = plan === "full";
    var subj = isFull ? (cn + " - full course 24 lessons!") : (pn + ", 3 free lessons ready!");
    var html = "<!DOCTYPE html><html><head><meta charset='UTF-8'></head><body>"
      + "<h2>English Quest</h2><p>Hello " + pn + "!</p>"
      + (isFull ? body24 : body3)
      + "</body></html>";
    var payload = JSON.stringify({
      sender: { name: "English Quest", email: process.env.SENDER_EMAIL },
      to: [{ email: em, name: pn }],
      subject: subj,
      htmlContent: html
    });
    var https = require("https");
    var opts = {
      hostname: "api.brevo.com",
      path: "/v3/smtp/email",
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "Content-Length": Buffer.byteLength(payload)
      }
    };
    return new Promise(function(resolve) {
      var req = https.request(opts, function(res) {
        var d = "";
        res.on("data", function(c) { d += c; });
        res.on("end", function() {
          console.log("Brevo " + res.statusCode + " " + d);
          resolve({ statusCode: 200, headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify({ success: true }) });
        });
      });
      req.on("error", function(err) {
        resolve({ statusCode: 500, body: JSON.stringify({ error: err.message }) });
      });
      req.write(payload);
      req.end();
    });
  } catch(err) {
    console.error("ERR " + err.message);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
