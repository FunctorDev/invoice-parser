import { BaseDomain } from "./base.domain";
import { defaultTo, find, map, pipe, prop, propEq, propOr } from "ramda";

export class ObjectDomain extends BaseDomain {
  get name() {
    return prop("name", this._data);
  }

  get value() {
    return prop("value", this._data);
  }
}

export class ObjectsDomain extends BaseDomain {
  get objects() {
    return pipe(
      defaultTo([]),
      map((item) => new ObjectDomain(item))
    )(this._data);
  }

  getObjectByName(name) {
    return pipe(defaultTo([]), find(propEq("name", name)))(this.objects);
  }
}

export class DocumentDomain extends BaseDomain {
  get objectsDomain() {
    const objects = propOr([], "objects", this._data);
    return new ObjectsDomain(objects);
  }
}
