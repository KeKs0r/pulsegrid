const url = new URL("https://web-api.tp.entsoe.eu/api");

const securityToken = "f9223ded-a51d-4981-900f-99ed6f9ba75c";
url.search = new URLSearchParams({
  securityToken,
  documentType: "A44",
  out_Domain: "10YAT-APG------L",
  in_Domain: "10YAT-APG------L",
  periodStart: "202407272200",
  periodEnd: "202407282200",
}).toString();

fetch(url.toString(), {
  method: "GET",
  //   headers: {
  //     secorityToken: "f9223ded-a51d-4981-900f-99ed6f9ba75c",
  //   },
})
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));
