export function decodeHtml(html: string) {
	if (typeof document === 'undefined') return html;
	var txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
}
