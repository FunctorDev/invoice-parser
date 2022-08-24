import { BaseDomain } from "./base.domain";
import { prop } from "ramda";
import { DocumentDomain } from "./document.domain";

export class JobDomain extends BaseDomain {
  get body() {
    const body = prop("body", this._data);
    return new DocumentDomain(body);
  }
}
