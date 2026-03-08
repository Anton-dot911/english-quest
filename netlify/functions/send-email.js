exports.handler = async function(event) {
if (event.httpMethod !== “POST”) {
return { statusCode: 405, body: “Method Not Allowed” };
}

var body;
try { body = JSON.parse(event.body); }
catch(e) { return { statusCode: 400, body: “Invalid JSON” }; }

var parent_name = body.parent_name || “”;
var child_name  = body.child_name  || “”;
var email       = body.email       || “”;
var plan        = body.plan        || “free”;

if (!email || !parent_name || !child_name) {
return { statusCode: 400, body: “Missing fields” };
}

console.log(“Plan:”, plan, “| Email:”, email);
console.log(“BREVO_API_KEY:”, !!process.env.BREVO_API_KEY);
console.log(“SENDER_EMAIL:”, process.env.SENDER_EMAIL);

var baseUrl = “https://english-quest-kids.netlify.app”;
var enc = encodeURIComponent(child_name);

function row(n, title, sub) {
var url = baseUrl + “/lesson” + n + “_maksym.html?name=” + enc;
return “<div style='background:#EBF4FF;border-radius:14px;padding:12px;margin-bottom:8px;'>”
+ “<b>” + n + “. “ + title + “</b><br>”
+ “<small style='color:#888;'>” + sub + “</small><br>”
+ “<a href='" + url + "' style='display:inline-block;background:#F5A623;color:#7C2D12;"
+ "text-decoration:none;padding:6px 14px;border-radius:50px;font-size:12px;"
+ "font-weight:900;margin-top:6px;'>Open</a>”
+ “</div>”;
}

var lessons = [
[1,“Lesson 1 - Greetings”,“Hello, My name is”],
[2,“Lesson 2 - Numbers”,“One to ten”],
[3,“Lesson 3 - Colors”,“Red, Blue, Green”],
[4,“Lesson 4 - Animals”,“Cat, Dog, Bird”],
[5,“Lesson 5 - Food”,“Apple, Milk, Bread”],
[6,“Lesson 6 - Family”,“Mother, Father, Sister”],
[7,“Lesson 7 - Body”,“Head, Hands, Eyes”],
[8,“Lesson 8 - Clothes”,“Shirt, Shoes, Hat”],
[9,“Lesson 9 - Transport”,“Car, Bus, Train”],
[10,“Lesson 10 - Home”,“Kitchen, Bedroom”],
[11,“Lesson 11 - Nature”,“Sun, Rain, Tree”],
[12,“Lesson 12 - Time”,“Monday, Morning”],
[13,“Lesson 13 - Feelings”,“Happy, Sad, Tired”],
[14,“Lesson 14 - Sport”,“Football, Swimming”],
[15,“Lesson 15 - School”,“Book, Pencil, Teacher”],
[16,“Lesson 16 - City”,“Park, Shop, Hospital”],
[17,“Lesson 17 - Colors 2”,“Pink, Orange, Grey”],
[18,“Lesson 18 - Numbers 11-20”,“Eleven, Twenty”],
[19,“Lesson 19 - Verbs”,“Run, Jump, Eat”],
[20,“Lesson 20 - Questions”,“What, Where, When”],
[21,“Lesson 21 - Adjectives”,“Big, Small, Fast”],
[22,“Lesson 22 - Seasons”,“Spring, Summer, Winter”],
[23,“Lesson 23 - Holidays”,“Birthday, Christmas”],
[24,“Lesson 24 - Review”,“A1 Level complete!”]
];

var isFull = (plan === “full”);

var rowsFree = row(1,“Lesson 1 - Greetings”,“Hello, My name is”)
+ row(2,“Lesson 2 - Numbers”,“One to ten”)
+ row(3,“Lesson 3 - Colors”,“Red, Blue, Green”);

var rowsFull = “”;
for (var i = 0; i < lessons.length; i++) {
rowsFull += row(lessons[i][0], lessons[i][1], lessons[i][2]);
}

var subject = isFull
? (child_name + “ - English Quest full course (24 lessons)!”)
: (parent_name + “, your 3 free lessons are ready!”);

var greeting = isFull
? (“You purchased the full course for <b>” + child_name + “</b>! All 24 lessons below.”)
: (”<b>” + child_name + “</b> gets 3 free lessons. Click to start!”);

var html = “<!DOCTYPE html><html><head><meta charset='UTF-8'></head>”
+ “<body style='margin:0;padding:20px;background:#C8D8E4;font-family:Arial,sans-serif;'>”
+ “<div style='max-width:500px;margin:0 auto;background:#fff;border-radius:20px;overflow:hidden;'>”
+ “<div style='background:#4A90E8;padding:24px;text-align:center;'>”
+ “<div style='font-size:32px;'>🚀</div>”
+ “<div style='font-size:22px;font-weight:900;color:#fff;'>English Quest</div>”
+ “</div>”
+ “<div style='padding:20px;'>”
+ “<div style='font-size:18px;font-weight:800;margin-bottom:12px;'>Hello, “ + parent_name + “!</div>”
+ “<p style='font-size:14px;color:#555;margin:0 0 16px;'>” + greeting + “</p>”
+ (isFull ? rowsFull : rowsFree)
+ “</div>”
+ “<div style='background:#f5f5f5;padding:12px;text-align:center;font-size:11px;color:#aaa;'>”
+ “English Quest”
+ “</div></div></body></html>”;

var node_https = require(“https”);

var payload = JSON.stringify({
sender: { name: “English Quest”, email: process.env.SENDER_EMAIL },
to: [{ email: email, name: parent_name }],
subject: subject,
htmlContent: html
});

return new Promise(function(resolve) {
var options = {
hostname: “api.brevo.com”,
path: “/v3/smtp/email”,
method: “POST”,
headers: {
“Accept”: “application/json”,
“Content-Type”: “application/json”,
“api-key”: process.env.BREVO_API_KEY,
“Content-Length”: Buffer.byteLength(payload)
}
};

```
var req = node_https.request(options, function(res) {
  var data = "";
  res.on("data", function(chunk) { data += chunk; });
  res.on("end", function() {
    console.log("Brevo status:", res.statusCode, data);
    resolve({
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ success: true, plan: plan })
    });
  });
});

req.on("error", function(err) {
  console.error("HTTPS error:", err.message);
  resolve({ statusCode: 500, body: JSON.stringify({ error: err.message }) });
});

req.write(payload);
req.end();
```

});
};
