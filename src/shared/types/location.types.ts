/**
 * Country/City used to be declared twice in the old types/api.ts (once with
 * a full shape, once with just {id, name}) and TypeScript silently merged
 * them via declaration merging instead of erroring — eslint's
 * `import/export` rule caught this as "Multiple exports of name 'Country'".
 * Consolidated to the fuller shape here, since every current call site
 * (Profile, PassengerDetail) only ever assigns API response objects into
 * these fields, never hand-constructed literals, so nothing narrower relied
 * on the reduced {id, name} shape.
 */
export interface Country {
  id: string;
  name: string;
  iso_code: string;
  phone_code: string;
}

export interface City {
  id: string;
  name: string;
  country: string;
  region: string;
}
