export function generateCode() {
  return 'TICKET-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
}