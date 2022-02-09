export function boolFormatter(value, [ifTrue, ifFalse]) {
  return value ? ifTrue : ifFalse;
}
export function dateFormatter(value) {
  let d = "";
  if (value) {
    d = new Date(value).toLocaleDateString("uz-Cyrl-UZ");
  }
  return d;
}
