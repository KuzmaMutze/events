import { WritableAtom, atom } from 'jotai';

export function atomWithLastUpdate<Read extends {}, Write extends {}>(
  _atom: WritableAtom<Read, Write>
) {
  return atom(
    (get) => get(_atom),
    (get, set, payload: Write) => {
      set(_atom, { ...payload, lastUpdated: new Date().toISOString() });
    }
  );
}
