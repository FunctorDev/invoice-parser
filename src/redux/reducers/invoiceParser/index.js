import { actions as SliceActions, reducer, sliceKey } from "./slice";
import * as CustomActions from "./actions";
import * as selectors from "./selectors";

const actions = {
  ...SliceActions,
  ...CustomActions,
};

export { reducer, sliceKey, actions, selectors };
