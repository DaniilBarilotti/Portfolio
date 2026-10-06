'use strict';
const $ = id => document.getElementById(id);
const labels = {open: 'Open', in_progress: 'In progress', resolved: 'Resolved'};
let currentId = null, requestVersion = 0;
async function api(path, options = {}) {
  const response = await fetch(path, {...options, headers: {'Content-Type': 'application/json'}});
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Request failed.');
  return data;
}
function node(tag, text, className) {
  const el = document.createElement(tag);
  if (text !== undefined) el.textContent = text;
  if (className) el.className = className;
  return el;
}
function notify(message) { $('notice').textContent = message; }
async function refresh() {
  const version = ++requestVersion;
  try {
    const query = new URLSearchParams({q: $('search').value, status: $('filter-status').value});
    const [tickets, stats] = await Promise.all([api('/api/tickets?' + query), api('/api/stats')]);
    if (version !== requestVersion) return;
    for (const key of ['total', 'open', 'in_progress', 'high_priority']) $(key).textContent = stats[key];
    $('tickets').replaceChildren();
    $('result-count').textContent = `${tickets.length} request${tickets.length === 1 ? '' : 's'} in this view`;
    $('empty').hidden = tickets.length > 0;
    $('empty-text').textContent = $('search').value || $('filter-status').value ? 'No matching requests. Try another search or status.' : 'Create your first ticket to get organized.';
    for (const ticket of tickets) {
      const card = node('article', undefined, 'ticket');
      const marker = node('div', '#' + String(ticket.id).padStart(3, '0'), 'ticket-id');
      const details = node('div', undefined, 'ticket-details');
      details.append(node('h3', ticket.title), node('p', ticket.description || 'No description provided.', 'description'));
      const meta = node('div', undefined, 'meta');
      meta.append(node('span', ticket.requester), node('span', 'Created ' + new Date(ticket.created_at).toLocaleDateString('en-GB')));
      details.append(meta);
      const badges = node('div', undefined, 'badges');
      badges.append(node('span', labels[ticket.status], 'badge ' + ticket.status), node('span', ticket.priority + ' priority', 'badge priority ' + ticket.priority));
      const actions = node('div', undefined, 'ticket-actions');
      const edit = node('button', 'Edit'); edit.addEventListener('click', () => openEditor(ticket));
      const remove = node('button', 'Delete', 'delete');
      remove.addEventListener('click', async () => {
        if (!window.confirm(`Delete ticket #${ticket.id}? This cannot be undone.`)) return;
        remove.disabled = true;
        try { await api('/api/tickets/' + ticket.id, {method: 'DELETE'}); notify('Ticket deleted.'); await refresh(); }
        catch (error) { notify(error.message); remove.disabled = false; }
      });
      actions.append(edit, remove); card.append(marker, details, badges, actions); $('tickets').append(card);
    }
  } catch (error) { notify(error.message); $('result-count').textContent = 'Unable to load requests.'; }
}
function openEditor(ticket = null) {
  const form = $('ticket-form'); form.reset(); currentId = ticket?.id ?? null;
  if (ticket) for (const field of ['title', 'description', 'requester', 'status', 'priority']) form.elements[field].value = ticket[field];
  $('form-title').textContent = ticket ? 'Edit request #' + ticket.id : 'New ticket';
  $('save-ticket').textContent = ticket ? 'Save changes' : 'Create ticket';
  $('form-error').textContent = ''; $('editor').showModal(); form.elements.title.focus();
}
$('new-ticket').addEventListener('click', () => openEditor());
for (const id of ['close-editor', 'cancel-editor']) $(id).addEventListener('click', () => $('editor').close());
$('ticket-form').addEventListener('submit', async event => {
  event.preventDefault(); $('save-ticket').disabled = true; $('form-error').textContent = '';
  const fields = Object.fromEntries(new FormData(event.currentTarget));
  try {
    await api('/api/tickets' + (currentId === null ? '' : '/' + currentId), {method: currentId === null ? 'POST' : 'PATCH', body: JSON.stringify(fields)});
    $('editor').close(); notify(currentId === null ? 'Ticket created.' : 'Changes saved.'); await refresh();
  } catch (error) { $('form-error').textContent = error.message; }
  finally { $('save-ticket').disabled = false; }
});
let debounce;
$('search').addEventListener('input', () => { clearTimeout(debounce); debounce = setTimeout(refresh, 180); });
$('filter-status').addEventListener('change', refresh);
refresh();
