exports.handler = async (event) => {
if (event.httpMethod !== "POST") {
return { statusCode: 405, body: "Method Not Allowed" };
}

var body;
try {
body = JSON.parse(event.body);
} catch (e) {
return { statusCode: 400, body: "Invalid JSON" };
}

var parent_name = body.parent_name || "";
var child_name = body.child_name || "";
var email = body.email || "";

if (!email || !parent_name || !child_name) {
return { statusCode: 400, body: "Missing required fields" };
}

console.log("BREVO_API_KEY exists:", !!process.env.BREVO_API_KEY);
console.log("SENDER_EMAIL:", process.env.SENDER_EMAIL);
console.log("Sending to:", email);

var baseUrl = "https://english-quest-kids.netlify.app";

var lessonBtn = "display:inline-block;background:#F5A623;color:#7C2D12;text-decoration:none;padding:9px 16px;border-radius:50px;font-size:13px;font-weight:900;";
var numBox = "width:38px;height:38px;background:#4A90E8;border-radius:10px;text-align:center;line-height:38px;color:#fff;font-weight:900;font-size:16px;";

function lessonRow(num, title, subtitle, url) {
return "<table width='100%' cellpadding='0' cellspacing='0' style='background:#EBF4FF;border-radius:16px;margin-bottom:12px;'>"
+ "<tr><td style='padding:16px;'><table width='100%' cellpadding='0' cellspacing='0'><tr>"
+ "<td style='width:44px;vertical-align:middle;'><div style='" + numBox + "'>" + num + "</div></td>"
+ "<td style='padding-left:12px;vertical-align:middle;'>"
+ "<div style='font-size:15px;font-weight:800;color:#1a1a2e;'>" + title + "</div>"
+ "<div style='font-size:12px;color:#888;margin-top:2px;'>