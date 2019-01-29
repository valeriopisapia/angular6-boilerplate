import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Profile } from "../../models/profile.model";

export const featureAdapter: EntityAdapter<Profile> = createEntityAdapter<
  Profile
>({
  selectId: model => model.sessionid,
  sortComparer: (a: Profile, b: Profile): number =>
    b.sessionid.toString().localeCompare(a.sessionid.toString())
});

export interface State extends EntityState<Profile> {
  error: any;
  loaded: boolean;
  loading: boolean;
  isLoading?: boolean;
  profile: Profile | null;
}

export const initialState: State = featureAdapter.getInitialState({
  loading: false,
  error: null,
  loaded: false,
  profile: null
});
