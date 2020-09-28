import * as ActionTypes from "../action-types";
import Http from "../../Http";

const initialState = {
  isLoading: true,
  error: false,
  paymentPlans: [],
  paymentPlanSchedules: [],
  isLoadingSchedules: false,
  isUpdatingSchedule: false,
};

const paymentPlansProcess = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionTypes.LOADING_PAYMENTPLANS:
      return { ...state, isLoading: action.status };
    case ActionTypes.LOADING_PAYMENTPLAN_SCHEDULES:
      return { ...state, isLoadingSchedules: action.status };
    case ActionTypes.UPDATING_PAYMENTPLAN_SCHEDULE:
      return { ...state, isUpdatingSchedule: action.status };
    case ActionTypes.GET_PAYMENTPLANS:
      return { ...state, paymentPlans: action.payload };
    case ActionTypes.GET_PAYMENTPLAN_SCHEDULES:
      return { ...state, paymentPlanSchedules: action.payload };
    default:
      return state;
  }
};

export default paymentPlansProcess;
