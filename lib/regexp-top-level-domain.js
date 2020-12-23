// Based on http://data.iana.org/TLD/tlds-alpha-by-domain.txt
// '/\\.(?:' + document.body.firstChild.textContent.trim().split('\n').slice(1).join('|') + ')$/i';

// # Version 2015081401, Last Updated Sat Aug 15 07:07:01 2015 UTC
var regexp = /\.(?:COM)$/i;
module.exports = regexp;
