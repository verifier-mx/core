
// INDEX
/** curl 'https://agsc.siat.sat.gob.mx/PTSC/ValidaRFC/index.jsf'
 * -H 'Connection: keep-alive'
 * -H 'Cache-Control: max-age=0'
 * -H 'Upgrade-Insecure-Requests: 1'
 * -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
 * -H 'Sec-Fetch-User: ?1'
 * -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*\/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
 * -H 'Sec-Fetch-Site: none'
 * -H 'Sec-Fetch-Mode: navigate'
 * -H 'Accept-Encoding: gzip, deflate, br'
 * -H 'Accept-Language: en-US,en;q=0.9,es;q=0.8' --compressed
 * 
 * JSESSIONID=vLNQGkWH2keQObGjbGi82LX1GanM9-wLAdGuSMnjghdOVNZxhetQ!-631946176!-240505793; */

// CAPTCHA
/** curl 'https://agsc.siat.sat.gob.mx/PTSC/ValidaRFC/captchaReload' -X POST
 * -H 'Connection: keep-alive'
 * -H 'Content-Length: 0'
 * -H 'Accept: text/plain, *\/*; q=0.01'
 * -H 'X-Requested-With: XMLHttpRequest'
 * -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
 * -H 'Origin: https://agsc.siat.sat.gob.mx'
 * -H 'Sec-Fetch-Site: same-origin'
 * -H 'Sec-Fetch-Mode: cors'
 * -H 'Referer: https://agsc.siat.sat.gob.mx/PTSC/ValidaRFC/index.jsf'
 * -H 'Accept-Encoding: gzip, deflate, br'
 * -H 'Accept-Language: en-US,en;q=0.9,es;q=0.8'
 * -H $'Cookie:
 * ZNPCQ003-36373300=c759e878;
 * JSESSIONID=vLNQGkWH2keQObGjbGi82LX1GanM9-wLAdGuSMnjghdOVNZxhetQ\u0021-631946176\u0021-240505793;
 * Sticky-Padron-de-importadores-Contri9080=135215114.30755.0000;
 * F5-PROD-SIAT-AGSC-443=1733310474.47873.0000' --compressed */

// VALIDATE
/** curl $'https://agsc.siat.sat.gob.mx/PTSC/ValidaRFC/index.jsf;jsessionid=vLNQGkWH2keQObGjbGi82LX1GanM9-wLAdGuSMnjghdOVNZxhetQ\u0021-631946176\u0021-240505793'
 * -H 'Connection: keep-alive'
 * -H 'Accept: application/xml, text/xml, *\/*; q=0.01'
 * -H 'X-Requested-With: XMLHttpRequest'
 * -H 'Faces-Request: partial/ajax'
 * -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
 * -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8'
 * -H 'Origin: https://agsc.siat.sat.gob.mx'
 * -H 'Sec-Fetch-Site: same-origin'
 * -H 'Sec-Fetch-Mode: cors'
 * -H 'Referer: https://agsc.siat.sat.gob.mx/PTSC/ValidaRFC/index.jsf'
 * -H 'Accept-Encoding: gzip, deflate, br'
 * -H 'Accept-Language: en-US,en;q=0.9,es;q=0.8'
 * -H $'Cookie:
 * ZNPCQ003-36373300=c759e878;
 * JSESSIONID=vLNQGkWH2keQObGjbGi82LX1GanM9-wLAdGuSMnjghdOVNZxhetQ\u0021-631946176\u0021-240505793;
 * Sticky-Padron-de-importadores-Contri9080=135215114.30755.0000;
 * F5-PROD-SIAT-AGSC-443=1733310474.47873.0000'
 * --data
 * 'javax.faces.partial.ajax=true
 * javax.faces.source=formMain%3Aj_idt57
 * javax.faces.partial.execute=%40all
 * javax.faces.partial.render=formMain
 * formMain%3Aj_idt57=formMain%3Aj_idt57
 * formMain=formMain
 * formMain%3AcaptchaInput=9FFNK
 * javax.faces.ViewState=1478045904329376693%3A-8146116476809936168' --compressed */
