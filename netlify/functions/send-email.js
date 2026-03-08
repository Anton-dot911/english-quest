exports.handler = async (event) => {
if (event.httpMethod !== “POST”) {
return { statusCode: 405, body: “Method Not Allowed” };
}

var body;
try {
body = JSON.parse(event.body);
} catch (e) {
return { statusCode: 400, body: “Invalid JSON” };
}

var parent_name = body.parent_name || “”;
var child_name = body.child_name || “”;
var email = body.email || “”;
var plan = body.plan || “free”;

if (!email || !parent_name || !child_name) {
return { statusCode: 400, body: “Missing required fields” };
}

console.log(“Plan:”, plan);
console.log(“Sending to:”, email);
console.log(“BREVO_API_KEY exists:”, !!process.env.BREVO_API_KEY);

var baseUrl = “https://english-quest-kids.netlify.app”;
var enc = encodeURIComponent(child_name);

function lessonRow(n, title, sub) {
var url = baseUrl + “/lesson” + n + “_maksym.html?name=” + enc;
return (
“<table width=‘100%’ cellpadding=‘0’ cellspacing=‘0’” +
“ style=‘background:#EBF4FF;border-radius:16px;margin-bottom:10px;’>” +
“<tr><td style='padding:14px;'>” +
“<table width='100%' cellpadding='0' cellspacing='0'><tr>” +
“<td style='width:40px;vertical-align:middle;'>” +
“<div style='width:36px;height:36px;background:#4A90E8;border-radius:10px;" +
"text-align:center;line-height:36px;color:#fff;font-weight:900;font-size:13px;'>” +
n + “</div></td>” +
“<td style='padding-left:10px;vertical-align:middle;'>” +
“<div style='font-size:14px;font-weight:800;color:#1a1a2e;'>” + title + “</div>” +
“<div style='font-size:11px;color:#888;'>” + sub + “</div></td>” +
“<td style='text-align:right;vertical-align:middle;'>” +
“<a href='" + url + "' style='display:inline-block;background:#F5A623;" +
"color:#7C2D12;text-decoration:none;padding:8px 14px;border-radius:50px;" +
"font-size:12px;font-weight:900;'>\u0412\u0456\u0434\u043A\u0440\u0438\u0442\u0438</a>” +
“</td></tr></table></td></tr></table>”
);
}

function wrapEmail(headerSub, bodyContent) {
return (
“<!DOCTYPE html><html lang='uk'><head><meta charset='UTF-8'>” +
“<meta name='viewport' content='width=device-width,initial-scale=1'></head>” +
“<body style='margin:0;padding:0;background:#C8D8E4;font-family:Nunito,Arial,sans-serif;'>” +
“<table width='100%' cellpadding='0' cellspacing='0' style='background:#C8D8E4;padding:30px 16px;'>” +
“<tr><td align='center'>” +
“<table width='100%' style='max-width:520px;background:#DCE8F2;border-radius:24px;" +
"overflow:hidden;box-shadow:-8px -8px 24px rgba(255,255,255,0.9),8px 8px 24px rgba(140,162,180,0.9);'>” +
“<tr><td style='background:linear-gradient(145deg,#6BAEF8,#3A7FD4);padding:28px;text-align:center;'>” +
“<div style='font-size:40px;margin-bottom:8px;'>🚀</div>” +
“<div style='font-size:24px;font-weight:900;color:#fff;'>English Quest</div>” +
“<div style='font-size:13px;color:rgba(255,255,255,0.85);margin-top:4px;'>” + headerSub + “</div>” +
“</td></tr>” +
bodyContent +
“<tr><td style='background:#B4C8D6;padding:14px 28px;text-align:center;" +
"border-top:2px solid rgba(140,162,180,0.4);'>” +
“<div style='font-size:12px;color:#5A7080;'>English Quest · “ +
“<a href='" + baseUrl + "' style='color:#4A90E8;text-decoration:none;'>” +
“english-quest-kids.netlify.app</a></div>” +
“</td></tr>” +
“</table></td></tr></table></body></html>”
);
}

// — FULL PLAN: 24 lessons —
if (plan === “full”) {
var allLessons = [
[“1”,  “\u0423\u0440\u043E\u043A 1 - \u041F\u0440\u0438\u0432\u0456\u0442\u0430\u043D\u043D\u044F”,           “Hello \u00B7 My name is \u00B7 How are you?”],
[“2”,  “\u0423\u0440\u043E\u043A 2 - \u0427\u0438\u0441\u043B\u0430 \u0442\u0430 \u0432\u0456\u043A”,          “One to ten \u00B7 How old are you?”],
[“3”,  “\u0423\u0440\u043E\u043A 3 - \u041A\u043E\u043B\u044C\u043E\u0440\u0438 \u0442\u0430 \u0444\u043E\u0440\u043C\u0438”,      “Red \u00B7 Blue \u00B7 Circle \u00B7 Square”],
[“4”,  “\u0423\u0440\u043E\u043A 4 - \u0422\u0432\u0430\u0440\u0438\u043D\u0438”,               “Cat \u00B7 Dog \u00B7 Bird \u00B7 Fish”],
[“5”,  “\u0423\u0440\u043E\u043A 5 - \u0407\u0436\u0430 \u0442\u0430 \u043D\u0430\u043F\u043E\u0457”,          “Apple \u00B7 Milk \u00B7 Bread \u00B7 Water”],
[“6”,  “\u0423\u0440\u043E\u043A 6 - \u0420\u043E\u0434\u0438\u043D\u0430”,                “Mother \u00B7 Father \u00B7 Sister \u00B7 Brother”],
[“7”,  “\u0423\u0440\u043E\u043A 7 - \u0422\u0456\u043B\u043E \u043B\u044E\u0434\u0438\u043D\u0438”,           “Head \u00B7 Hands \u00B7 Eyes \u00B7 Nose”],
[“8”,  “\u0423\u0440\u043E\u043A 8 - \u041E\u0434\u044F\u0433”,                  “Shirt \u00B7 Shoes \u00B7 Hat \u00B7 Dress”],
[“9”,  “\u0423\u0440\u043E\u043A 9 - \u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442”,             “Car \u00B7 Bus \u00B7 Train \u00B7 Plane”],
[“10”, “\u0423\u0440\u043E\u043A 10 - \u0414\u0456\u043C \u0442\u0430 \u043A\u0456\u043C\u043D\u0430\u0442\u0438”,       “Kitchen \u00B7 Bedroom \u00B7 Door \u00B7 Window”],
[“11”, “\u0423\u0440\u043E\u043A 11 - \u041F\u0440\u0438\u0440\u043E\u0434\u0430”,              “Sun \u00B7 Rain \u00B7 Tree \u00B7 Flower”],
[“12”, “\u0423\u0440\u043E\u043A 12 - \u0427\u0430\u0441 \u0442\u0430 \u0434\u043D\u0456 \u0442\u0438\u0436\u043D\u044F”,    “Monday \u00B7 Today \u00B7 Morning \u00B7 Night”],
[“13”, “\u0423\u0440\u043E\u043A 13 - \u041F\u043E\u0447\u0443\u0442\u0442\u044F”,              “Happy \u00B7 Sad \u00B7 Tired \u00B7 Hungry”],
[“14”, “\u0423\u0440\u043E\u043A 14 - \u0421\u043F\u043E\u0440\u0442 \u0442\u0430 \u0445\u043E\u0431\u0456”,        “Football \u00B7 Swimming \u00B7 Art \u00B7 Music”],
[“15”, “\u0423\u0440\u043E\u043A 15 - \u0428\u043A\u043E\u043B\u0430”,                “Book \u00B7 Pencil \u00B7 Teacher \u00B7 Class”],
[“16”, “\u0423\u0440\u043E\u043A 16 - \u041C\u0456\u0441\u0442\u043E \u0442\u0430 \u043C\u0456\u0441\u0446\u044F”,       “Park \u00B7 Shop \u00B7 Hospital \u00B7 Street”],
[“17”, “\u0423\u0440\u043E\u043A 17 - \u041A\u043E\u043B\u044C\u043E\u0440\u0438 (\u0440\u043E\u0437\u0448\u0438\u0440\u0435\u043D\u0456)”,  “Pink \u00B7 Orange \u00B7 Grey \u00B7 Brown”],
[“18”, “\u0423\u0440\u043E\u043A 18 - \u0427\u0438\u0441\u043B\u0430 11-20”,          “Eleven \u00B7 Twelve \u00B7 Twenty”],
[“19”, “\u0423\u0440\u043E\u043A 19 - \u0414\u0456\u0454\u0441\u043B\u043E\u0432\u0430 \u0434\u0456\u0439”,         “Run \u00B7 Jump \u00B7 Eat \u00B7 Sleep”],
[“20”, “\u0423\u0440\u043E\u043A 20 - \u041F\u0438\u0442\u0430\u043D\u043D\u044F”,              “What \u00B7 Where \u00B7 When \u00B7 Why”],
[“21”, “\u0423\u0440\u043E\u043A 21 - \u041F\u0440\u0438\u043A\u043C\u0435\u0442\u043D\u0438\u043A\u0438”,          “Big \u00B7 Small \u00B7 Fast \u00B7 Slow”],
[“22”, “\u0423\u0440\u043E\u043A 22 - \u041F\u043E\u0440\u0438 \u0440\u043E\u043A\u0443”,            “Spring \u00B7 Summer \u00B7 Autumn \u00B7 Winter”],
[“23”, “\u0423\u0440\u043E\u043A 23 - \u0421\u0432\u044F\u0442\u0430”,                “Birthday \u00B7 Christmas \u00B7 Easter”],
[“24”, “\u0423\u0440\u043E\u043A 24 - \u041F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u043D\u044F”,           “Review \u00B7 A1 Level complete!”]
];

```
var rowsHtml = "";
for (var i = 0; i < allLessons.length; i++) {
  rowsHtml += lessonRow(allLessons[i][0], allLessons[i][1], allLessons[i][2]);
}

var bodyFull = (
  "<tr><td style='padding:24px 28px 12px;'>" +
  "<div style='font-size:19px;font-weight:900;color:#2A3A4A;margin-bottom:8px;'>" +
  "\u0412\u0456\u0442\u0430\u0454\u043C\u043E, " + parent_name + "! &#127881;</div>" +
  "<p style='font-size:14px;color:#5A7080;line-height:1.7;margin:0;'>" +
  "\u0412\u0438 \u043F\u0440\u0438\u0434\u0431\u0430\u043B\u0438 \u043F\u043E\u0432\u043D\u0438\u0439 \u043A\u0443\u0440\u0441 \u0434\u043B\u044F <strong>" + child_name + "</strong>. " +
  "\u0412\u0441\u0456 24 \u0443\u0440\u043E\u043A\u0438 \u043D\u0438\u0436\u0447\u0435  \u0432\u0456\u0434\u043A\u0440\u0438\u0432\u0430\u0439\u0442\u0435 \u0431\u0443\u0434\u044C-\u044F\u043A\u0438\u0439!" +
  "</p></td></tr>" +
  "<tr><td style='padding:8px 28px 16px;'>" + rowsHtml + "</td></tr>"
);

var htmlFull = wrapEmail("\u041F\u043E\u0432\u043D\u0438\u0439 \u043A\u0443\u0440\u0441  24 \u0443\u0440\u043E\u043A\u0438 \u0434\u043B\u044F " + child_name, bodyFull);

try {
  var resFull = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY
    },
    body: JSON.stringify({
      sender: { name: "English Quest", email: process.env.SENDER_EMAIL },
      to: [{ email: email, name: parent_name }],
      subject: child_name + "  \u043F\u043E\u0432\u043D\u0438\u0439 \u043A\u0443\u0440\u0441 English Quest (24 \u0443\u0440\u043E\u043A\u0438)!",
      htmlContent: htmlFull
    })
  });
  var fullText = await resFull.text();
  console.log("Full email status:", resFull.status, fullText);
  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ success: true, plan: "full" })
  };
} catch (err) {
  console.error("Full plan error:", err.message);
  return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
}
```

}

// — FREE PLAN: 3 lessons —
var bodyFree = (
“<tr><td style='padding:24px 28px 16px;'>” +
“<div style='font-size:20px;font-weight:900;color:#2A3A4A;margin-bottom:10px;'>” +
“\u0412\u0456\u0442\u0430\u0454\u043C\u043E, “ + parent_name + “! 🎉</div>” +
“<p style='font-size:15px;color:#5A7080;line-height:1.7;margin:0;'>” +
“<strong>” + child_name + “</strong> \u043E\u0442\u0440\u0438\u043C\u0443\u0454 3 \u0431\u0435\u0437\u043A\u043E\u0448\u0442\u043E\u0432\u043D\u0456 \u0443\u0440\u043E\u043A\u0438. \u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C \u0449\u043E\u0431 \u0440\u043E\u0437\u043F\u043E\u0447\u0430\u0442\u0438!” +
“</p></td></tr>” +
“<tr><td style='padding:0 28px 8px;'>” +
lessonRow(“1”, “\u0423\u0440\u043E\u043A 1 - \u041F\u0440\u0438\u0432\u0456\u0442\u0430\u043D\u043D\u044F”,      “Hello \u00B7 My name is \u00B7 How are you?”) +
lessonRow(“2”, “\u0423\u0440\u043E\u043A 2 - \u0427\u0438\u0441\u043B\u0430 \u0442\u0430 \u0432\u0456\u043A”,     “One to ten \u00B7 How old are you?”) +
lessonRow(“3”, “\u0423\u0440\u043E\u043A 3 - \u041A\u043E\u043B\u044C\u043E\u0440\u0438 \u0442\u0430 \u0444\u043E\u0440\u043C\u0438”, “Red \u00B7 Blue \u00B7 Circle \u00B7 Square”) +
“</td></tr>” +
“<tr><td style='padding:0 28px 16px;'>” +
“<div style='background:#FEF3C7;border:2px solid #FCD34D;border-radius:14px;" +
"padding:14px 16px;font-size:14px;color:#92400E;font-weight:700;line-height:1.6;'>” +
“💡 \u041F\u043E\u0440\u0430\u0434\u0430: \u0432\u0438\u043A\u043E\u043D\u0443\u0439\u0442\u0435 \u0443\u0440\u043E\u043A\u0438 \u0440\u0430\u0437\u043E\u043C \u0437 “ + child_name +
“  \u043A\u043E\u0436\u0435\u043D \u0443\u0440\u043E\u043A \u0437\u0430\u0439\u043C\u0430\u0454 10-20 \u0445\u0432\u0438\u043B\u0438\u043D.” +
“</div></td></tr>” +
“<tr><td style='padding:0 28px 24px;text-align:center;'>” +
“<a href='" + baseUrl + "' style='display:inline-block;" +
"background:linear-gradient(145deg,#5BAAF8,#2A6AD8);" +
"color:#fff;text-decoration:none;padding:14px 28px;border-radius:50px;" +
"font-size:15px;font-weight:900;'>\u041F\u0435\u0440\u0435\u0433\u043B\u044F\u043D\u0443\u0442\u0438 \u043F\u043E\u0432\u043D\u0438\u0439 \u043A\u0443\u0440\u0441 (24 \u0443\u0440\u043E\u043A\u0438) →</a>” +
“</td></tr>”
);

var htmlFree = wrapEmail(“3 \u0431\u0435\u0437\u043A\u043E\u0448\u0442\u043E\u0432\u043D\u0456 \u0443\u0440\u043E\u043A\u0438 \u0434\u043B\u044F “ + child_name, bodyFree);

try {
var resFree = await fetch(“https://api.brevo.com/v3/smtp/email”, {
method: “POST”,
headers: {
“Accept”: “application/json”,
“Content-Type”: “application/json”,
“api-key”: process.env.BREVO_API_KEY
},
body: JSON.stringify({
sender: { name: “English Quest”, email: process.env.SENDER_EMAIL },
to: [{ email: email, name: parent_name }],
subject: parent_name + “, \u0432\u0430\u0448\u0456 3 \u0431\u0435\u0437\u043A\u043E\u0448\u0442\u043E\u0432\u043D\u0456 \u0443\u0440\u043E\u043A\u0438 \u0433\u043E\u0442\u043E\u0432\u0456!”,
htmlContent: htmlFree
})
});
var freeText = await resFree.text();
console.log(“Free email status:”, resFree.status, freeText);
return {
statusCode: 200,
headers: { “Access-Control-Allow-Origin”: “*” },
body: JSON.stringify({ success: true, plan: “free” })
};
} catch (err) {
console.error(“Free plan error:”, err.message);
return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
}
};
